import { useCallback, useState } from 'react';

import type { IButtonThemeFactory } from './Button.css';
import type { IButtonFactory } from './Button.types';
import { ButtonBase } from '~/components/ButtonBase';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { Overlayable } from '~/components/Overlayable';
import { Slot } from '~/components/Slot';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { executeLazyPromise } from '~/utils/executeLazyPromise';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './Button.constants';
import { buttonTheme, buttonThemeVariants } from './Button.css';

/**
 * @see https://m3.material.io/components/buttons/overview
 */
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
      hasStartSlot: hasStartSlotProp,
      hasEndSlot: hasEndSlotProp,
      startSlot,
      endSlot,
      animatedLeadingIconSlot,
      animatedTrailingIconSlot,
      loadingIndicatorPosition,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [animating, setAnimating] = useState(false);
    const [handlingClick, setHandlingClick] = useState(false);
    const loading =
      (loadingProp || handlingClick) &&
      loadingAnimation === 'progressIndicator';
    const readOnly = readOnlyProp || loading;
    const disabledOrReadOnly = disabled || readOnly;

    const hasStart = hasStartSlotProp ?? (!!leadingIcon || !!startSlot);
    const hasEnd = hasEndSlotProp ?? (!!trailingIcon || !!endSlot);
    const startSlotLoading =
      loading &&
      (loadingIndicatorPosition === 'start' ||
        (!loadingIndicatorPosition && !loadingText && !!leadingIcon));
    const labelSlotLoading =
      loading &&
      (loadingIndicatorPosition === 'label' ||
        (!loadingIndicatorPosition &&
          (!!loadingText || (!leadingIcon && !trailingIcon))));
    const endSlotLoading =
      loading &&
      (loadingIndicatorPosition === 'end' ||
        (!loadingIndicatorPosition &&
          !loadingText &&
          !leadingIcon &&
          !!trailingIcon));
    const iconAnimation =
      (loadingProp || handlingClick || animating) &&
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
        'with-children': !!children,
        'with-start': hasStart,
        'with-end': hasEnd,
        'icon-animation': iconAnimation,
      },
    });

    const handleAnimationIteration = useCallback((): void => {
      setAnimating(handlingClick);
    }, [handlingClick, setAnimating]);

    const handleClick: React.MouseEventHandler = (event) => {
      if (handlingClick || !onClick) {
        return;
      }

      setAnimating(true);
      void executeLazyPromise(
        () => onClick(event) as Promise<void>,
        setHandlingClick,
      );
    };

    const renderStartSlot = (): React.ReactNode => (
      <Slot
        {...getStyles([
          'slot',
          'slot$start',
          !startSlot && ['slot$icon', 'slot$icon$start'],
        ])}
        animated={animatedLeadingIconSlot}
        opened={startSlotLoading || !!startSlot || !!leadingIcon}
        loading={startSlotLoading}
        loadingOverlay={
          <IndeterminateCircularProgressIndicator {...getStyles('icon')} />
        }
      >
        {startSlot ?? (
          <div
            {...getStyles('icon')}
            onAnimationIteration={handleAnimationIteration}
          >
            {leadingIcon}
          </div>
        )}
      </Slot>
    );

    const renderLabelSlot = (children: React.ReactNode): React.ReactNode =>
      children && (
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
          visible={labelSlotLoading}
        >
          <span {...getStyles('label')}>{children}</span>
        </Overlayable>
      );

    const renderEndSlot = (): React.ReactNode => (
      <Slot
        {...getStyles([
          'slot',
          'slot$end',
          !endSlot && ['slot$icon', 'slot$icon$end'],
        ])}
        animated={animatedTrailingIconSlot}
        opened={endSlotLoading || !!endSlot || !!trailingIcon}
        loading={endSlotLoading}
        loadingOverlay={
          <IndeterminateCircularProgressIndicator {...getStyles('icon')} />
        }
      >
        {endSlot ?? (
          <div
            {...getStyles('icon')}
            onAnimationIteration={handleAnimationIteration}
          >
            {trailingIcon}
          </div>
        )}
      </Slot>
    );

    const renderContent = (children: React.ReactNode): React.ReactNode => (
      <>
        {renderStartSlot()}
        {renderLabelSlot(children)}
        {renderEndSlot()}
      </>
    );

    return (
      <ButtonBase
        {...getStyles('root')}
        onClick={onClick ? handleClick : undefined}
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
        {({ renderFocusRing, renderStateLayer, renderTouchTarget }) =>
          isFunction(children) ? (
            children({
              renderFocusRing,
              renderStateLayer,
              renderContent,
              renderTouchTarget,
            })
          ) : (
            <>
              {renderFocusRing()}
              {renderStateLayer()}
              {renderContent(children)}
              {renderTouchTarget()}
            </>
          )
        }
      </ButtonBase>
    );
  },
);

Button.theme = buttonTheme;
Button.displayName = `@sixui/core/${COMPONENT_NAME}`;
