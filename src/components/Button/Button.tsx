import { forwardRef, useMemo, useState } from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import type {
  BUTTON_DEFAULT_TAG,
  IButtonOwnProps,
  IButtonProps,
} from './Button.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { ButtonBase } from '~/components/ButtonBase';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useVisualState } from '~/components/VisualState';
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

type IButton = <TRoot extends React.ElementType = typeof BUTTON_DEFAULT_TAG>(
  props: IButtonProps<TRoot>,
) => React.ReactNode;

export const Button: IButton = forwardRef(function Button<
  TRoot extends React.ElementType = typeof BUTTON_DEFAULT_TAG,
>(props: IButtonProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
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
  } = props as IWithAsProp<IButtonOwnProps>;
  const [handlingClick, setHandlingClick] = useState(false);
  const [animating, setAnimating] = useState(false);
  const loading =
    (loadingProp || handlingClick) && loadingAnimation === 'progressIndicator';
  const softDisabled = loading || softDisabledProp;
  const visuallyDisabled = other.disabled || softDisabled;

  const { visualState, setRef: setVisualStateRef } = useVisualState(
    visualStateProp,
    { disabled: visuallyDisabled },
  );
  const handleRef = useMergeRefs([forwardedRef, setVisualStateRef]);

  const componentTheme = useComponentTheme('Button');
  const variantStyles = variant ? buttonVariantStyles[variant] : undefined;

  const stylesCombinator = useMemo(
    () =>
      stylesCombinatorFactory<IButtonStylesKey>(
        buttonStyles,
        variantStyles,
        styles,
      ),
    [variantStyles, styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

  const handleAnimationIteration = (): void => setAnimating(handlingClick);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = (
    event,
  ) => {
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
      sx={[
        buttonTheme,
        componentTheme.overridenStyles,
        loading ? stylesCombinator('host$loading') : undefined,
        hasLeadingIcon && stylesCombinator('host$withLeadingIcon'),
        hasTrailingIcon && stylesCombinator('host$withTrailingIcon'),
        sx,
      ]}
      styles={[buttonStyles, variantStyles]}
      innerStyles={{
        ...innerStyles,
        stateLayer: [
          buttonStateLayerStyles,
          ...asArray(innerStyles?.stateLayer),
        ],
        focusRing: [buttonFocusRingStyles, ...asArray(innerStyles?.focusRing)],
        elevation: [buttonElevationStyles, ...asArray(innerStyles?.elevation)],
      }}
      onClick={handleClick}
      data-cy='button'
      visualState={visualState}
      softDisabled={softDisabled}
      {...other}
      ref={handleRef}
    >
      {hasLeadingIcon ? (
        <div
          {...sxf(
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
              {...sxf('icon', iconAnimation && `icon$${iconAnimation}`)}
              onAnimationIteration={handleAnimationIteration}
            >
              {icon}
            </div>
          ) : null}
        </div>
      ) : null}

      {children ? (
        <span
          {...sxf(
            'label',
            visuallyDisabled && 'label$disabled',
            hasOverlay ? 'invisible' : null,
          )}
        >
          {children}
        </span>
      ) : null}

      {hasOverlay ? (
        <div {...sxf('overlay')}>
          {loadingText ? (
            <span {...sxf('label', visuallyDisabled && 'label$disabled')}>
              {loadingText}
            </span>
          ) : (
            <div {...sxf(visuallyDisabled && 'icon$disabled')}>
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
            {...sxf(
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
            {...sxf(
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
});
