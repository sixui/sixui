import { forwardRef, useMemo, useState } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IAny, ICompiledStyles, IMaybeAsync } from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/polymorphicComponentTypes';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  IButtonStyleKey,
  IButtonStyleVarKey,
  IButtonVariant,
} from './Button.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  type ICircularProgressIndicatorStyleKey,
  IndeterminateCircularProgressIndicator,
} from '@/components/atoms/CircularProgressIndicator';
import { ButtonBase, type IButtonBaseOwnProps } from './ButtonBase';

// https://github.com/material-components/material-web/blob/main/button/internal/button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/elevated-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/filled-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/filled-tonal-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/outlined-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/text-button.ts

const DEFAULT_TAG = 'button';

export type IButtonOwnProps = IButtonBaseOwnProps & {
  variant?: IButtonVariant;
  icon?: React.ReactNode;
  trailingIcon?: boolean;
  loading?: boolean;
  loadingAnimation?: 'progressIndicator' | 'halfSpin' | 'none';
  loadingText?: string;
  circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
};

export type IButtonProps<TRoot extends React.ElementType = typeof DEFAULT_TAG> =
  IPolymorphicComponentPropsWithRef<TRoot, IButtonOwnProps>;

type IButtonVariantMap = {
  [key in IButtonVariant]: keyof Pick<
    IThemeComponents,
    | 'ElevatedButton'
    | 'FilledButton'
    | 'FilledTonalButton'
    | 'OutlinedButton'
    | 'TextButton'
  >;
};

const variantMap: IButtonVariantMap = {
  elevated: 'ElevatedButton',
  filled: 'FilledButton',
  filledTonal: 'FilledTonalButton',
  outlined: 'OutlinedButton',
  text: 'TextButton',
};

type IButton = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IButtonProps<TRoot>,
) => React.ReactNode;

export const Button: IButton = forwardRef(function Button<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IButtonProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
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
    circularProgressIndicatorStyles,
    disabled: disabledProp,
    ...other
  } = props as IWithAsProp<IButtonOwnProps>;

  const theme = useComponentTheme('Button');
  const variantTheme = useComponentTheme(variantMap[variant]);
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme.styles, styles),
    [theme.styles, variantTheme.styles, styles],
  );
  const styleProps = useMemo(
    () =>
      stylePropsFactory<IButtonStyleKey, IButtonStyleVarKey>(stylesCombinator),
    [stylesCombinator],
  );

  const [handlingClick, setHandlingClick] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleAnimationIteration = (): void => setAnimating(handlingClick);

  const handleClick: React.MouseEventHandler<HTMLElement> | undefined = (
    event,
  ) => {
    if (handlingClick) {
      return;
    }

    if (!onClick) {
      return;
    }

    setHandlingClick(true);
    setAnimating(true);

    Promise.resolve(onClick(event))
      .finally(() => setHandlingClick(false))
      .catch((error: Error) => {
        throw error;
      });
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
      ref={ref}
      styles={[theme.styles, variantTheme.styles, ...asArray(styles)]}
      sx={[theme.vars, variantTheme.vars, sx]}
      withLeadingIcon={hasLeadingIcon}
      withTrailingIcon={hasTrailingIcon}
      innerStyles={{
        ...innerStyles,
        stateLayer: [
          theme.stateLayerStyles,
          variantTheme.stateLayerStyles,
          ...asArray(innerStyles?.stateLayer),
        ],
        focusRing: [
          theme.focusRingStyles,
          variantTheme.focusRingStyles,
          ...asArray(innerStyles?.focusRing),
        ],
        elevation: [
          theme.elevationStyles,
          variantTheme.stateLayerStyles,
          ...asArray(innerStyles?.elevation),
        ],
      }}
      onClick={handleClick}
      disabled={disabled}
      as={props.as as React.ElementType}
      {...other}
    >
      {hasLeadingIcon ? (
        <div
          {...styleProps([
            'icon',
            disabled && 'icon$disabled',
            hasOverlay ? 'invisible' : null,
          ])}
        >
          {loading ? (
            <IndeterminateCircularProgressIndicator
              styles={[
                theme.circularProgressIndicatorStyles,
                variantTheme.circularProgressIndicatorStyles,
                ...asArray(circularProgressIndicatorStyles),
              ]}
            />
          ) : icon ? (
            <div
              {...styleProps([iconAnimation && `icon$${iconAnimation}`])}
              onAnimationIteration={handleAnimationIteration}
            >
              {icon}
            </div>
          ) : null}
        </div>
      ) : null}

      <span
        {...styleProps([
          'label',
          disabled && 'label$disabled',
          hasOverlay ? 'invisible' : null,
        ])}
      >
        {children}
      </span>

      {hasOverlay ? (
        <div {...styleProps(['overlay'])}>
          {loadingText ? (
            <span {...styleProps(['label', disabled && 'label$disabled'])}>
              {loadingText}
            </span>
          ) : (
            <div {...styleProps([disabled && 'icon$disabled'])}>
              <IndeterminateCircularProgressIndicator
                styles={[
                  theme.circularProgressIndicatorStyles,
                  variantTheme.circularProgressIndicatorStyles,
                  ...asArray(circularProgressIndicatorStyles),
                ]}
              />
            </div>
          )}
        </div>
      ) : null}

      {icon && trailingIcon ? (
        loading ? (
          <div
            {...styleProps([
              hasOverlay ? 'invisible' : null,
              disabled && 'icon$disabled',
            ])}
          >
            <IndeterminateCircularProgressIndicator
              styles={[
                theme.circularProgressIndicatorStyles,
                variantTheme.circularProgressIndicatorStyles,
                ...asArray(circularProgressIndicatorStyles),
              ]}
            />
          </div>
        ) : (
          <div
            {...styleProps([
              'icon',
              disabled && 'icon$disabled',
              iconAnimation && `icon$${iconAnimation}`,
            ])}
            onAnimationIteration={handleAnimationIteration}
          >
            {icon}
          </div>
        )
      ) : null}
    </ButtonBase>
  );
});
