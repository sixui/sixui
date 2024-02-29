import * as React from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type {
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type { IContainerProps } from '@/components/utils/Container';
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
import {
  Elevation,
  type IElevationStyleKey,
} from '@/components/utils/Elevation';
import {
  FocusRing,
  type IFocusRingStyleKey,
} from '@/components/utils/FocusRing';
import { Ripple, type IRippleStyleKey } from '@/components/utils/Ripple';
import { IThemeComponents } from '@/helpers/ThemeContext';
import {
  IndeterminateCircularProgressIndicator,
  type ICircularProgressIndicatorStyleKey,
} from '@/components/atoms/CircularProgressIndicator';

// https://github.com/material-components/material-web/blob/main/fab/internal/shared.ts
// https://github.com/material-components/material-web/blob/main/fab/internal/fab.ts

export type IFabProps = IContainerProps<IFabStyleKey, IFabStyleVarKey> &
  Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'disabled' | 'aria-label'
  > & {
    children?: React.ReactNode;
    size?: IFabSize;
    onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
    variant?: IFabVariant;
    lowered?: boolean;
    loading?: boolean;
    loadingText?: string;
    label?: string;
    icon?: React.ReactNode;
    component?: React.ElementType;
    href?: string;
    rippleStyles?: IZeroOrMore<ICompiledStyles<IRippleStyleKey>>;
    focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    elevationStyles?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
    circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
  };

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

export const Fab: React.FC<IFabProps> = ({
  children,
  size = 'md',
  onClick,
  variant = 'surface',
  lowered,
  loadingText,
  label,
  icon,
  href,
  ...props
}) => {
  const theme = useComponentTheme('Fab');
  const variantTheme = useComponentTheme(variantMap[variant]);

  const actionRef = React.useRef<HTMLButtonElement | HTMLLinkElement>(null);
  const [handlingClick, setHandlingClick] = React.useState(false);
  const visualState = accumulate(useVisualState(actionRef), props.visualState);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IFabStyleKey, IFabStyleVarKey>(
        stylesCombinatorFactory(
          theme.styles,
          variantTheme.styles,
          props.styles,
        ),
        visualState,
      ),
    [theme.styles, variantTheme.styles, props.styles, visualState],
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
  const hasIcon = !!icon || hasChildren;
  const hasLeading = hasIcon;
  const hasOverlay = loading && (!!loadingText || !hasIcon);

  const Component: React.ElementType = props.component
    ? props.component
    : href
      ? 'a'
      : 'button';

  return (
    <div
      {...styleProps(
        [
          'host',
          extended ? 'host$md' : `host$${size}`,
          lowered && 'host$lowered',
          disabled && 'host$disabled',
          props.sx,
        ],
        [theme.vars, variantTheme.vars, props.theme],
      )}
    >
      <Elevation
        styles={[
          theme.elevationStyles,
          variantTheme.elevationStyles,
          ...asArray(props.elevationStyles),
        ]}
        disabled={disabled}
      />
      <div
        {...styleProps([
          'background',
          lowered && 'background$lowered',
          disabled && 'background$disabled',
        ])}
      />
      <FocusRing
        styles={[
          theme.focusRingStyles,
          variantTheme.focusRingStyles,
          ...asArray(props.focusRingStyles),
        ]}
        for={actionRef}
        visualState={visualState}
      />
      <Ripple
        for={actionRef}
        styles={[
          theme.rippleStyles,
          variantTheme.rippleStyles,
          ...asArray(props.rippleStyles),
        ]}
        disabled={disabled}
        visualState={visualState}
      />

      <Component
        {...styleProps([
          'fab',
          extended ? 'fab$md' : `fab$${size}`,
          extended && 'fab$extended',
        ])}
        ref={actionRef}
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
                styles={[
                  theme.circularProgressIndicatorStyles,
                  variantTheme.circularProgressIndicatorStyles,
                  ...asArray(props.circularProgressIndicatorStyles),
                ]}
              />
            ) : hasChildren ? (
              children
            ) : icon ? (
              icon
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
      </Component>
    </div>
  );
};
