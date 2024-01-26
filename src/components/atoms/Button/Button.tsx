import React from 'react';
import { accumulate } from '@olivierpascal/helpers';

import type { IAny, IMaybeAsync, IIcon } from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
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
import { Elevation } from '@/components/utils/Elevation';
import { FocusRing } from '@/components/utils/FocusRing';
import { Ripple } from '@/components/utils/Ripple';
import { IndeterminateCircularProgressIndicator } from '@/components/atoms/CircularProgressIndicator';

export interface IButtonProps
  extends IContainer<IButtonStyleKey, IButtonStyleVarKey>,
    Pick<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'type' | 'disabled' | 'aria-label' | 'aria-haspopup' | 'aria-expanded'
    >,
    Pick<React.LinkHTMLAttributes<HTMLLinkElement>, 'href'> {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  variant?: IButtonVariant;
  icon?: IIcon;
  trailingIcon?: boolean;
  loading?: boolean;
  loadingAnimation?: 'progressIndicator' | 'halfSpin' | 'none';
  loadingText?: string;
  component?: React.ElementType;
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
  const {
    theme,
    styles,
    rippleStyles,
    elevationStyles,
    focusRingStyles,
    circularProgressIndicatorStyles,
  } = useComponentTheme('Button');
  const { theme: variantTheme, styles: variantStyles } = useComponentTheme(
    variantMap[variant],
  );

  const actionElRef = React.useRef<HTMLButtonElement | HTMLLinkElement>(null);
  const [handlingClick, setHandlingClick] = React.useState(false);
  const [animating, setAnimating] = React.useState(false);
  const visualState = accumulate(
    useVisualState(actionElRef),
    props.visualState,
  );

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IButtonStyleKey, IButtonStyleVarKey>(
        stylesCombinatorFactory(styles, variantStyles, props.styles),
        visualState,
      ),
    [styles, variantStyles, props.styles, visualState],
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
  const hasLeading = hasIcon && !trailingIcon;
  const hasOverlay = loading && (!!loadingText || !hasIcon);
  const iconAnimation =
    (animating || props.loading || handlingClick) &&
    loadingAnimation !== undefined &&
    loadingAnimation !== 'progressIndicator' &&
    loadingAnimation !== 'none'
      ? loadingAnimation
      : undefined;

  const Component: React.ElementType = href ? 'a' : props.component ?? 'button';

  return (
    <div
      {...styleProps(
        [
          'host',
          disabled && 'host$disabled',
          Icon &&
            (trailingIcon ? 'host$withTrailingIcon' : 'host$withLeadingIcon'),
        ],
        [theme, variantTheme, props.theme],
      )}
    >
      <Elevation styles={elevationStyles} disabled={disabled} />
      {variantStyles?.outline ? (
        <div {...styleProps(['outline', disabled && 'outline$disabled'])} />
      ) : null}
      <div {...styleProps(['background', disabled && 'background$disabled'])} />
      <FocusRing
        styles={focusRingStyles}
        for={actionElRef}
        visualState={visualState}
      />
      <Ripple
        styles={rippleStyles}
        for={actionElRef}
        disabled={disabled}
        visualState={visualState}
      />

      <Component
        {...styleProps(['button'])}
        ref={actionElRef}
        href={href}
        onClick={handleClick}
        role='button'
        readOnly={disabled}
        tabIndex={disabled ? -1 : 0}
        aria-label={props['aria-label']}
        aria-haspopup={props['aria-haspopup']}
        aria-expanded={props['aria-expanded']}
        type={type}
      >
        <span {...styleProps(['touchTarget'])} />

        {hasLeading ? (
          <div
            {...styleProps([
              'icon',
              disabled && 'icon$disabled',
              hasOverlay ? 'invisible' : null,
            ])}
          >
            {loading ? (
              <IndeterminateCircularProgressIndicator
                styles={circularProgressIndicatorStyles}
              />
            ) : Icon ? (
              <Icon
                {...styleProps([iconAnimation && `icon$${iconAnimation}`])}
                aria-hidden='true'
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
                  styles={circularProgressIndicatorStyles}
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
                styles={circularProgressIndicatorStyles}
              />
            </div>
          ) : (
            <Icon
              {...styleProps([
                'icon',
                disabled && 'icon$disabled',
                iconAnimation && `icon$${iconAnimation}`,
              ])}
              aria-hidden='true'
              onAnimationIteration={handleAnimationIteration}
            />
          )
        ) : null}
      </Component>
    </div>
  );
};
