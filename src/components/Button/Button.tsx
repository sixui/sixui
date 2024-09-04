import { useState } from 'react';

import type { IButtonFactory } from './Button.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { ButtonBase } from '../ButtonBase';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { buttonStyles, type IButtonStylesFactory } from './Button.css';

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
      icon,
      trailingIcon,
      loading: loadingProp,
      loadingAnimation = 'progressIndicator',
      loadingText,
      readOnly: readOnlyProp,
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
    const hasLeadingIcon = hasIcon && !trailingIcon;
    const hasTrailingIcon = hasIcon && !!trailingIcon;
    const hasOverlay = loading && (!!loadingText || !hasIcon);
    const iconAnimation =
      (loadingProp || handlingClick || animating) &&
      loadingAnimation !== undefined &&
      loadingAnimation !== 'progressIndicator' &&
      loadingAnimation !== 'none'
        ? loadingAnimation
        : undefined;

    const modifiers = {
      disabled: disabledOrReadOnly,
      loading,
      leading: hasLeadingIcon,
      trailing: hasTrailingIcon,
      'icon-animation': iconAnimation,
    };

    const { getStyles } = useStyles<IButtonStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: buttonStyles,
      style,
      variant,
      modifiers,
    });

    const handleAnimationIteration = (): void => setAnimating(handlingClick);

    const handleClick:
      | React.MouseEventHandler<HTMLButtonElement>
      | undefined = (event) => {
      if (handlingClick) {
        return;
      }

      if (!onClick) {
        return;
      }

      event.stopPropagation();

      setAnimating(true);
      void executeLazyPromise(() => onClick(event) as void, setHandlingClick);
    };

    return (
      <ButtonBase
        {...other}
        {...getStyles('root')}
        onClick={handleClick}
        readOnly={readOnly}
        ref={forwardedRef}
      >
        {hasLeadingIcon ? (
          <div {...getStyles(['icon', hasOverlay && 'invisible'])}>
            {loading ? (
              <IndeterminateCircularProgressIndicator />
            ) : icon ? (
              <div
                {...getStyles('icon')}
                onAnimationIteration={handleAnimationIteration}
              >
                {icon}
              </div>
            ) : null}
          </div>
        ) : null}

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
              <div {...getStyles('icon')}>
                <IndeterminateCircularProgressIndicator />
              </div>
            )}
          </div>
        ) : null}

        {icon && trailingIcon ? (
          loading ? (
            <div {...getStyles(['icon', hasOverlay && 'invisible'])}>
              <IndeterminateCircularProgressIndicator />
            </div>
          ) : (
            <div
              {...getStyles('icon')}
              onAnimationIteration={handleAnimationIteration}
            >
              {icon}
            </div>
          )
        ) : null}
      </ButtonBase>
    );
  },
);

Button.styles = buttonStyles;
Button.displayName = `@sixui/${COMPONENT_NAME}`;
