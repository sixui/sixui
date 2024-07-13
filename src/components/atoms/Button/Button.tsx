import { forwardRef, useMemo, useState } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { IThemeComponents } from '@/components/utils/Theme';
import type {
  IButtonVariant,
  IButtonStyleKey,
  IButtonStyleVarKey,
} from './Button.styledefs';
import type {
  BUTTON_DEFAULT_TAG,
  IButtonOwnProps,
  IButtonProps,
} from './ButtonProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';
import { IndeterminateCircularProgressIndicator } from '@/components/atoms/CircularProgressIndicator';
import { ButtonBase } from '@/components/atoms/ButtonBase';
import { executeLazyPromise } from '@/helpers/executeLazyPromise';

// https://github.com/material-components/material-web/blob/main/button/internal/button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/elevated-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/filled-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/filled-tonal-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/outlined-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/text-button.ts

type IButtonVariantMap = {
  [key in IButtonVariant]: keyof Pick<
    IThemeComponents,
    | 'ElevatedButton'
    | 'FilledButton'
    | 'FilledTonalButton'
    | 'OutlinedButton'
    | 'TextButton'
    | 'DangerButton'
    | 'SnackbarButton'
  >;
};

const variantMap: IButtonVariantMap = {
  elevated: 'ElevatedButton',
  filled: 'FilledButton',
  filledTonal: 'FilledTonalButton',
  outlined: 'OutlinedButton',
  text: 'TextButton',
  danger: 'DangerButton',
  snackbar: 'SnackbarButton',
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
    as,
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

  const { theme, variantTheme, overridenStyles } = useComponentThemeOld(
    'Button',
    variant ? variantMap[variant] : undefined,
  );

  const stylesCombinator = useMemo(
    () =>
      stylesCombinatorFactory<IButtonStyleKey>(
        theme.styles,
        variantTheme?.styles,
        styles,
      ),
    [theme.styles, variantTheme?.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<IButtonStyleKey, IButtonStyleVarKey>(stylesCombinator),
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
      as={as}
      styles={[theme.styles, variantTheme?.styles, ...asArray(styles)]}
      sx={[
        loading ? stylesCombinator('host$loading') : undefined,
        theme.vars,
        variantTheme?.vars,
        hasLeadingIcon && stylesCombinator('host$withLeadingIcon'),
        hasTrailingIcon && stylesCombinator('host$withTrailingIcon'),
        overridenStyles,
        sx,
      ]}
      innerStyles={{
        ...innerStyles,
        stateLayer: [
          theme.stateLayerStyles,
          variantTheme?.stateLayerStyles,
          ...asArray(innerStyles?.stateLayer),
        ],
        focusRing: [
          theme.focusRingStyles,
          variantTheme?.focusRingStyles,
          ...asArray(innerStyles?.focusRing),
        ],
        elevation: [
          theme.elevationStyles,
          variantTheme?.stateLayerStyles,
          ...asArray(innerStyles?.elevation),
        ],
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
                theme.circularProgressIndicatorStyles,
                variantTheme?.circularProgressIndicatorStyles,
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
                  theme.circularProgressIndicatorStyles,
                  variantTheme?.circularProgressIndicatorStyles,
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
                theme.circularProgressIndicatorStyles,
                variantTheme?.circularProgressIndicatorStyles,
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
