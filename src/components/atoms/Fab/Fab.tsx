import React from 'react';
import { accumulate } from '@olivierpascal/helpers';

import type { IAny, IMaybeAsync, IIcon } from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type {
  IFabSize,
  IFabStyleKey,
  IFabStyleVarKey,
  IFabVariant,
} from './Fab.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { Elevation } from '@/components/utils/Elevation';
import { FocusRing } from '@/components/utils/FocusRing';
import { Ripple } from '@/components/utils/Ripple';
import { IThemeComponents } from '@/helpers/ThemeContext';
import { IndeterminateCircularProgressIndicator } from '@/components/atoms/CircularProgressIndicator';

export interface IFabProps
  extends IContainer<IFabStyleKey, IFabStyleVarKey>,
    Pick<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'disabled' | 'aria-label'
    > {
  children?: React.ReactNode;
  size?: IFabSize;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  variant?: IFabVariant;
  lowered?: boolean;
  loading?: boolean;
  loadingText?: string;
  label?: string;
  icon?: IIcon;
  component?: React.ElementType;
  href?: string;
}

type IFabVariantMap = {
  [key in IFabVariant]: keyof Pick<
    IThemeComponents,
    'SurfaceFab' | 'PrimaryFab' | 'SecondaryFab' | 'TertiaryFab' | 'BrandedFab'
  >;
};

const variantMap: IFabVariantMap = {
  surface: 'SurfaceFab',
  primary: 'PrimaryFab',
  secondary: 'SecondaryFab',
  tertiary: 'TertiaryFab',
  branded: 'BrandedFab',
};

// https://github.com/material-components/material-web/blob/main/fab/internal/shared.ts
// https://github.com/material-components/material-web/blob/main/fab/internal/fab.ts
export const Fab: React.FC<IFabProps> = ({
  children,
  size = 'md',
  onClick,
  variant = 'surface',
  lowered,
  loadingText,
  label,
  icon: Icon,
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
  } = useComponentTheme('Fab');
  const { theme: variantTheme, styles: variantStyles } = useComponentTheme(
    variantMap[variant],
  );

  const actionElRef = React.useRef<HTMLButtonElement | HTMLLinkElement>(null);
  const [handlingClick, setHandlingClick] = React.useState(false);
  const visualState = accumulate(
    useVisualState(actionElRef),
    props.visualState,
  );

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IFabStyleKey, IFabStyleVarKey>(
        stylesCombinatorFactory(styles, variantStyles, props.styles),
        visualState,
      ),
    [styles, variantStyles, props.styles, visualState],
  );

  const handleClick: React.MouseEventHandler<HTMLElement> | undefined = onClick
    ? (event) => {
        if (handlingClick) {
          return;
        }

        setHandlingClick(true);

        Promise.resolve(onClick(event))
          .finally(() => setHandlingClick(false))
          .catch((error: Error) => {
            throw error;
          });
      }
    : undefined;

  const loading = props.loading || handlingClick;
  const disabled = props.disabled || loading;
  const extended = !!label;
  const hasChildren = variant === 'branded' && !!children;
  const hasIcon = !!Icon || hasChildren;
  const hasLeading = hasIcon;
  const hasOverlay = loading && (!!loadingText || !hasIcon);

  const Component: React.ElementType = href ? 'a' : props.component ?? 'button';

  return (
    <div
      {...styleProps(
        [
          'host',
          extended ? 'host$md' : `host$${size}`,
          lowered && 'host$lowered',
          disabled && 'host$disabled',
        ],
        [theme, variantTheme, props.theme],
      )}
    >
      <Elevation styles={elevationStyles} disabled={disabled} />
      <div
        {...styleProps([
          'background',
          lowered && 'background$lowered',
          disabled && 'background$disabled',
        ])}
      />
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
        {...styleProps([
          'fab',
          extended ? 'fab$md' : `fab$${size}`,
          extended && 'fab$extended',
        ])}
        ref={actionElRef}
        onClick={handleClick}
        readOnly={disabled}
        tabIndex={disabled ? -1 : 0}
        aria-label={props['aria-label']}
      >
        <span {...styleProps(['touchTarget'])} />

        {hasLeading ? (
          <div
            {...styleProps([
              'icon',
              extended ? `icon$md` : `icon$${size}`,
              extended && 'icon$extended',
              disabled && 'icon$disabled',
              hasOverlay ? 'invisible' : null,
            ])}
          >
            {loading ? (
              <IndeterminateCircularProgressIndicator
                styles={circularProgressIndicatorStyles}
              />
            ) : hasChildren ? (
              children
            ) : Icon ? (
              <Icon aria-hidden />
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
          {label}
        </span>

        {hasOverlay ? (
          <div {...styleProps(['overlay'])}>
            {(
              <span {...styleProps(['label', disabled && 'label$disabled'])}>
                {loadingText}
              </span>
            ) ?? (
              <div {...styleProps([disabled && 'icon$disabled'])}>
                <IndeterminateCircularProgressIndicator
                  styles={circularProgressIndicatorStyles}
                />
              </div>
            )}
          </div>
        ) : null}
      </Component>
    </div>
  );
};
