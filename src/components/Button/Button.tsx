import type { PressEvent } from 'react-aria';
import { MouseEventHandler, useState } from 'react';

import type { IButtonFactory } from './Button.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { ButtonBase } from '../ButtonBase';
import {
  buttonStyles,
  buttonStylesVariants,
  type IButtonStylesFactory,
} from './Button.css';

const COMPONENT_NAME = 'Button';

export const Button = polymorphicComponentFactory<IButtonFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      style,
      variant = 'filled',
      children,
      onClick,
      onPress,
      icon,
      trailingIcon,
      loading: loadingProp,
      loadingAnimation = 'progressIndicator',
      loadingText,
      readOnly: readOnlyProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const [animating, setAnimating] = useState(false);
    const [handlingPress, setHandlingPress] = useState(false);
    const loading =
      (loadingProp || handlingPress) &&
      loadingAnimation === 'progressIndicator';
    const readOnly = readOnlyProp || loading;
    const disabledOrReadOnly = other.disabled || readOnly;

    const hasIcon = !!icon;
    const hasLeadingIcon = hasIcon && !trailingIcon;
    const hasTrailingIcon = hasIcon && !!trailingIcon;
    const hasOverlay = loading && (!!loadingText || !hasIcon);
    const iconAnimation =
      (loadingProp || handlingPress || animating) &&
      loadingAnimation !== undefined &&
      loadingAnimation !== 'progressIndicator' &&
      loadingAnimation !== 'none'
        ? loadingAnimation
        : undefined;

    const modifiers = {
      disabled: disabledOrReadOnly,
      loading,
      'with-leading-icon': hasLeadingIcon,
      'with-trailing-icon': hasTrailingIcon,
      'with-overlay': hasOverlay,
      'icon-animation': iconAnimation,
    };

    const { getStyles } = useStyles<IButtonStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: buttonStyles,
      stylesVariants: buttonStylesVariants,
      style,
      variant,
      modifiers,
    });

    const handleAnimationIteration = (): void => setAnimating(handlingPress);

    const handleClick: MouseEventHandler = (event) => {
      if (handlingPress || !onClick) {
        return;
      }

      event.stopPropagation();

      setAnimating(true);
      void executeLazyPromise(
        () => onClick(event) as Promise<void>,
        setHandlingPress,
      );
    };

    const handlePress = (event: PressEvent): void => {
      if (handlingPress || !onPress) {
        return;
      }

      setAnimating(true);
      void executeLazyPromise(
        () => onPress(event) as Promise<void>,
        setHandlingPress,
      );
    };

    const renderIcon = (): JSX.Element =>
      loading ? (
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
      );

    return (
      <ButtonBase
        {...other}
        {...getStyles('root')}
        onClick={handleClick}
        classNames={{
          stateLayer: getStyles('stateLayer').className,
        }}
        onPress={handlePress}
        readOnly={readOnly}
        ref={forwardedRef}
      >
        {hasLeadingIcon && renderIcon()}

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

        {hasTrailingIcon && renderIcon()}
      </ButtonBase>
    );
  },
);

Button.styles = buttonStyles;
Button.displayName = `@sixui/${COMPONENT_NAME}`;
