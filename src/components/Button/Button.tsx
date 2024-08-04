import { forwardRef, useState } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type { IButtonProps } from './Button.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { IndeterminateCircularProgressIndicator } from '../IndeterminateCircularProgressIndicator';
import { ButtonBase } from '../ButtonBase';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useVisualState } from '../VisualState';
import {
  buttonCircularProgressIndicatorStyles,
  buttonElevationStyles,
  buttonFocusRingStyles,
  buttonStateLayerStyles,
  buttonStyles,
  type IButtonStylesKey,
} from './Button.styles';
import { buttonTheme } from './Button.stylex';
import { buttonVariantStyles } from './variants';

// https://github.com/material-components/material-web/blob/main/button/internal/button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/elevated-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/filled-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/filled-tonal-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/outlined-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/text-button.ts

export const Button = createPolymorphicComponent<'button', IButtonProps>(
  forwardRef<HTMLButtonElement, IButtonProps>(
    function Button(props, forwardedRef) {
      const {
        styles,
        sx,
        innerStyles,
        visualState: visualStateProp,
        children,
        onClick,
        variant = 'filled',
        icon,
        trailingIcon,
        loading: loadingProp,
        loadingAnimation = 'progressIndicator',
        loadingText,
        softDisabled: softDisabledProp,
        ...other
      } = props;
      const [handlingClick, setHandlingClick] = useState(false);
      const [animating, setAnimating] = useState(false);
      const loading =
        (loadingProp || handlingClick) &&
        loadingAnimation === 'progressIndicator';
      const softDisabled = softDisabledProp || loading;
      const visuallyDisabled = other.disabled || softDisabled;

      const { visualState, setRef: setVisualStateRef } = useVisualState(
        visualStateProp,
        { disabled: visuallyDisabled },
      );
      const handleRef = useMergeRefs([forwardedRef, setVisualStateRef]);

      const variantStyles = variant ? buttonVariantStyles[variant] : undefined;
      const { combineStyles, getStyles, globalStyles } =
        useStyles<IButtonStylesKey>({
          name: 'Button',
          styles: [buttonStyles, variantStyles, styles],
          visualState,
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

      return (
        <ButtonBase
          styles={[buttonStyles, variantStyles]}
          innerStyles={{
            ...innerStyles,
            stateLayer: [
              buttonStateLayerStyles,
              ...asArray(innerStyles?.stateLayer),
            ],
            focusRing: [
              buttonFocusRingStyles,
              ...asArray(innerStyles?.focusRing),
            ],
            elevation: [
              buttonElevationStyles,
              ...asArray(innerStyles?.elevation),
            ],
          }}
          onClick={handleClick}
          data-cy='button'
          visualState={visualState}
          softDisabled={softDisabled}
          {...other}
          sx={[
            buttonTheme,
            globalStyles,
            combineStyles(
              loading && 'host$loading',
              hasLeadingIcon && 'host$withLeadingIcon',
              hasTrailingIcon && 'host$withTrailingIcon',
            ),
            sx,
          ]}
          ref={handleRef}
        >
          {hasLeadingIcon ? (
            <div
              {...getStyles(
                'icon',
                visuallyDisabled && 'icon$disabled',
                hasOverlay ? 'invisible' : null,
              )}
            >
              {loading ? (
                <IndeterminateCircularProgressIndicator
                  styles={[
                    buttonCircularProgressIndicatorStyles,
                    ...asArray(innerStyles?.circularProgressIndicator),
                  ]}
                />
              ) : icon ? (
                <div
                  {...getStyles(
                    'icon',
                    iconAnimation && `icon$${iconAnimation}`,
                  )}
                  onAnimationIteration={handleAnimationIteration}
                >
                  {icon}
                </div>
              ) : null}
            </div>
          ) : null}

          {children ? (
            <span
              {...getStyles(
                'label',
                visuallyDisabled && 'label$disabled',
                hasOverlay ? 'invisible' : null,
              )}
            >
              {children}
            </span>
          ) : null}

          {hasOverlay ? (
            <div {...getStyles('overlay')}>
              {loadingText ? (
                <span
                  {...getStyles('label', visuallyDisabled && 'label$disabled')}
                >
                  {loadingText}
                </span>
              ) : (
                <div {...getStyles(visuallyDisabled && 'icon$disabled')}>
                  <IndeterminateCircularProgressIndicator
                    styles={[
                      buttonCircularProgressIndicatorStyles,
                      ...asArray(innerStyles?.circularProgressIndicator),
                    ]}
                  />
                </div>
              )}
            </div>
          ) : null}

          {icon && trailingIcon ? (
            loading ? (
              <div
                {...getStyles(
                  hasOverlay ? 'invisible' : null,
                  visuallyDisabled && 'icon$disabled',
                )}
              >
                <IndeterminateCircularProgressIndicator
                  styles={[
                    buttonCircularProgressIndicatorStyles,
                    ...asArray(innerStyles?.circularProgressIndicator),
                  ]}
                />
              </div>
            ) : (
              <div
                {...getStyles(
                  'icon',
                  visuallyDisabled && 'icon$disabled',
                  iconAnimation && `icon$${iconAnimation}`,
                )}
                onAnimationIteration={handleAnimationIteration}
              >
                {icon}
              </div>
            )
          ) : null}
        </ButtonBase>
      );
    },
  ),
);
