import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IFieldBaseFactory } from './FieldBase.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { isFunction } from '~/helpers/isFunction';
import { usePrevious } from '~/hooks/usePrevious';
import { EASING } from '~/helpers/animation';
import { useStyles } from '~/hooks/useStyles';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { Base } from '../Base';
import { useVisualState } from '../VisualState';
import { ButtonBase } from '../ButtonBase';
import { CircularProgressIndicator } from '../CircularProgressIndicator';
import { LabeledContext } from '../Labeled/Labeled.context';
import { fieldBaseVariantStyles } from './variants';
import {
  fieldBaseTheme,
  fieldBaseThemeVariants,
  type IFieldBaseThemeFactory,
} from './FieldBase.css';
import { Box } from '../Box';
import { useStateLayer } from '../StateLayer';

const COMPONENT_NAME = 'FieldBase';

export const FieldBase = componentFactory<IFieldBaseFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
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
      loading: loadingProp,
      forwardProps,
      tabIndex,
      containerRef,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labeledContext = useContext(LabeledContext);
    const loading = loadingProp || labeledContext?.loading;

    // const visuallyDisabled =
    //   other.disabled || labeledContext?.disabled || readOnly;
    // const { visualState, setRef: setVisualStateRef } = useVisualState(
    //   visualStateProp,
    //   {
    //     disabled: visuallyDisabled,
    //     retainFocusAfterClick: true,
    //   },
    // );
    // const handleRef = useMergeRefs([forwardedRef, setVisualStateRef]);

    // const variantStyles = variant ? fieldBaseVariantStyles[variant] : undefined;
    // const { combineStyles, getStyles, globalStyles } = useStyles<
    //   | IFieldBaseStylesKey
    //   | IFilledFieldBaseStylesKey
    //   | IOutlinedFieldBaseStylesKey
    // >({
    //   componentName: 'FieldBase',
    //   styles: [fieldBaseStyles, variantStyles, styles],
    //   visualState,
    // });

    const trailingIcon = loading ? (
      <CircularProgressIndicator />
    ) : (
      trailingIconProp
    );

    const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);
    // const labelAnimationRef = useRef<Animation>();
    // const floatingLabelRef = useRef<HTMLSpanElement>(null);
    // const restingLabelRef = useRef<HTMLSpanElement>(null);
    // const disableTransitionsRef = useRef(false);
    // const animatingRef = useRef(false);

    const supportingOrErrorText =
      hasError && errorText ? errorText : supportingText;
    // const focused = !other.disabled && visualState?.focused;
    const hasStartSection = !!leadingIcon || !!start;
    const hasEndSection = !!trailingIcon || !!end;
    const hasLabel = !!label;

    // const wasFocused = usePrevious(!!focused);
    // const wasPopulated = usePrevious(!!populated);

    // const getLabelKeyframes = useCallback(() => {
    //   const floatingLabelEl = floatingLabelRef.current;
    //   const restingLabelEl = restingLabelRef.current;
    //   if (!floatingLabelEl || !restingLabelEl) {
    //     return [];
    //   }

    //   const {
    //     x: floatingX,
    //     y: floatingY,
    //     height: floatingHeight,
    //   } = floatingLabelEl.getBoundingClientRect();
    //   const {
    //     x: restingX,
    //     y: restingY,
    //     height: restingHeight,
    //   } = restingLabelEl.getBoundingClientRect();
    //   const floatingScrollWidth = floatingLabelRef.current.scrollWidth;
    //   const restingScrollWidth = restingLabelEl.scrollWidth;
    //   // Scale by width ratio instead of font size since letter-spacing will scale
    //   // incorrectly. Using the width we can better approximate the adjusted
    //   // scale and compensate for tracking and overflow.
    //   // (use scrollWidth instead of width to account for clipped labels)
    //   const scale = restingScrollWidth / floatingScrollWidth;
    //   const xDelta = restingX - floatingX;
    //   // The line-height of the resting and floating label are different. When
    //   // we move the floating label down to the resting label's position, it won't
    //   // exactly match because of this. We need to adjust by half of what the
    //   // final scaled floating label's height will be.
    //   const yDelta =
    //     restingY -
    //     floatingY +
    //     Math.round((restingHeight - floatingHeight * scale) / 2);

    //   // Create the two transforms: floating to resting (using the calculations
    //   // above), and resting to floating (re-setting the transform to initial
    //   // values).
    //   const restTransform = `translateX(${xDelta}px) translateY(${yDelta}px) scale(${scale})`;
    //   const floatTransform = `translateX(0) translateY(0) scale(1)`;

    //   // Constrain the floating labels width to a scaled percentage of the
    //   // resting label's width. This will prevent long clipped labels from
    //   // overflowing the container.
    //   const restingClientWidth = restingLabelEl.clientWidth;
    //   const isRestingClipped = restingScrollWidth > restingClientWidth;
    //   const width = isRestingClipped ? `${restingClientWidth / scale}px` : '';
    //   if (focused || populated) {
    //     return [
    //       { transform: restTransform, width },
    //       { transform: floatTransform, width },
    //     ];
    //   }

    //   return [
    //     { transform: floatTransform, width },
    //     { transform: restTransform, width },
    //   ];
    // }, [focused, populated]);

    // const animateLabelIfNeeded = useCallback(
    //   (previousState: { wasFocused?: boolean; wasPopulated?: boolean }) => {
    //     if (!hasLabel) {
    //       return;
    //     }

    //     const wasFocused = previousState.wasFocused ?? focused;
    //     const wasPopulated = previousState.wasPopulated ?? populated;
    //     const wasFloating = wasFocused || wasPopulated;
    //     const shouldBeFloating = focused || populated;
    //     if (wasFloating === shouldBeFloating) {
    //       return;
    //     }

    //     animatingRef.current = true;
    //     labelAnimationRef.current?.cancel();

    //     // Only one label is visible at a time for clearer text rendering.
    //     // The floating label is visible and used during animation. At the end of
    //     // the animation, it will either remain visible (if floating) or hide and
    //     // the resting label will be shown.
    //     //
    //     // We don't use forward filling because if the dimensions of the text field
    //     // change (leading icon removed, density changes, etc), then the animation
    //     // will be inaccurate.
    //     //
    //     // Re-calculating the animation each time will prevent any visual glitches
    //     // from appearing.
    //     // TODO: use animation tokens
    //     labelAnimationRef.current = floatingLabelRef.current?.animate(
    //       getLabelKeyframes(),
    //       {
    //         duration: 150,
    //         easing: EASING.STANDARD,
    //         // To avoid any glitch, the target will retain the computed values set
    //         // by the last keyframe encountered during execution. See
    //         // https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode#forwards
    //         fill: 'forwards',
    //       },
    //     );

    //     labelAnimationRef.current?.addEventListener('finish', () => {
    //       // At the end of the animation, update the visible label.
    //       animatingRef.current = false;
    //     });
    //   },
    //   [focused, hasLabel, populated, getLabelKeyframes],
    // );

    // useEffect(() => {
    //   if (visuallyDisabled) {
    //     disableTransitionsRef.current = true;
    //   }

    //   animateLabelIfNeeded({
    //     wasFocused,
    //     wasPopulated,
    //   });

    //   // updated
    //   if (refreshErrorAlert) {
    //     // The past render cycle removed the role="alert" from the error message.
    //     // Re-add it after an animation frame to re-announce the error.
    //     requestAnimationFrame(() => setRefreshErrorAlert(false));
    //   }

    //   if (disableTransitionsRef.current) {
    //     requestAnimationFrame(() => {
    //       disableTransitionsRef.current = false;
    //     });
    //   }
    // }, [
    //   visuallyDisabled,
    //   animateLabelIfNeeded,
    //   wasFocused,
    //   wasPopulated,
    //   refreshErrorAlert,
    // ]);

    // const renderLabel = useCallback(
    //   (floating = false): React.ReactNode | null => {
    //     if (!hasLabel) {
    //       return null;
    //     }

    //     const isFloatingVisible =
    //       wasFocused || focused || populated || animatingRef.current;
    //     const visible = floating ? isFloatingVisible : !isFloatingVisible;

    //     // Add '*' if a label is present and the field is required
    //     const labelText = label ? `${label}${required ? '*' : ''}` : '';

    //     return (
    //       <span
    //         {...getStyles(
    //           'label',
    //           floating ? 'label$floating' : 'label$resting',
    //           hasError && 'label$error',
    //           visuallyDisabled && 'label$disabled',
    //           !visible && 'label$invisible',
    //         )}
    //         aria-hidden={!visible}
    //         ref={floating ? floatingLabelRef : restingLabelRef}
    //       >
    //         {labelText}
    //       </span>
    //     );
    //   },
    //   [
    //     visuallyDisabled,
    //     hasError,
    //     wasFocused,
    //     focused,
    //     label,
    //     hasLabel,
    //     populated,
    //     required,
    //     getStyles,
    //   ],
    // );

    // const floatingLabel = renderLabel(true);
    // const restingLabel = renderLabel(false);

    // const renderBackground = useCallback(
    //   (): React.ReactNode => (
    //     <>
    //       <div
    //         {...getStyles(
    //           'background',
    //           visuallyDisabled && 'background$disabled',
    //         )}
    //       />
    //       <div
    //         {...getStyles(
    //           'stateLayer',
    //           hasError && 'stateLayer$error',
    //           visuallyDisabled && 'stateLayer$disabled',
    //         )}
    //       />
    //     </>
    //   ),
    //   [getStyles, visuallyDisabled, hasError],
    // );

    // const renderOutline = useCallback(
    //   (): React.ReactNode => (
    //     <div
    //       {...getStyles(
    //         'outline',
    //         hasError && 'outline$error',
    //         visuallyDisabled && 'outline$disabled',
    //       )}
    //     >
    //       <div
    //         {...getStyles(
    //           'outlineSection',
    //           'outlineSection$startEnd',
    //           'outlineSection$start',
    //           visuallyDisabled && 'outlineSection$startEnd$disabled',
    //         )}
    //       >
    //         <div
    //           {...getStyles(
    //             'outlineBorder',
    //             'outlineBorder$startEnd',
    //             'outlineBorder$start',
    //             'outlineBorder$inactive',
    //             'outlineBorder$inactive$startEnd',
    //             'outlineBorder$inactive$start',
    //             visuallyDisabled && 'outlineBorder$inactive$startEnd$disabled',
    //           )}
    //         />
    //         <div
    //           {...getStyles(
    //             'outlineBorder',
    //             'outlineBorder$startEnd',
    //             'outlineBorder$start',
    //             'outlineBorder$active',
    //             'outlineBorder$active$startEnd',
    //             'outlineBorder$active$end',
    //           )}
    //         />
    //       </div>
    //       <div
    //         {...getStyles(
    //           'outlineNotch',
    //           !hasLabel && 'outlineNotch$withoutLabel',
    //         )}
    //       >
    //         <div
    //           {...getStyles(
    //             'outlineSection',
    //             'outlineSection$panel',
    //             'outlineSection$panel$inactive',
    //             visuallyDisabled && 'outlineSection$panel$inactive$disabled',
    //           )}
    //         >
    //           <div
    //             {...getStyles(
    //               'outlineBorder',
    //               'outlineBorder$panel',
    //               'outlineBorder$inactive',
    //               'outlineBorder$inactive$panel',
    //               'outlineBorder$inactive$panel$inactive',
    //               populated && 'outlineBorder$panel$populated',
    //               visuallyDisabled &&
    //                 'outlineBorder$inactive$panel$inactive$disabled',
    //             )}
    //           />
    //           <div
    //             {...getStyles(
    //               'outlineBorder',
    //               'outlineBorder$panel',
    //               'outlineBorder$active',
    //               'outlineBorder$active$panel',
    //               'outlineBorder$active$panel$inactive',
    //               populated && 'outlineBorder$panel$populated',
    //               visuallyDisabled &&
    //                 'outlineBorder$active$panel$inactive$disabled',
    //             )}
    //           />
    //         </div>
    //         <div
    //           {...getStyles(
    //             'outlineSection',
    //             'outlineSection$panel',
    //             'outlineSection$panel$active',
    //           )}
    //         >
    //           <div
    //             {...getStyles(
    //               'outlineBorder',
    //               'outlineBorder$panel',
    //               'outlineBorder$inactive',
    //               'outlineBorder$inactive$panel',
    //               'outlineBorder$inactive$panel$active',
    //               populated && 'outlineBorder$panel$populated',
    //             )}
    //           />
    //           <div
    //             {...getStyles(
    //               'outlineBorder',
    //               'outlineBorder$panel',
    //               'outlineBorder$active',
    //               'outlineBorder$active$panel',
    //               'outlineBorder$active$panel$active',
    //               populated && 'outlineBorder$panel$populated',
    //             )}
    //           />
    //         </div>
    //         <div {...getStyles('outlineLabel')}>{floatingLabel}</div>
    //       </div>
    //       <div
    //         {...getStyles(
    //           'outlineSection',
    //           'outlineSection$startEnd',
    //           'outlineSection$end',
    //           visuallyDisabled && 'outlineSection$startEnd$disabled',
    //         )}
    //       >
    //         <div
    //           {...getStyles(
    //             'outlineBorder',
    //             'outlineBorder$startEnd',
    //             'outlineBorder$end',
    //             'outlineBorder$inactive',
    //             'outlineBorder$inactive$startEnd',
    //             'outlineBorder$inactive$end',
    //             visuallyDisabled && 'outlineBorder$inactive$startEnd$disabled',
    //           )}
    //         />
    //         <div
    //           {...getStyles(
    //             'outlineBorder',
    //             'outlineBorder$startEnd',
    //             'outlineBorder$end',
    //             'outlineBorder$active',
    //             'outlineBorder$active$startEnd',
    //             'outlineBorder$active$end',
    //           )}
    //         />
    //       </div>
    //     </div>
    //   ),
    //   [
    //     getStyles,
    //     hasLabel,
    //     populated,
    //     visuallyDisabled,
    //     hasError,
    //     floatingLabel,
    //   ],
    // );

    const { getStyles } = useComponentTheme<IFieldBaseThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: fieldBaseTheme,
      variant,
      themeVariants: fieldBaseThemeVariants,
      modifiers: {
        resizable,
        populated,
        'with-start-section': hasStartSection,
        'with-end-section': hasEndSection,
        'with-label': hasLabel,
        'with-error': hasError,
        multiline: textArea,
      },
    });

    const renderIndicator = useCallback(
      (): JSX.Element => (
        <div {...getStyles('activeIndicator')}>
          <div {...getStyles('activeIndicatorBackground')} />
          <div {...getStyles('activeIndicatorFocus')} />
        </div>
      ),
      [getStyles],
    );

    const getCounterText = useCallback(() => {
      const countAsNumber = count ?? -1;
      const maxLengthAsNumber = Number(maxLength) ?? -1;
      // Counter does not show if count is negative or 0, or max is negative or 0.
      if (countAsNumber <= 0 || maxLengthAsNumber <= 0) {
        return undefined;
      }

      return `${countAsNumber} / ${maxLengthAsNumber}`;
    }, [count, maxLength]);

    const renderSupportingText = useCallback((): JSX.Element | null => {
      const counterText = getCounterText();
      if (!supportingOrErrorText && !counterText) {
        return null;
      }

      // Announce if there is an error and error text visible. If
      // `refreshErrorAlert` is true, do not announce. This will remove the
      // `role="alert"` attribute. Another render cycle will happen after an
      // animation frame to re-add the role.
      const shouldErrorAnnounce = hasError && errorText && !refreshErrorAlert;
      const role = shouldErrorAnnounce ? 'alert' : undefined;

      return (
        <div
          {...getStyles(
            'supportingText',
            // hasError && 'supportingText$error',
            // visuallyDisabled && 'supportingText$disabled',
          )}
          role={role}
        >
          <span>{supportingOrErrorText}</span>
          {counterText && <span {...getStyles('counter')}>{counterText}</span>}
        </div>
      );
    }, [
      hasError,
      errorText,
      getCounterText,
      refreshErrorAlert,
      getStyles,
      supportingOrErrorText,
    ]);

    const disabledOrReadOnly = other.disabled || readOnly;
    const stateLayer = useStateLayer<HTMLDivElement>({
      interactions: other.interactions,
      disabled: disabledOrReadOnly,
      pressEvents: { onPress: other.onPress },
    });

    return (
      <Box
        {...other}
        {...stateLayer.interactionsContext.triggerProps}
        {...getStyles('root')}
        interactions={stateLayer.interactionsContext.state}
        modifiers={{ disabled: disabledOrReadOnly }}
        ref={forwardedRef}
      >
        <ButtonBase
          {...getStyles('container')}
          stateLayer={stateLayer}
          ref={containerRef}
          as='div'
          classNames={mergeClassNames(classNames, {
            stateLayer: getStyles('stateLayer').className,
          })}
        >
          {/* RENDER BACKGROUND */}
          {renderIndicator()}
          {/* RENDER OUTLINE */}
          <div {...getStyles('inner')}>
            {/* RENDER START SECTION */}
            <div {...getStyles('section')} data-section='main'>
              <div {...getStyles('labelWrapper')}>
                {/* RENDER RESTING LABEL */}
                {/* RENDER FLOATING LABEL */}
              </div>
              <div {...getStyles('content')}>
                <div {...getStyles('contentSlot')}>
                  {isFunction(children)
                    ? children({
                        forwardedProps: forwardProps ? other : undefined,
                      })
                    : children}
                </div>
              </div>
            </div>
            {/* RENDER END SECTION */}
          </div>
        </ButtonBase>
        {renderSupportingText()}
      </Box>
    );

    return (
      <Base
        aria-labelledby={labelId}
        data-cy='field'
        tabIndex={tabIndex}
        {...(forwardProps ? undefined : other)}
        sx={[
          fieldBaseTheme,
          globalStyles,
          combineStyles('host', visuallyDisabled && 'host$disabled'),
          sx,
        ]}
        visualState={visualState}
        ref={handleRef}
      >
        <div
          {...getStyles(
            'field',
            textArea && 'field$textArea',
            visuallyDisabled && 'field$disabled',
          )}
        >
          <div {...getStyles('containerOverflow')} ref={containerRef}>
            {variant === 'filled' ? renderBackground() : null}
            {variant === 'filled' ? renderIndicator() : null}
            {variant === 'filled' ? null : renderOutline()}
            <div
              {...getStyles(
                'container',
                resizable &&
                  (visuallyDisabled
                    ? 'container$disabled$resizable'
                    : 'container$resizable'),
              )}
            >
              {start || leadingIcon ? (
                <div
                  {...getStyles(
                    'section',
                    'section$start',
                    resizable && 'section$resizable',
                    hasStart && 'section$start$withStart',
                    hasError && 'section$start$error',
                    visuallyDisabled && 'section$start$disabled',
                  )}
                >
                  {leadingIcon ? (
                    <span {...getStyles('icon', 'icon$leading')}>
                      {leadingIcon}
                    </span>
                  ) : (
                    start
                  )}
                </div>
              ) : null}

              <div
                {...getStyles(
                  'section',
                  resizable && 'section$resizable',
                  'section$middle',
                )}
              >
                <div
                  {...getStyles(
                    'labelWrapper',
                    hasStart
                      ? 'labelWrapper$withStart'
                      : 'labelWrapper$withoutStart',
                    hasEnd ? 'labelWrapper$withEnd' : 'labelWrapper$withoutEnd',
                  )}
                >
                  {restingLabel}
                  {variant === 'outlined' ? null : floatingLabel}
                </div>
                <div
                  {...getStyles(
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
                    {...getStyles(
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
                  {...getStyles(
                    'section',
                    resizable && 'section$resizable',
                    'section$end',
                    hasEnd && 'section$end$withEnd',
                    hasError && 'section$end$error',
                    visuallyDisabled && 'section$end$disabled',
                  )}
                >
                  {trailingIcon ? (
                    <span {...getStyles('icon', 'icon$trailing')}>
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
);
