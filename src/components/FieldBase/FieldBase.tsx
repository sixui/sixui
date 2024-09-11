import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { IFieldBaseFactory } from './FieldBase.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { isFunction } from '~/helpers/isFunction';
import { usePrevious } from '~/hooks/usePrevious';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { ButtonBase } from '../ButtonBase';
import { CircularProgressIndicator } from '../CircularProgressIndicator';
import { LabeledContext } from '../Labeled/Labeled.context';
import { Box } from '../Box';
import { useStateLayer } from '../StateLayer';
import {
  fieldBaseTheme,
  fieldBaseThemeVariants,
  type IFieldBaseThemeFactory,
} from './FieldBase.css';
import { getLabelKeyframes } from './getLabelKeyframes';

const COMPONENT_NAME = 'FieldBase';

const EASING_STANDARD = 'cubic-bezier(0.2, 0, 0, 1)';

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
      trailingIcon,
      readOnly,
      label,
      required,
      populated,
      resizable,
      supportingText,
      hasError,
      errorText,
      count = -1,
      maxLength = -1,
      multiline,
      loading: loadingProp,
      forwardProps,
      containerRef,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labeledContext = useContext(LabeledContext);
    const loading = loadingProp || labeledContext?.loading;

    const disabledOrReadOnly = other.disabled || readOnly;
    const stateLayer = useStateLayer<HTMLDivElement>({
      interactions: other.interactions,
      disabled: disabledOrReadOnly,
      pressEvents: { onPress: other.onPress },
    });

    const focused = stateLayer.interactionsContext.state.focused;
    const hasStartSection = !!leadingIcon || !!start;
    const hasEndSection = !!loading || !!trailingIcon || !!end;
    const hasLabel = !!label;

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
        console.log('__ANIMATE');
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
            fill: 'forwards',
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

    return (
      <Box
        {...other}
        {...getStyles('root')}
        interactions={stateLayer.interactionsContext.state}
        modifiers={{ disabled: disabledOrReadOnly }}
        ref={forwardedRef}
      >
        <ButtonBase
          {...getStyles('container')}
          stateLayer={stateLayer}
          as='div'
          classNames={mergeClassNames(classNames, {
            stateLayer: getStyles('stateLayer').className,
          })}
          focusRing={false}
          ref={containerRef}
        >
          {renderIndicator()}
          <div {...getStyles('inner')}>
            {hasStartSection ? (
              <div {...getStyles(['section', 'section$start'])}>
                {leadingIcon ? (
                  <span {...getStyles(['icon', 'icon$leading'])}>
                    {leadingIcon}
                  </span>
                ) : (
                  start
                )}
              </div>
            ) : null}

            <div {...getStyles(['section', 'section$main'])}>
              <div {...getStyles('labelWrapper')}>
                {restingLabel}
                {variant === 'outlined' ? null : floatingLabel}
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

            {hasEndSection ? (
              <div {...getStyles(['section', 'section$end'])}>
                {loading || trailingIcon ? (
                  <span {...getStyles(['icon', 'icon$trailing'])}>
                    {loading ? <CircularProgressIndicator /> : trailingIcon}
                  </span>
                ) : (
                  end
                )}
              </div>
            ) : null}
          </div>
        </ButtonBase>
        {renderSupportingText()}
      </Box>
    );
  },
);

FieldBase.theme = fieldBaseTheme;
FieldBase.displayName = `@sixui/${COMPONENT_NAME}`;
