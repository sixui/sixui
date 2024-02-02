import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type { IFieldStyleKey, IFieldVariant } from './Field.styledefs';
import type { ITextFieldStyleVarKey } from '../TextField';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { usePrevious } from '@/hooks/usePrevious';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { EASING } from '@/helpers/animation';

export interface IFieldProps
  extends IContainer<IFieldStyleKey, ITextFieldStyleVarKey>,
    Pick<
      React.InputHTMLAttributes<HTMLInputElement>,
      'disabled' | 'required' | 'max'
    > {
  variant?: IFieldVariant;
  children?: React.ReactNode;
  start?: React.ReactNode;
  end?: React.ReactNode;
  error?: boolean;
  label?: string;
  populated?: boolean;
  resizable?: boolean;
  supportingText?: string;
  errorText?: string;
  count?: number;
  textarea?: boolean;
}

type IFieldVariantMap = {
  [key in IFieldVariant]: keyof Pick<
    IThemeComponents,
    'FilledField' | 'OutlinedField'
  >;
};

const variantMap: IFieldVariantMap = {
  filled: 'FilledField',
  outlined: 'OutlinedField',
};

// https://github.com/material-components/material-web/blob/main/field/internal/filled-field.ts
// https://github.com/material-components/material-web/blob/main/field/internal/outlined-field.ts
// https://github.com/material-components/material-web/blob/main/field/internal/field.ts
export const Field: React.FC<IFieldProps> = ({
  visualState,
  variant = 'filled',
  children,
  start,
  end,
  label,
  required,
  populated,
  resizable,
  supportingText,
  errorText,
  count = -1,
  max = -1,
  textarea,
  ...props
}) => {
  const theme = useComponentTheme('Field');
  const variantTheme = useComponentTheme(variantMap[variant]);

  const [refreshErrorAlert, setRefreshErrorAlert] = React.useState(false);
  const labelAnimationRef = React.useRef<Animation>();
  const floatingLabelRef = React.useRef<HTMLSpanElement>(null);
  const restingLabelRef = React.useRef<HTMLSpanElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = React.useState(false);
  const disableTransitionsRef = React.useRef(false);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IFieldStyleKey, ITextFieldStyleVarKey>(
        stylesCombinatorFactory(
          theme.styles,
          variantTheme.styles,
          props.styles,
        ),
        visualState,
      ),
    [theme.styles, variantTheme.styles, props.styles, visualState],
  );

  const disabled = props.disabled;
  const hasError = props.error;
  const supportingOrErrorText =
    hasError && errorText ? errorText : supportingText;
  const focused = !disabled && visualState?.focused;
  const hasStart = !!start;
  const hasEnd = !!end;
  const hasLabel = !!label;

  const wasFocused = usePrevious(focused);
  const wasPopulated = usePrevious(populated);

  const getLabelKeyframes = React.useCallback(() => {
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

  const animateLabelIfNeeded = React.useCallback(
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

      setAnimating(true);
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
      // TODO(b/241113345): use animation tokens
      labelAnimationRef.current = floatingLabelRef.current?.animate(
        getLabelKeyframes(),
        {
          duration: 150,
          easing: EASING.STANDARD,
          // To avoid any glitch, the target will retain the computed values set by the last
          // keyframe encountered during execution.
          // See https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode#forwards
          fill: 'forwards',
        },
      );

      labelAnimationRef.current?.addEventListener('finish', () => {
        // At the end of the animation, update the visible label.
        setAnimating(false);
      });
    },
    [focused, hasLabel, populated, getLabelKeyframes],
  );

  React.useEffect(() => {
    if (disabled) {
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
    disabled,
    animateLabelIfNeeded,
    wasFocused,
    wasPopulated,
    refreshErrorAlert,
  ]);

  const getCounterText = React.useCallback(() => {
    const countAsNumber = count ?? -1;
    const maxAsNumber = Number(max) ?? -1;
    // Counter does not show if count is negative, or max is negative or 0.
    if (countAsNumber < 0 || maxAsNumber <= 0) {
      return '';
    }

    return `${countAsNumber} / ${maxAsNumber}`;
  }, [count, max]);

  const renderLabel = React.useCallback(
    (floating = false) => {
      if (!hasLabel) {
        return null;
      }

      const isFloatingVisible = wasFocused || focused || populated || animating;
      const visible = floating ? isFloatingVisible : !isFloatingVisible;

      // Add '*' if a label is present and the field is required
      const labelText = label ? `${label}${required ? '*' : ''}` : '';

      return (
        <span
          {...styleProps([
            'label',
            floating ? 'label$floating' : 'label$resting',
            hasError && 'label$error',
            disabled && 'label$disabled',
            !visible && 'label$invisible',
          ])}
          aria-hidden={!visible}
          ref={floating ? floatingLabelRef : restingLabelRef}
        >
          {labelText}
        </span>
      );
    },
    [
      animating,
      disabled,
      hasError,
      wasFocused,
      focused,
      label,
      hasLabel,
      populated,
      required,
      styleProps,
    ],
  );

  const floatingLabel = renderLabel(true);
  const restingLabel = renderLabel(false);

  const renderSupportingText = React.useCallback(() => {
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
      <div>
        <div
          {...styleProps([
            'supportingText',
            hasError && 'supportingText$error',
            disabled && 'supportingText$disabled',
          ])}
          role={role}
        >
          {/* Always render the supporting text span so that our `space-around` container puts the counter at the end. */}
          <span>{supportingOrErrorText}</span>

          {/* Conditionally render counter so we don't render the extra `gap`. */}
          {/* TODO(b/244473435): add aria-label and announcements */}
          {counterText ? (
            <span {...styleProps(['counter'])}>{counterText}</span>
          ) : null}
        </div>
      </div>
    );
  }, [
    disabled,
    hasError,
    errorText,
    getCounterText,
    refreshErrorAlert,
    styleProps,
    supportingOrErrorText,
  ]);

  const renderBackground = React.useCallback(
    () => (
      <React.Fragment>
        <div
          {...styleProps(['background', disabled && 'background$disabled'])}
        />
        <div
          {...styleProps([
            'stateLayer',
            hasError && 'stateLayer$error',
            disabled && 'stateLayer$disabled',
          ])}
        />
      </React.Fragment>
    ),
    [styleProps, disabled, hasError],
  );

  const renderIndicator = React.useCallback(
    () => (
      <div {...styleProps(['activeIndicator'])}>
        <div
          {...styleProps([
            'activeIndicatorBackground',
            hasError && 'activeIndicatorBackground$error',
            disabled && 'activeIndicatorBackground$disabled',
          ])}
        />
        <div
          {...styleProps([
            'activeIndicatorFocus',
            hasError && 'activeIndicatorFocus$error',
            hasError && 'activeIndicatorBackground$error',
          ])}
        />
      </div>
    ),
    [styleProps, disabled, hasError],
  );

  const renderOutline = React.useCallback(
    () => (
      <div
        {...styleProps([
          'outline',
          hasError && 'outline$error',
          disabled && 'outline$disabled',
        ])}
      >
        <div
          {...styleProps([
            'outlineSection',
            'outlineSection$startEnd',
            'outlineSection$start',
            disabled && 'outlineSection$startEnd$disabled',
          ])}
        >
          <div
            {...styleProps([
              'outlineBorder',
              'outlineBorder$startEnd',
              'outlineBorder$start',
              'outlineBorder$inactive',
              'outlineBorder$inactive$startEnd',
              'outlineBorder$inactive$start',
              disabled && 'outlineBorder$inactive$startEnd$disabled',
            ])}
          />
          <div
            {...styleProps([
              'outlineBorder',
              'outlineBorder$startEnd',
              'outlineBorder$start',
              'outlineBorder$active',
              'outlineBorder$active$startEnd',
              'outlineBorder$active$end',
            ])}
          />
        </div>
        <div
          {...styleProps([
            'outlineNotch',
            !hasLabel && 'outlineNotch$withoutLabel',
          ])}
        >
          <div
            {...styleProps([
              'outlineSection',
              'outlineSection$panel',
              'outlineSection$panel$inactive',
              disabled && 'outlineSection$panel$inactive$disabled',
            ])}
          >
            <div
              {...styleProps([
                'outlineBorder',
                'outlineBorder$panel',
                'outlineBorder$inactive',
                'outlineBorder$inactive$panel',
                'outlineBorder$inactive$panel$inactive',
                populated && 'outlineBorder$panel$populated',
                disabled && 'outlineBorder$inactive$panel$inactive$disabled',
              ])}
            />
            <div
              {...styleProps([
                'outlineBorder',
                'outlineBorder$panel',
                'outlineBorder$active',
                'outlineBorder$active$panel',
                'outlineBorder$active$panel$inactive',
                populated && 'outlineBorder$panel$populated',
                disabled && 'outlineBorder$active$panel$inactive$disabled',
              ])}
            />
          </div>
          <div
            {...styleProps([
              'outlineSection',
              'outlineSection$panel',
              'outlineSection$panel$active',
            ])}
          >
            <div
              {...styleProps([
                'outlineBorder',
                'outlineBorder$panel',
                'outlineBorder$inactive',
                'outlineBorder$inactive$panel',
                'outlineBorder$inactive$panel$active',
                populated && 'outlineBorder$panel$populated',
              ])}
            />
            <div
              {...styleProps([
                'outlineBorder',
                'outlineBorder$panel',
                'outlineBorder$active',
                'outlineBorder$active$panel',
                'outlineBorder$active$panel$active',
                populated && 'outlineBorder$panel$populated',
              ])}
            />
          </div>
          <div {...styleProps(['outlineLabel'])}>{floatingLabel}</div>
        </div>
        <div
          {...styleProps([
            'outlineSection',
            'outlineSection$startEnd',
            'outlineSection$end',
            disabled && 'outlineSection$startEnd$disabled',
          ])}
        >
          <div
            {...styleProps([
              'outlineBorder',
              'outlineBorder$startEnd',
              'outlineBorder$end',
              'outlineBorder$inactive',
              'outlineBorder$inactive$startEnd',
              'outlineBorder$inactive$end',
              disabled && 'outlineBorder$inactive$startEnd$disabled',
            ])}
          />
          <div
            {...styleProps([
              'outlineBorder',
              'outlineBorder$startEnd',
              'outlineBorder$end',
              'outlineBorder$active',
              'outlineBorder$active$startEnd',
              'outlineBorder$active$end',
            ])}
          />
        </div>
      </div>
    ),
    [styleProps, hasLabel, populated, disabled, hasError, floatingLabel],
  );

  return (
    <div
      {...styleProps(
        [
          'host',
          !!supportingOrErrorText && 'host$withSupportingText',
          disabled && 'host$disabled',
        ],
        [theme.vars, variantTheme.vars, props.theme],
      )}
    >
      <div
        {...styleProps([
          'field',
          textarea && 'field$textarea',
          disabled && 'field$disabled',
        ])}
      >
        <div {...styleProps(['containerOverflow'])}>
          {variant === 'filled' ? renderBackground() : null}
          {variant === 'filled' ? renderIndicator() : null}
          {variant === 'filled' ? null : renderOutline()}
          <div
            {...styleProps([
              'container',
              resizable &&
                (disabled
                  ? 'container$disabled$resizable'
                  : 'container$resizable'),
            ])}
            ref={containerRef}
          >
            {start ? (
              <div
                {...styleProps([
                  'section',
                  'section$start',
                  resizable && 'section$resizable',
                  hasStart && 'section$start$withStart',
                  hasError && 'section$start$error',
                  disabled && 'section$start$disabled',
                ])}
              >
                {start}
              </div>
            ) : null}

            <div
              {...styleProps([
                'section',
                resizable && 'section$resizable',
                'section$middle',
              ])}
            >
              <div
                {...styleProps([
                  'labelWrapper',
                  hasStart
                    ? 'labelWrapper$withStart'
                    : 'labelWrapper$withoutStart',
                  hasEnd ? 'labelWrapper$withEnd' : 'labelWrapper$withoutEnd',
                ])}
              >
                {restingLabel}
                {variant === 'outlined' ? null : floatingLabel}
              </div>
              <div
                {...styleProps([
                  'content',
                  !hasLabel && 'content$noLabel',
                  populated && 'content$populated',
                  hasError && 'content$error',
                  disabled && 'content$disabled',
                  disabled &&
                    (!label
                      ? 'content$noLabel$disabled'
                      : populated
                        ? 'content$populated$disabled'
                        : null),
                ])}
              >
                <div
                  {...styleProps([
                    'contentSlot',
                    !hasStart && 'contentSlot$withoutStart',
                    !hasEnd && 'contentSlot$withoutEnd',
                    hasLabel && 'contentSlot$withLabel',
                    textarea &&
                      (hasLabel
                        ? 'contentSlot$withLabel$textarea'
                        : 'contentSlot$textarea'),
                  ])}
                >
                  {children}
                </div>
              </div>
            </div>

            {end ? (
              <div
                {...styleProps([
                  'section',
                  resizable && 'section$resizable',
                  'section$end',
                  hasEnd && 'section$end$withEnd',
                  hasError && 'section$end$error',
                  disabled && 'section$end$disabled',
                ])}
              >
                {end}
              </div>
            ) : null}
          </div>
        </div>
        {renderSupportingText()}
      </div>
    </div>
  );
};
