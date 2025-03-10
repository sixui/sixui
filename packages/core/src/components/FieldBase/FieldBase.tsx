import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { IFieldBaseThemeFactory } from './FieldBase.css';
import type { IFieldBaseFactory, IFieldBaseProps } from './FieldBase.types';
import { Box } from '~/components/Box';
import { extractBoxProps } from '~/components/Box/extractBoxProps';
import { CircularProgressIndicator } from '~/components/CircularProgressIndicator';
import { useLabeledContext } from '~/components/Labeled/Labeled.context';
import { Paper } from '~/components/Paper';
import { StateLayer, useStateLayer } from '~/components/StateLayer';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { usePrevious } from '~/hooks/usePrevious';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { isFunction } from '~/utils/isFunction';
import { mergeProps } from '~/utils/mergeProps';
import { COMPONENT_NAME } from './FieldBase.constants';
import { getLabelKeyframes } from './utils/getLabelKeyframes';
import { fieldBaseTheme, fieldBaseThemeVariants } from './FieldBase.css';

const EASING_STANDARD = 'cubic-bezier(0.2, 0, 0, 1)';

/**
 * @see https://m3.material.io/components/text-fields/overview
 */
export const FieldBase = polymorphicComponentFactory<IFieldBaseFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'filled',
      forwardProps,
      children,
      startSlot,
      endSlot,
      leadingIcon,
      trailingIcon,
      readOnly: readOnlyProp,
      label,
      required: requiredProp,
      populated: populatedProp,
      resizable,
      supportingText,
      hasError,
      errorText,
      count = -1,
      maxLength = -1,
      multiline,
      loading,
      containerRef,
      disabled: disabledProp,
      interactions: interactionsProp,
      interactionsMergeStrategy,
      prefixText,
      suffixText,
      wrapperProps,
      withoutRippleEffect,
      containerProps,
      managedFocus,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { boxProps, other: forwardedProps } =
      extractBoxProps<IFieldBaseProps>(other);

    const labeledContext = useLabeledContext();
    const disabled = disabledProp ?? labeledContext?.disabled;
    const readOnly = readOnlyProp ?? labeledContext?.readOnly;
    const required = requiredProp ?? labeledContext?.required;

    const disabledOrReadOnly = disabled || readOnly;
    const hasStart = !!leadingIcon || !!startSlot;
    const hasEnd = !!loading || !!trailingIcon || !!endSlot;
    const hasLabel = !!label;
    const populated = populatedProp;

    const stateLayer = useStateLayer({
      baseState: interactionsProp,
      disabled: disabledOrReadOnly,
      withoutRippleEffect,
      mergeStrategy: interactionsMergeStrategy,
      events: {
        focus: !managedFocus,
      },
    });

    const { getStyles } = useComponentTheme<IFieldBaseThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: fieldBaseTheme,
      themeVariants: fieldBaseThemeVariants,
      modifiers: {
        resizable,
        populated,
        disabled: disabledOrReadOnly,
        'with-start-section': hasStart,
        'with-end-section': hasEnd,
        'with-label': hasLabel,
        'with-error': hasError,
        multiline,
      },
    });

    const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);
    const labelAnimationRef = useRef<Animation>(null);
    const floatingLabelRef = useRef<HTMLDivElement>(null);
    const restingLabelRef = useRef<HTMLDivElement>(null);
    const disableTransitionsRef = useRef(false);
    const animatingRef = useRef(false);

    const supportingOrErrorText =
      hasError && errorText ? errorText : supportingText;

    const focused = stateLayer.interactionsContext.state.focused;
    const wasFocused = usePrevious(!!focused);
    const wasPopulated = usePrevious(!!populated);

    const animateLabelIfNeeded = useCallback(
      (previousState: { wasFocused?: boolean; wasPopulated?: boolean }) => {
        if (!hasLabel) {
          return;
        }

        const wasFocused = previousState.wasFocused ?? focused;
        const wasPopulated = previousState.wasPopulated ?? populated;
        const wasFloating = wasFocused || wasPopulated;
        const shouldBeFloating = Boolean(focused || populated);
        if (wasFloating === shouldBeFloating) {
          return;
        }

        animatingRef.current = true;
        labelAnimationRef.current?.cancel();

        // Only one label is visible at a time for clearer text rendering. The
        // floating label is visible and used during animation. At the end of
        // the animation, it will either remain visible (if floating) or hide
        // and the resting label will be shown.
        //
        // We don't use forward filling because if the dimensions of the text
        // field change (leading icon removed, density changes, etc), then the
        // animation will be inaccurate.
        //
        // Re-calculating the animation each time will prevent any visual
        // glitches from appearing.
        labelAnimationRef.current =
          floatingLabelRef.current?.animate(
            getLabelKeyframes(
              floatingLabelRef,
              restingLabelRef,
              focused,
              populated,
            ),
            {
              duration: 150,
              easing: EASING_STANDARD,
              // To avoid any glitch, the target will retain the computed values
              // set by the last keyframe encountered during execution. See
              // https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode#forwards
              fill: 'both',
            },
          ) ?? null;

        labelAnimationRef.current?.addEventListener('finish', () => {
          // At the end of the animation, update the visible label.
          animatingRef.current = false;
        });
      },
      [focused, hasLabel, populated],
    );

    useEffect(() => {
      if (disabledOrReadOnly) {
        disableTransitionsRef.current = true;
      }

      animateLabelIfNeeded({
        wasFocused,
        wasPopulated,
      });

      if (refreshErrorAlert) {
        // The past render cycle removed the role="alert" from the error
        // message. Re-add it after an animation frame to re-announce the error.
        requestAnimationFrame(() => {
          setRefreshErrorAlert(false);
        });
      }

      if (disableTransitionsRef.current) {
        requestAnimationFrame(() => {
          disableTransitionsRef.current = false;
        });
      }
    }, [
      disabledOrReadOnly,
      animateLabelIfNeeded,
      wasFocused,
      wasPopulated,
      refreshErrorAlert,
    ]);

    const renderLabel = useCallback(
      (floating = false): React.JSX.Element => {
        const isFloatingVisible =
          wasFocused || focused || populated || animatingRef.current;
        const visible = floating ? isFloatingVisible : !isFloatingVisible;

        return (
          <div
            {...getStyles([
              'label',
              floating ? 'label$floating' : 'label$resting',
              !visible && 'label$invisible',
            ])}
            ref={floating ? floatingLabelRef : restingLabelRef}
          >
            {label}
            {required ? '*' : ''}
          </div>
        );
      },
      [wasFocused, focused, label, populated, required, getStyles],
    );

    const floatingLabel = useMemo(
      () => (hasLabel ? renderLabel(true) : undefined),
      [hasLabel, renderLabel],
    );
    const restingLabel = useMemo(
      () => (hasLabel ? renderLabel(false) : undefined),
      [hasLabel, renderLabel],
    );

    const renderIndicator = useCallback(
      (): React.JSX.Element => (
        <div {...getStyles('activeIndicator')}>
          <div {...getStyles('activeIndicatorBackground')} />
          <div {...getStyles('activeIndicatorFocus')} />
        </div>
      ),
      [getStyles],
    );

    const getCounterText = useCallback(() => {
      const maxLengthAsNumber = Number(maxLength) || -1;
      // Counter does not show if count is negative or 0, or max is negative or
      // 0.
      if (count <= 0 || maxLengthAsNumber <= 0) {
        return undefined;
      }

      return `${count} / ${maxLengthAsNumber}`;
    }, [count, maxLength]);

    const renderSupportingText = useCallback((): React.JSX.Element | null => {
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
        <div {...getStyles('supportingText')} role={role}>
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

    const renderOutline = (): React.JSX.Element => (
      <div {...getStyles('outline')}>
        <div
          {...getStyles(['outlineSection$startEnd', 'outlineSection$start'])}
        >
          <div
            {...getStyles([
              'outlineBorder',
              'outlineBorder$startEnd',
              'outlineBorder$start',
              'outlineBorder$inactive$startEnd',
            ])}
          />
          <div
            {...getStyles([
              'outlineBorder',
              'outlineBorder$startEnd',
              'outlineBorder$start',
              'outlineBorder$active$startEnd',
            ])}
          />
        </div>
        <div {...getStyles('outlineNotch')}>
          <div
            {...getStyles([
              'outlineSection$panel',
              'outlineSection$panel$inactive',
            ])}
          >
            <div
              {...getStyles([
                'outlineBorder',
                'outlineBorder$panel',
                'outlineBorder$inactive$panel',
                'outlineBorder$inactive$panel$inactive',
              ])}
            />
            <div
              {...getStyles([
                'outlineBorder',
                'outlineBorder$panel',
                'outlineBorder$active$panel',
                'outlineBorder$active$panel$inactive',
              ])}
            />
          </div>
          <div
            {...getStyles([
              'outlineSection$panel',
              'outlineSection$panel$active',
            ])}
          >
            <div
              {...getStyles([
                'outlineBorder',
                'outlineBorder$panel',
                'outlineBorder$inactive$panel',
                'outlineBorder$inactive$panel$active',
              ])}
            />
            <div
              {...getStyles([
                'outlineBorder',
                'outlineBorder$panel',
                'outlineBorder$active$panel',
                'outlineBorder$active$panel$active',
              ])}
            />
          </div>
          <div {...getStyles('outlineLabel')}>{floatingLabel}</div>
        </div>
        <div {...getStyles(['outlineSection$startEnd', 'outlineSection$end'])}>
          <div
            {...getStyles([
              'outlineBorder',
              'outlineBorder$startEnd',
              'outlineBorder$end',
              'outlineBorder$inactive$startEnd',
            ])}
          />
          <div
            {...getStyles([
              'outlineBorder',
              'outlineBorder$startEnd',
              'outlineBorder$end',
              'outlineBorder$active$startEnd',
            ])}
          />
        </div>
      </div>
    );

    const handleRef = useMergeRefs(forwardedRef, stateLayer.triggerRef);

    return (
      <Box
        {...boxProps}
        {...getStyles('root')}
        interactions={stateLayer.interactionsContext.state}
        ref={handleRef}
        {...mergeProps(wrapperProps, forwardProps ? undefined : forwardedProps)}
      >
        <Paper
          disabled={disabled}
          ref={containerRef}
          {...mergeProps(
            getStyles('container'),
            stateLayer.interactionsContext.triggerProps,
            containerProps,
          )}
        >
          {!disabled && (
            <StateLayer {...getStyles('stateLayer')} context={stateLayer} />
          )}
          {renderIndicator()}
          {variant === 'outlined' && renderOutline()}

          <div {...getStyles('inner')}>
            {hasStart && (
              <div {...getStyles(['section', 'section$start'])}>
                {leadingIcon && (
                  <span {...getStyles(['icon', 'icon$leading'])}>
                    {leadingIcon}
                  </span>
                )}
                {startSlot}
              </div>
            )}

            <div {...getStyles(['section', 'section$main'])}>
              <div {...getStyles('labelWrapper')}>
                {restingLabel}
                {variant === 'filled' && floatingLabel}
              </div>
              <div {...getStyles('content')}>
                <div {...getStyles('contentSlot')}>
                  {prefixText && (
                    <span {...getStyles('prefix')}>{prefixText}</span>
                  )}

                  {children && (
                    <div {...getStyles('inputWrapper')}>
                      {isFunction(children)
                        ? children({
                            forwardedProps: forwardProps
                              ? forwardedProps
                              : undefined,
                          })
                        : children}
                    </div>
                  )}

                  {suffixText && (
                    <span {...getStyles('suffix')}>{suffixText}</span>
                  )}
                </div>
              </div>
            </div>

            {hasEnd && (
              <div {...getStyles(['section', 'section$end'])}>
                {endSlot}
                {(loading || trailingIcon) && (
                  <span {...getStyles(['icon', 'icon$trailing'])}>
                    {loading ? <CircularProgressIndicator /> : trailingIcon}
                  </span>
                )}
              </div>
            )}
          </div>
        </Paper>

        {renderSupportingText()}
      </Box>
    );
  },
);

FieldBase.theme = fieldBaseTheme;
FieldBase.displayName = `@sixui/core/${COMPONENT_NAME}`;
