import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IFieldBaseProps } from './FieldBase.types';
import type { IFilledFieldBaseStylesKey } from './variants/FilledFieldBase.styles';
import type { IOutlinedFieldBaseStylesKey } from './variants/OutlinedFieldBase.styles';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { isFunction } from '~/helpers/isFunction';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { usePrevious } from '~/hooks/usePrevious';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { EASING } from '~/helpers/animation';
import { Base } from '../Base';
import { useVisualState } from '../VisualState';
import { CircularProgressIndicator } from '../CircularProgressIndicator';
import { fieldBaseVariantStyles } from './variants';
import { fieldBaseStyles, type IFieldBaseStylesKey } from './FieldBase.styles';
import { fieldBaseTheme } from './FieldBase.stylex';

// https://github.com/material-components/material-web/blob/main/field/internal/filled-field.ts
// https://github.com/material-components/material-web/blob/main/field/internal/outlined-field.ts
// https://github.com/material-components/material-web/blob/main/field/internal/field.ts

export const FieldBase = createPolymorphicComponent<'div', IFieldBaseProps>(
  forwardRef<HTMLDivElement, IFieldBaseProps>(
    function FieldBase(props, forwardedRef) {
      const {
        styles,
        sx,
        visualState: visualStateProp,
        variant = 'filled',
        children,
        start,
        end,
        leadingIcon,
        trailingIcon: trailingIconProp,
        readOnly,
        label,
        labelId,
        required,
        populated,
        resizable,
        supportingText,
        hasError,
        errorText,
        count = -1,
        maxLength = -1,
        textArea,
        loading,
        forwardProps,
        tabIndex,
        containerRef,
        ...other
      } = props;

      const visuallyDisabled = !!other.disabled || readOnly;
      const { visualState, setRef: setVisualStateRef } = useVisualState(
        visualStateProp,
        {
          disabled: visuallyDisabled,
          retainFocusAfterClick: true,
        },
      );
      const handleRef = useMergeRefs([forwardedRef, setVisualStateRef]);

      const componentTheme = useComponentTheme('FieldBase');
      const variantStyles = variant
        ? fieldBaseVariantStyles[variant]
        : undefined;

      const stylesCombinator = useMemo(
        () =>
          stylesCombinatorFactory<
            | IFieldBaseStylesKey
            | IFilledFieldBaseStylesKey
            | IOutlinedFieldBaseStylesKey
          >(fieldBaseStyles, variantStyles, styles),
        [variantStyles, styles],
      );
      const sxf = useMemo(
        () => stylePropsFactory(stylesCombinator, visualState),
        [stylesCombinator, visualState],
      );

      const trailingIcon = loading ? (
        <CircularProgressIndicator />
      ) : (
        trailingIconProp
      );

      const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);
      const labelAnimationRef = useRef<Animation>();
      const floatingLabelRef = useRef<HTMLSpanElement>(null);
      const restingLabelRef = useRef<HTMLSpanElement>(null);
      const disableTransitionsRef = useRef(false);
      const animatingRef = useRef(false);

      const supportingOrErrorText =
        hasError && errorText ? errorText : supportingText;
      const focused = !other.disabled && visualState?.focused;
      const hasStart = !!leadingIcon || !!start;
      const hasEnd = !!trailingIcon || !!end;
      const hasLabel = !!label;

      const wasFocused = usePrevious(!!focused);
      const wasPopulated = usePrevious(!!populated);

      const getLabelKeyframes = useCallback(() => {
        const floatingLabelEl = floatingLabelRef.current;
        const restingLabelEl = restingLabelRef.current;
        if (!floatingLabelEl || !restingLabelEl) {
          return [];
        }

        const {
          x: floatingX,
          y: floatingY,
          height: floatingHeight,
        } = floatingLabelEl.getBoundingClientRect();
        const {
          x: restingX,
          y: restingY,
          height: restingHeight,
        } = restingLabelEl.getBoundingClientRect();
        const floatingScrollWidth = floatingLabelRef.current.scrollWidth;
        const restingScrollWidth = restingLabelEl.scrollWidth;
        // Scale by width ratio instead of font size since letter-spacing will scale
        // incorrectly. Using the width we can better approximate the adjusted
        // scale and compensate for tracking and overflow.
        // (use scrollWidth instead of width to account for clipped labels)
        const scale = restingScrollWidth / floatingScrollWidth;
        const xDelta = restingX - floatingX;
        // The line-height of the resting and floating label are different. When
        // we move the floating label down to the resting label's position, it won't
        // exactly match because of this. We need to adjust by half of what the
        // final scaled floating label's height will be.
        const yDelta =
          restingY -
          floatingY +
          Math.round((restingHeight - floatingHeight * scale) / 2);

        // Create the two transforms: floating to resting (using the calculations
        // above), and resting to floating (re-setting the transform to initial
        // values).
        const restTransform = `translateX(${xDelta}px) translateY(${yDelta}px) scale(${scale})`;
        const floatTransform = `translateX(0) translateY(0) scale(1)`;

        // Constrain the floating labels width to a scaled percentage of the
        // resting label's width. This will prevent long clipped labels from
        // overflowing the container.
        const restingClientWidth = restingLabelEl.clientWidth;
        const isRestingClipped = restingScrollWidth > restingClientWidth;
        const width = isRestingClipped ? `${restingClientWidth / scale}px` : '';
        if (focused || populated) {
          return [
            { transform: restTransform, width },
            { transform: floatTransform, width },
          ];
        }

        return [
          { transform: floatTransform, width },
          { transform: restTransform, width },
        ];
      }, [focused, populated]);

      const animateLabelIfNeeded = useCallback(
        (previousState: { wasFocused?: boolean; wasPopulated?: boolean }) => {
          if (!hasLabel) {
            return;
          }

          const wasFocused = previousState.wasFocused ?? focused;
          const wasPopulated = previousState.wasPopulated ?? populated;
          const wasFloating = wasFocused || wasPopulated;
          const shouldBeFloating = focused || populated;
          if (wasFloating === shouldBeFloating) {
            return;
          }

          animatingRef.current = true;
          labelAnimationRef.current?.cancel();

          // Only one label is visible at a time for clearer text rendering.
          // The floating label is visible and used during animation. At the end of
          // the animation, it will either remain visible (if floating) or hide and
          // the resting label will be shown.
          //
          // We don't use forward filling because if the dimensions of the text field
          // change (leading icon removed, density changes, etc), then the animation
          // will be inaccurate.
          //
          // Re-calculating the animation each time will prevent any visual glitches
          // from appearing.
          // TODO: use animation tokens
          labelAnimationRef.current = floatingLabelRef.current?.animate(
            getLabelKeyframes(),
            {
              duration: 150,
              easing: EASING.STANDARD,
              // To avoid any glitch, the target will retain the computed values set
              // by the last keyframe encountered during execution. See
              // https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode#forwards
              fill: 'forwards',
            },
          );

          labelAnimationRef.current?.addEventListener('finish', () => {
            // At the end of the animation, update the visible label.
            animatingRef.current = false;
          });
        },
        [focused, hasLabel, populated, getLabelKeyframes],
      );

      useEffect(() => {
        if (visuallyDisabled) {
          disableTransitionsRef.current = true;
        }

        animateLabelIfNeeded({
          wasFocused,
          wasPopulated,
        });

        // updated
        if (refreshErrorAlert) {
          // The past render cycle removed the role="alert" from the error message.
          // Re-add it after an animation frame to re-announce the error.
          requestAnimationFrame(() => setRefreshErrorAlert(false));
        }

        if (disableTransitionsRef.current) {
          requestAnimationFrame(() => {
            disableTransitionsRef.current = false;
          });
        }
      }, [
        visuallyDisabled,
        animateLabelIfNeeded,
        wasFocused,
        wasPopulated,
        refreshErrorAlert,
      ]);

      const getCounterText = useCallback(() => {
        const countAsNumber = count ?? -1;
        const maxLengthAsNumber = Number(maxLength) ?? -1;
        // Counter does not show if count is negative or 0, or max is negative or 0.
        if (countAsNumber <= 0 || maxLengthAsNumber <= 0) {
          return undefined;
        }

        return `${countAsNumber} / ${maxLengthAsNumber}`;
      }, [count, maxLength]);

      const renderLabel = useCallback(
        (floating = false): React.ReactNode | null => {
          if (!hasLabel) {
            return null;
          }

          const isFloatingVisible =
            wasFocused || focused || populated || animatingRef.current;
          const visible = floating ? isFloatingVisible : !isFloatingVisible;

          // Add '*' if a label is present and the field is required
          const labelText = label ? `${label}${required ? '*' : ''}` : '';

          return (
            <span
              {...sxf(
                'label',
                floating ? 'label$floating' : 'label$resting',
                hasError && 'label$error',
                visuallyDisabled && 'label$disabled',
                !visible && 'label$invisible',
              )}
              aria-hidden={!visible}
              ref={floating ? floatingLabelRef : restingLabelRef}
            >
              {labelText}
            </span>
          );
        },
        [
          visuallyDisabled,
          hasError,
          wasFocused,
          focused,
          label,
          hasLabel,
          populated,
          required,
          sxf,
        ],
      );

      const floatingLabel = renderLabel(true);
      const restingLabel = renderLabel(false);

      const renderSupportingText = useCallback((): React.ReactNode | null => {
        const counterText = getCounterText();
        if (!supportingOrErrorText && !counterText) {
          return null;
        }

        // Announce if there is an error and error text visible.
        // If refreshErrorAlert is true, do not announce. This will remove the
        // role="alert" attribute. Another render cycle will happen after an
        // animation frame to re-add the role.
        const shouldErrorAnnounce = hasError && errorText && !refreshErrorAlert;
        const role = shouldErrorAnnounce ? 'alert' : undefined;

        return (
          <div
            {...sxf(
              'supportingText',
              hasError && 'supportingText$error',
              visuallyDisabled && 'supportingText$disabled',
            )}
            role={role}
          >
            {/* Always render the supporting text span so that our `space-around` container puts the counter at the end. */}
            <span>{supportingOrErrorText}</span>

            {/* Conditionally render counter so we don't render the extra `gap`. */}
            {/* TODO(b/244473435): add aria-label and announcements */}
            {counterText ? (
              <span {...sxf('counter')}>{counterText}</span>
            ) : null}
          </div>
        );
      }, [
        visuallyDisabled,
        hasError,
        errorText,
        getCounterText,
        refreshErrorAlert,
        sxf,
        supportingOrErrorText,
      ]);

      const renderBackground = useCallback(
        (): React.ReactNode => (
          <>
            <div
              {...sxf('background', visuallyDisabled && 'background$disabled')}
            />
            <div
              {...sxf(
                'stateLayer',
                hasError && 'stateLayer$error',
                visuallyDisabled && 'stateLayer$disabled',
              )}
            />
          </>
        ),
        [sxf, visuallyDisabled, hasError],
      );

      const renderIndicator = useCallback(
        (): React.ReactNode => (
          <div {...sxf('activeIndicator')}>
            <div
              {...sxf(
                'activeIndicatorBackground',
                hasError && 'activeIndicatorBackground$error',
                visuallyDisabled && 'activeIndicatorBackground$disabled',
              )}
            />
            <div
              {...sxf(
                'activeIndicatorFocus',
                hasError && 'activeIndicatorFocus$error',
                hasError && 'activeIndicatorBackground$error',
              )}
            />
          </div>
        ),
        [sxf, visuallyDisabled, hasError],
      );

      const renderOutline = useCallback(
        (): React.ReactNode => (
          <div
            {...sxf(
              'outline',
              hasError && 'outline$error',
              visuallyDisabled && 'outline$disabled',
            )}
          >
            <div
              {...sxf(
                'outlineSection',
                'outlineSection$startEnd',
                'outlineSection$start',
                visuallyDisabled && 'outlineSection$startEnd$disabled',
              )}
            >
              <div
                {...sxf(
                  'outlineBorder',
                  'outlineBorder$startEnd',
                  'outlineBorder$start',
                  'outlineBorder$inactive',
                  'outlineBorder$inactive$startEnd',
                  'outlineBorder$inactive$start',
                  visuallyDisabled &&
                    'outlineBorder$inactive$startEnd$disabled',
                )}
              />
              <div
                {...sxf(
                  'outlineBorder',
                  'outlineBorder$startEnd',
                  'outlineBorder$start',
                  'outlineBorder$active',
                  'outlineBorder$active$startEnd',
                  'outlineBorder$active$end',
                )}
              />
            </div>
            <div
              {...sxf('outlineNotch', !hasLabel && 'outlineNotch$withoutLabel')}
            >
              <div
                {...sxf(
                  'outlineSection',
                  'outlineSection$panel',
                  'outlineSection$panel$inactive',
                  visuallyDisabled && 'outlineSection$panel$inactive$disabled',
                )}
              >
                <div
                  {...sxf(
                    'outlineBorder',
                    'outlineBorder$panel',
                    'outlineBorder$inactive',
                    'outlineBorder$inactive$panel',
                    'outlineBorder$inactive$panel$inactive',
                    populated && 'outlineBorder$panel$populated',
                    visuallyDisabled &&
                      'outlineBorder$inactive$panel$inactive$disabled',
                  )}
                />
                <div
                  {...sxf(
                    'outlineBorder',
                    'outlineBorder$panel',
                    'outlineBorder$active',
                    'outlineBorder$active$panel',
                    'outlineBorder$active$panel$inactive',
                    populated && 'outlineBorder$panel$populated',
                    visuallyDisabled &&
                      'outlineBorder$active$panel$inactive$disabled',
                  )}
                />
              </div>
              <div
                {...sxf(
                  'outlineSection',
                  'outlineSection$panel',
                  'outlineSection$panel$active',
                )}
              >
                <div
                  {...sxf(
                    'outlineBorder',
                    'outlineBorder$panel',
                    'outlineBorder$inactive',
                    'outlineBorder$inactive$panel',
                    'outlineBorder$inactive$panel$active',
                    populated && 'outlineBorder$panel$populated',
                  )}
                />
                <div
                  {...sxf(
                    'outlineBorder',
                    'outlineBorder$panel',
                    'outlineBorder$active',
                    'outlineBorder$active$panel',
                    'outlineBorder$active$panel$active',
                    populated && 'outlineBorder$panel$populated',
                  )}
                />
              </div>
              <div {...sxf('outlineLabel')}>{floatingLabel}</div>
            </div>
            <div
              {...sxf(
                'outlineSection',
                'outlineSection$startEnd',
                'outlineSection$end',
                visuallyDisabled && 'outlineSection$startEnd$disabled',
              )}
            >
              <div
                {...sxf(
                  'outlineBorder',
                  'outlineBorder$startEnd',
                  'outlineBorder$end',
                  'outlineBorder$inactive',
                  'outlineBorder$inactive$startEnd',
                  'outlineBorder$inactive$end',
                  visuallyDisabled &&
                    'outlineBorder$inactive$startEnd$disabled',
                )}
              />
              <div
                {...sxf(
                  'outlineBorder',
                  'outlineBorder$startEnd',
                  'outlineBorder$end',
                  'outlineBorder$active',
                  'outlineBorder$active$startEnd',
                  'outlineBorder$active$end',
                )}
              />
            </div>
          </div>
        ),
        [sxf, hasLabel, populated, visuallyDisabled, hasError, floatingLabel],
      );

      return (
        <Base
          sx={stylesCombinator(
            fieldBaseTheme,
            componentTheme.overridenStyles,
            'host',
            visuallyDisabled && 'host$disabled',
            sx,
          )}
          aria-labelledby={labelId}
          data-cy='field'
          tabIndex={tabIndex}
          {...(forwardProps ? undefined : other)}
          ref={handleRef}
        >
          <div
            {...sxf(
              'field',
              textArea && 'field$textArea',
              visuallyDisabled && 'field$disabled',
            )}
          >
            <div {...sxf('containerOverflow')} ref={containerRef}>
              {variant === 'filled' ? renderBackground() : null}
              {variant === 'filled' ? renderIndicator() : null}
              {variant === 'filled' ? null : renderOutline()}
              <div
                {...sxf(
                  'container',
                  resizable &&
                    (visuallyDisabled
                      ? 'container$disabled$resizable'
                      : 'container$resizable'),
                )}
              >
                {start || leadingIcon ? (
                  <div
                    {...sxf(
                      'section',
                      'section$start',
                      resizable && 'section$resizable',
                      hasStart && 'section$start$withStart',
                      hasError && 'section$start$error',
                      visuallyDisabled && 'section$start$disabled',
                    )}
                  >
                    {leadingIcon ? (
                      <span {...sxf('icon', 'icon$leading')}>
                        {leadingIcon}
                      </span>
                    ) : (
                      start
                    )}
                  </div>
                ) : null}

                <div
                  {...sxf(
                    'section',
                    resizable && 'section$resizable',
                    'section$middle',
                  )}
                >
                  <div
                    {...sxf(
                      'labelWrapper',
                      hasStart
                        ? 'labelWrapper$withStart'
                        : 'labelWrapper$withoutStart',
                      hasEnd
                        ? 'labelWrapper$withEnd'
                        : 'labelWrapper$withoutEnd',
                    )}
                  >
                    {restingLabel}
                    {variant === 'outlined' ? null : floatingLabel}
                  </div>
                  <div
                    {...sxf(
                      'content',
                      !hasLabel && 'content$noLabel',
                      populated && 'content$populated',
                      hasError && 'content$error',
                      visuallyDisabled && 'content$disabled',
                      visuallyDisabled &&
                        (!label
                          ? 'content$noLabel$disabled'
                          : populated
                            ? 'content$populated$disabled'
                            : null),
                    )}
                  >
                    <div
                      {...sxf(
                        'contentSlot',
                        !hasStart && 'contentSlot$withoutStart',
                        !hasEnd && 'contentSlot$withoutEnd',
                        hasLabel && 'contentSlot$withLabel',
                        textArea &&
                          (hasLabel
                            ? 'contentSlot$withLabel$textArea'
                            : 'contentSlot$textArea'),
                      )}
                    >
                      {isFunction(children)
                        ? children({
                            forwardedProps: forwardProps ? other : undefined,
                          })
                        : children}
                    </div>
                  </div>
                </div>

                {end || trailingIcon ? (
                  <div
                    {...sxf(
                      'section',
                      resizable && 'section$resizable',
                      'section$end',
                      hasEnd && 'section$end$withEnd',
                      hasError && 'section$end$error',
                      visuallyDisabled && 'section$end$disabled',
                    )}
                  >
                    {trailingIcon ? (
                      <span {...sxf('icon', 'icon$trailing')}>
                        {trailingIcon}
                      </span>
                    ) : (
                      end
                    )}
                  </div>
                ) : null}
              </div>
            </div>
            {renderSupportingText()}
          </div>
        </Base>
      );
    },
  ),
);
