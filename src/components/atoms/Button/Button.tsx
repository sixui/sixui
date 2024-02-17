import * as React from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type { ICompiledStyles, IIcon } from '@/helpers/types';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  IButtonStyleKey,
  IButtonStyleVarKey,
  IButtonVariant,
} from './Button.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import {
  type ICircularProgressIndicatorStyleKey,
  IndeterminateCircularProgressIndicator,
} from '@/components/atoms/CircularProgressIndicator';
import { ButtonBase, type IButtonBaseProps } from './ButtonBase';

export interface IButtonProps extends IButtonBaseProps {
  variant?: IButtonVariant;
  icon?: IIcon;
  trailingIcon?: boolean;
  loading?: boolean;
  loadingAnimation?: 'progressIndicator' | 'halfSpin' | 'none';
  loadingText?: string;
  circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
}

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

// https://github.com/material-components/material-web/blob/main/button/internal/button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/elevated-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/filled-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/filled-tonal-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/outlined-button.ts
// https://github.com/material-components/material-web/blob/main/button/internal/text-button.ts
export const Button: React.FC<IButtonProps> = ({
  children,
  onClick,
  type,
  variant = 'elevated',
  icon: Icon,
  trailingIcon,
  loadingAnimation = 'progressIndicator',
  loadingText,
  href,
  ...props
}) => {
  const theme = useComponentTheme('Button');
  const variantTheme = useComponentTheme(variantMap[variant]);

  const actionRef = React.useRef<HTMLButtonElement | HTMLLinkElement>(null);
  const [handlingClick, setHandlingClick] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);
  const visualState = accumulate(useVisualState(actionRef), props.visualState);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IButtonStyleKey, IButtonStyleVarKey>(
        stylesCombinatorFactory(
          theme.styles,
          variantTheme.styles,
          props.styles,
        ),
        visualState,
      ),
    [theme.styles, variantTheme.styles, props.styles, visualState],
  );

  const handleAnimationIteration = (): void => setAnimating(handlingClick);

  const handleClick: React.MouseEventHandler<HTMLElement> | undefined = onClick
    ? (event) => {
        if (handlingClick) {
          return;
        }

        setHandlingClick(true);
        setAnimating(true);

        Promise.resolve(onClick(event))
          .finally(() => setHandlingClick(false))
          .catch((error: Error) => {
            throw error;
          });
      }
    : undefined;

  const loading =
    (props.loading || handlingClick) &&
    loadingAnimation === 'progressIndicator';
  const disabled = props.disabled || loading;
  const hasIcon = !!Icon;
  const hasLeadingIcon = hasIcon && !trailingIcon;
  const hasTrailingIcon = hasIcon && !!trailingIcon;
  const hasOverlay = loading && (!!loadingText || !hasIcon);
  const iconAnimation =
    (animating || props.loading || handlingClick) &&
    loadingAnimation !== undefined &&
    loadingAnimation !== 'progressIndicator' &&
    loadingAnimation !== 'none'
      ? loadingAnimation
      : undefined;

  return (
    <ButtonBase
      theme={[theme.vars, variantTheme.vars, ...asArray(props.theme)]}
      styles={[theme.styles, variantTheme.styles, ...asArray(props.styles)]}
      sx={props.sx}
      rippleStyles={[
        theme.rippleStyles,
        variantTheme.rippleStyles,
        ...asArray(props.rippleStyles),
      ]}
      focusRingStyles={[
        theme.focusRingStyles,
        variantTheme.focusRingStyles,
        ...asArray(props.focusRingStyles),
      ]}
      elevationStyles={[
        theme.elevationStyles,
        variantTheme.elevationStyles,
        ...asArray(props.elevationStyles),
      ]}
      visualState={visualState}
      type={type}
      disabled={disabled}
      aria-label={props['aria-label']}
      aria-haspopup={props['aria-haspopup']}
      aria-expanded={props['aria-expanded']}
      href={href}
      onClick={handleClick}
      withLeadingIcon={hasLeadingIcon}
      withTrailingIcon={hasTrailingIcon}
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
                ...asArray(props.circularProgressIndicatorStyles),
              ]}
            />
          ) : Icon ? (
            <Icon
              {...styleProps([iconAnimation && `icon$${iconAnimation}`])}
              aria-hidden
              onAnimationIteration={handleAnimationIteration}
            />
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
                  ...asArray(props.circularProgressIndicatorStyles),
                ]}
              />
            </div>
          )}
        </div>
      ) : null}

      {Icon && trailingIcon ? (
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
                ...asArray(props.circularProgressIndicatorStyles),
              ]}
            />
          </div>
        ) : (
          <Icon
            {...styleProps([
              'icon',
              disabled && 'icon$disabled',
              iconAnimation && `icon$${iconAnimation}`,
            ])}
            aria-hidden
            onAnimationIteration={handleAnimationIteration}
          />
        )
      ) : null}
    </ButtonBase>
  );
};
