import type { StyleXStyles } from '@stylexjs/stylex';
import { forwardRef, useMemo, useState } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type {
  BUTTON_DEFAULT_TAG,
  IButtonOwnProps,
  IButtonProps,
  IButtonVariant,
} from './Button.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { IndeterminateCircularProgressIndicator } from '@/components/atoms/CircularProgressIndicator';
import { ButtonBase } from '@/components/atoms/ButtonBase';
import { executeLazyPromise } from '@/helpers/executeLazyPromise';
import {
  buttonCircularProgressIndicatorStyles,
  buttonElevationStyles,
  buttonFocusRingStyles,
  buttonStateLayerStyles,
  buttonStyles,
  type IButtonStyleKey,
} from './Button.styles';
import { buttonTheme } from './Button.stylex';
import { elevatedButtonStyles } from './ElevatedButton.styles';
import { filledButtonStyles } from './FilledButton.styles';
import { filledTonalButtonStyles } from './FilledTonalButton.styles';
import { outlinedButtonStyles } from './OutlinedButton.styles';
import { textButtonStyles } from './TextButton.styles';
import { dangerButtonStyles } from './DangerButton.styles';
import { snackbarButtonStyles } from './SnackbarButton.styles';

// https://github.com/material-components/material-web/blob/main/button/internal/button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/elevated-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/filled-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/filled-tonal-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/outlined-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/text-button.ts

const variantMap: {
  [key in IButtonVariant]: Record<string, StyleXStyles>;
} = {
  elevated: elevatedButtonStyles,
  filled: filledButtonStyles,
  filledTonal: filledTonalButtonStyles,
  outlined: outlinedButtonStyles,
  text: textButtonStyles,
  danger: dangerButtonStyles,
  snackbar: snackbarButtonStyles,
};

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
    children,
    onClick,
    variant = 'filled',
    icon,
    trailingIcon,
    loading: loadingProp,
    loadingAnimation = 'progressIndicator',
    loadingText,
    disabled: disabledProp,
    ...other
  } = props as IWithAsProp<IButtonOwnProps>;

  const { overridenStyles } = useComponentTheme('Button');
  const variantStyles = variant ? variantMap[variant] : undefined;

  const stylesCombinator = useMemo(
    () =>
      stylesCombinatorFactory<IButtonStyleKey>(
        buttonStyles,
        variantStyles,
        styles,
      ),
    [variantStyles, styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const [handlingClick, setHandlingClick] = useState(false);
  const [animating, setAnimating] = useState(false);

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

  const loading =
    (loadingProp || handlingClick) && loadingAnimation === 'progressIndicator';
  const disabled = disabledProp || loading;
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
        overridenStyles,
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
      disabled={disabled}
      data-cy='button'
      {...other}
      ref={forwardedRef}
    >
      {hasLeadingIcon ? (
        <div
          {...sxf(
            'icon',
            disabled && 'icon$disabled',
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
            disabled && 'label$disabled',
            hasOverlay ? 'invisible' : null,
          )}
        >
          {children}
        </span>
      ) : null}

      {hasOverlay ? (
        <div {...sxf('overlay')}>
          {loadingText ? (
            <span {...sxf('label', disabled && 'label$disabled')}>
              {loadingText}
            </span>
          ) : (
            <div {...sxf(disabled && 'icon$disabled')}>
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
              disabled && 'icon$disabled',
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
              disabled && 'icon$disabled',
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
