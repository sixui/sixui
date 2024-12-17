import { MouseEventHandler, useState } from 'react';

import type { IButtonThemeFactory } from './Button.css';
import type { IButtonFactory } from './Button.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ButtonBase } from '../ButtonBase';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
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
      icon,
      trailingIcon,
      loading: loadingProp,
      loadingAnimation = 'progressIndicator',
      loadingText,
      readOnly: readOnlyProp,
      hasLeading: hasLeadingProp,
      hasTrailing: hasTrailingProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [animating, setAnimating] = useState(false);
    const [handlingClick, setHandlingClick] = useState(false);
    const loading =
      (loadingProp || handlingClick) &&
      loadingAnimation === 'progressIndicator';
    const readOnly = readOnlyProp || loading;
    const disabledOrReadOnly = other.disabled || readOnly;

    const hasIcon = !!icon;
    const hasLeading = hasLeadingProp ?? (hasIcon && !trailingIcon);
    const hasTrailing = hasTrailingProp ?? (hasIcon && !!trailingIcon);
    const hasOverlay = loading && (!!loadingText || !hasLeading);
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
      theme: buttonTheme,
      themeVariants: buttonThemeVariants,
      variant,
      modifiers: {
        disabled: disabledOrReadOnly,
        loading,
        'with-leading-icon': hasLeading,
        'with-trailing-icon': hasTrailing,
        'icon-animation': iconAnimation,
      },
    });

    const handleAnimationIteration = (): void => setAnimating(handlingClick);

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

    const renderLeadingIcon = (): React.JSX.Element =>
      hasLeading ? (
        <div {...getStyles(['iconContainer', 'iconContainer$leading'])}>
          {loading ? (
            <IndeterminateCircularProgressIndicator
              {...getStyles(['icon', hasOverlay && 'invisible'])}
            />
          ) : (
            <div
              {...getStyles(['icon', hasOverlay && 'invisible'])}
              onAnimationIteration={handleAnimationIteration}
            >
              {icon}
            </div>
          )}
        </div>
      ) : (
        <div
          {...getStyles(['iconContainer$leading', 'iconContainer$collapsed'])}
        />
      );

    const renderTrailingIcon = (): React.JSX.Element =>
      hasTrailing ? (
        <div {...getStyles(['iconContainer', 'iconContainer$trailing'])}>
          {loading ? (
            <IndeterminateCircularProgressIndicator
              {...getStyles(['icon', hasOverlay && 'invisible'])}
            />
          ) : (
            <div
              {...getStyles(['icon', hasOverlay && 'invisible'])}
              onAnimationIteration={handleAnimationIteration}
            >
              {icon}
            </div>
          )}
        </div>
      ) : (
        <div
          {...getStyles(['iconContainer$trailing', 'iconContainer$collapsed'])}
        />
      );

    return (
      <ButtonBase
        {...getStyles('root')}
        onClick={onClick ? handleClick : undefined}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
          outline: getStyles('outline').className,
        })}
        readOnly={readOnly}
        ref={forwardedRef}
        {...other}
      >
        {renderLeadingIcon()}

        {children ? (
          <span {...getStyles(['label', hasOverlay && 'invisible'])}>
            {children}
          </span>
        ) : null}

        {hasOverlay ? (
          <div {...getStyles('overlay')}>
            {loadingText ? (
              <span {...getStyles('label')}>{loadingText}</span>
            ) : (
              <IndeterminateCircularProgressIndicator {...getStyles('icon')} />
            )}
          </div>
        ) : null}

        {renderTrailingIcon()}
      </ButtonBase>
    );
  },
);

Button.theme = buttonTheme;
Button.displayName = `@sixui/${COMPONENT_NAME}`;
