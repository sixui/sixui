import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { IFieldBaseThemeFactory } from './FieldBase.css';
import type { IFieldBaseFactory } from './FieldBase.types';
import { isFunction } from '~/helpers/isFunction';
import { useInteractions } from '~/hooks/useInteractions';
import { usePrevious } from '~/hooks/usePrevious';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { extractBoxProps } from '../Box/extractBoxProps';
import { CircularProgressIndicator } from '../CircularProgressIndicator';
import { LabeledContext } from '../Labeled/Labeled.context';
import { PaperBase } from '../PaperBase';
import { StateLayer } from '../StateLayer';
import { fieldBaseTheme, fieldBaseThemeVariants } from './FieldBase.css';
import { getLabelKeyframes } from './getLabelKeyframes';

const COMPONENT_NAME = 'FieldBase';

const EASING_STANDARD = 'cubic-bezier(0.2, 0, 0, 1)';

export const FieldBase = polymorphicComponentFactory<IFieldBaseFactory>(
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
      trailingIcon,
      readOnly,
      label,
      required,
      populated: populatedProp,
      resizable,
      supportingText,
      hasError,
      errorText,
      count = -1,
      maxLength = -1,
      multiline,
      loading: loadingProp,
      containerRef,
      disabled,
      interactions: interactionsProp,
      prefixText,
      suffixText,
      wrapperProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { boxProps, other: forwardedProps } = extractBoxProps(other);

    const interactionsContext = useInteractions({
      baseState: interactionsProp,
      events: {
        hover: true,
      },
    });

    const labeledContext = useContext(LabeledContext);
    const loading = loadingProp || labeledContext?.loading;
    const disabledOrReadOnly = disabled || readOnly;
    const focused = interactionsContext.state.focused;
    const hasStartSection = !!leadingIcon || !!start;
    const hasEndSection = !!loading || !!trailingIcon || !!end;
    const hasLabel = !!label;
    const populated = populatedProp;

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
        disabled: disabledOrReadOnly,
        'with-start-section': hasStartSection,
        'with-end-section': hasEndSection,
        'with-label': hasLabel,
        'with-error': hasError,
        multiline,
      },
    });

    const [refreshErrorAlert, setRefreshErrorAlert] = useState(false);
    const labelAnimationRef = useRef<Animation>();
    const floatingLabelRef = useRef<HTMLDivElement>(null);
    const restingLabelRef = useRef<HTMLDivElement>(null);
    const disableTransitionsRef = useRef(false);
    const animatingRef = useRef(false);

    const supportingOrErrorText =
      hasError && errorText ? errorText : supportingText;

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
        labelAnimationRef.current = floatingLabelRef.current?.animate(
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
        );

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
        requestAnimationFrame(() => setRefreshErrorAlert(false));
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
      (floating = false): JSX.Element => {
        const isFloatingVisible =
          wasFocused || focused || populated || animatingRef.current;
        const visible = floating ? isFloatingVisible : !isFloatingVisible;

        // Add '*' if a label is present and the field is required.
        const labelText = label ? `${label}${required ? '*' : ''}` : '';

        return (
          <div
            {...getStyles([
              'label',
              floating ? 'label$floating' : 'label$resting',
              !visible && 'label$invisible',
            ])}
            ref={floating ? floatingLabelRef : restingLabelRef}
          >
            {labelText}
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
      // Counter does not show if count is negative or 0, or max is negative or
      // 0.
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

    const renderOutline = (): JSX.Element => (
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

    return (
      <Box
        {...wrapperProps}
        {...boxProps}
        {...getStyles('root')}
        {...interactionsContext.triggerProps}
        interactions={interactionsContext.state}
        ref={forwardedRef}
      >
        <PaperBase
          {...getStyles('container')}
          disabled={disabled}
          ref={containerRef}
        >
          <StateLayer interactions={interactionsContext.state} />
          {renderIndicator()}

          {variant === 'outlined' && renderOutline()}

          <div {...getStyles('inner')}>
            {hasStartSection && (
              <div {...getStyles(['section', 'section$start'])}>
                {leadingIcon ? (
                  <span {...getStyles(['icon', 'icon$leading'])}>
                    {leadingIcon}
                  </span>
                ) : (
                  start
                )}
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
                        ? children({ forwardedProps })
                        : children}
                    </div>
                  )}

                  {suffixText && (
                    <span {...getStyles('suffix')}>{suffixText}</span>
                  )}
                </div>
              </div>
            </div>

            {hasEndSection && (
              <div {...getStyles(['section', 'section$end'])}>
                {loading || trailingIcon ? (
                  <span {...getStyles(['icon', 'icon$trailing'])}>
                    {loading ? <CircularProgressIndicator /> : trailingIcon}
                  </span>
                ) : (
                  end
                )}
              </div>
            )}
          </div>
        </PaperBase>

        {renderSupportingText()}
      </Box>
    );
  },
);

FieldBase.theme = fieldBaseTheme;
FieldBase.displayName = `@sixui/${COMPONENT_NAME}`;
