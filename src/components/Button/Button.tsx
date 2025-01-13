import { MouseEventHandler, useCallback, useState } from 'react';

import type { IButtonThemeFactory } from './Button.css';
import type { IButtonFactory } from './Button.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ButtonBase } from '../ButtonBase';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { Overlayable } from '../Overlayable';
import { buttonTheme, buttonThemeVariants } from './Button.css';

const COMPONENT_NAME = 'Button';

export const Button = polymorphicComponentFactory<IButtonFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'filled',
      children,
      onClick,
      leadingIcon,
      trailingIcon,
      loading: loadingProp,
      loadingAnimation = 'progressIndicator',
      loadingText,
      disabled,
      readOnly: readOnlyProp,
      hasLeading,
      hasTrailing: hasTrailingProp,
      start,
      end,
      animatedSlots,
      indicator,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [animating, setAnimating] = useState(false);
    const [handlingClick, setHandlingClick] = useState(false);
    const loading =
      (loadingProp || handlingClick) &&
      loadingAnimation === 'progressIndicator';
    const readOnly = readOnlyProp || loading;
    const disabledOrReadOnly = disabled || readOnly;

    const hasStartSlot = hasLeading ?? (!!start || !!leadingIcon);
    const hasEndSlot = hasTrailingProp ?? (!!end || !!trailingIcon);
    const hasOverlay =
      loading && (!!loadingText || (!hasStartSlot && !hasEndSlot));
    const iconAnimation =
      (loadingProp || handlingClick || animating) &&
      loadingAnimation !== undefined &&
      loadingAnimation !== 'progressIndicator' &&
      loadingAnimation !== 'none'
        ? loadingAnimation
        : undefined;

    const { getStyles } = useComponentTheme<IButtonThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: buttonTheme,
      themeVariants: buttonThemeVariants,
      modifiers: {
        disabled: disabledOrReadOnly,
        loading,
        'with-leading-slot': !!hasStartSlot,
        'with-trailing-slot': !!hasEndSlot,
        'with-children': !!children,
        'icon-animation': iconAnimation,
      },
    });

    const handleAnimationIteration = useCallback(
      (): void => setAnimating(handlingClick),
      [handlingClick, setAnimating],
    );

    const handleClick: MouseEventHandler = (event) => {
      if (handlingClick || !onClick) {
        return;
      }

      setAnimating(true);
      void executeLazyPromise(
        () => onClick(event) as Promise<void>,
        setHandlingClick,
      );
    };

    const renderStartSlot = useCallback(
      (): React.ReactNode =>
        hasStartSlot ? (
          <Overlayable
            overlay={
              <IndeterminateCircularProgressIndicator
                {...getStyles(['icon', 'slot$start'])}
              />
            }
            visible={loading && (!!leadingIcon || !trailingIcon)}
          >
            {start ? (
              <div {...getStyles(['slot', !!children && 'slot$start'])}>
                {start}
              </div>
            ) : (
              <div
                {...getStyles([
                  'slot',
                  !!children && 'slot$start',
                  'slot$icon',
                ])}
              >
                <div
                  {...getStyles('icon')}
                  onAnimationIteration={handleAnimationIteration}
                >
                  {leadingIcon}
                </div>
              </div>
            )}
          </Overlayable>
        ) : (
          animatedSlots && (
            <div {...getStyles(['slot', 'slot$icon', 'slot$icon$collapsed'])} />
          )
        ),
      [
        start,
        getStyles,
        hasStartSlot,
        loading,
        leadingIcon,
        trailingIcon,
        handleAnimationIteration,
        children,
        animatedSlots,
      ],
    );

    const renderEndSlot = useCallback(
      (): React.ReactNode =>
        hasEndSlot ? (
          <Overlayable
            overlay={
              <IndeterminateCircularProgressIndicator
                {...getStyles(['icon', 'slot$end'])}
              />
            }
            visible={loading && !leadingIcon}
          >
            {end ? (
              <div {...getStyles(['slot', !!children && 'slot$end'])}>
                {end}
              </div>
            ) : (
              <div
                {...getStyles(['slot', !!children && 'slot$end', 'slot$icon'])}
              >
                <div
                  {...getStyles('icon')}
                  onAnimationIteration={handleAnimationIteration}
                >
                  {trailingIcon}
                </div>
              </div>
            )}
          </Overlayable>
        ) : (
          animatedSlots && (
            <div {...getStyles(['slot', 'slot$icon', 'slot$icon$collapsed'])} />
          )
        ),
      [
        end,
        getStyles,
        hasEndSlot,
        loading,
        leadingIcon,
        trailingIcon,
        handleAnimationIteration,
        children,
        animatedSlots,
      ],
    );

    const renderLabelSlot = useCallback(
      () => (
        <Overlayable
          overlay={
            <>
              {loadingText ? (
                <span {...getStyles('label')}>{loadingText}</span>
              ) : (
                <IndeterminateCircularProgressIndicator
                  {...getStyles('icon')}
                />
              )}
            </>
          }
          visible={hasOverlay}
        >
          <span {...getStyles('label')}>{children}</span>
        </Overlayable>
      ),
      [children, getStyles, loadingText, hasOverlay],
    );

    return (
      <ButtonBase
        {...getStyles('root')}
        onClick={handleClick}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
          touchTarget: getStyles('touchTarget').className,
          focusRing: getStyles('focusRing').className,
        })}
        disabled={disabled}
        readOnly={readOnly}
        ref={forwardedRef}
        {...other}
      >
        {renderStartSlot()}
        {children && renderLabelSlot()}
        {/* {renderEndSlot()} */}
        {/* {indicator} */}
      </ButtonBase>
    );
  },
);

Button.theme = buttonTheme;
Button.displayName = `@sixui/${COMPONENT_NAME}`;
