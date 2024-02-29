import * as React from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type {
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  ISvgIcon,
  IMaybeAsync,
} from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  ITabStyleKey,
  ITabStyleVarKey,
  ITabVariant,
} from './Tab.styledefs';
import { Badge, type IBadgeProps } from '../Badge';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { Elevation, IElevationStyleKey } from '@/components/utils/Elevation';
import { FocusRing, IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { Ripple, type IRippleStyleKey } from '@/components/utils/Ripple';
import { useTabContext } from '../Tabs/useTabContext';
import { Anchored } from '@/components/utils/Anchored';

// https://github.com/material-components/material-web/blob/main/tabs/internal/tab.ts

export interface ITabProps extends IContainer<ITabStyleKey, ITabStyleVarKey> {
  variant?: ITabVariant;

  /**
   * Whether or not the tab is selected.
   **/
  active?: boolean;

  icon?: ISvgIcon;
  activeIcon?: ISvgIcon;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  label?: string;
  anchor?: string;
  disabled?: boolean;
  rippleStyles?: IZeroOrMore<ICompiledStyles<IRippleStyleKey>>;
  focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
  elevationStyles?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
  badge?: IBadgeProps;
}

type ITabVariantMap = {
  [key in ITabVariant]: keyof Pick<
    IThemeComponents,
    'PrimaryTab' | 'SecondaryTab'
  >;
};

const variantMap: ITabVariantMap = {
  primary: 'PrimaryTab',
  secondary: 'SecondaryTab',
};

export const Tab: React.FC<ITabProps> = ({
  icon: Icon,
  activeIcon: ActiveIcon,
  onClick,
  label,
  anchor,
  disabled,
  badge,
  ...props
}) => {
  const tabContext = useTabContext();
  const variant = props.variant ?? tabContext?.variant ?? 'primary';

  const theme = useComponentTheme('Tab');
  const variantTheme = useComponentTheme(variantMap[variant]);

  const actionRef = React.useRef<HTMLButtonElement>(null);
  const visualState = accumulate(useVisualState(actionRef), props.visualState);
  const indicatorRef = React.useRef<HTMLDivElement>(null);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ITabStyleKey, ITabStyleVarKey>(
        stylesCombinatorFactory(
          theme.styles,
          variantTheme.styles,
          props.styles,
        ),
        visualState,
      ),
    [theme.styles, variantTheme.styles, props.styles, visualState],
  );

  const fullWidthIndicator = variant === 'secondary';
  const stacked = variant === 'primary';
  const hasLabel = !!label;
  const active = !disabled
    ? tabContext
      ? tabContext.anchor !== undefined && tabContext.anchor === anchor
      : props.active
    : false;
  const hasIcon = active ? !!ActiveIcon || !!Icon : !!Icon;
  const id = tabContext && anchor ? `${tabContext.id}-${anchor}` : undefined;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (event) => {
        tabContext?.onChange(anchor);

        Promise.resolve(onClick?.(event)).catch((error: Error) => {
          throw error;
        });
      },
      [onClick, tabContext, anchor],
    );

  const indicator = React.useMemo(
    () => (
      <div
        {...styleProps(['indicator', active && 'indicator$active'])}
        ref={indicatorRef}
      />
    ),
    [styleProps, active],
  );

  React.useEffect(() => {
    const activeTab = actionRef.current;
    const indicator = indicatorRef.current;
    if (tabContext && active && activeTab && indicator) {
      tabContext.onTabActivated(activeTab, indicator);
    }
  }, [active, anchor, tabContext]);

  const renderIcon = React.useCallback(
    (): React.ReactNode | null =>
      active && ActiveIcon ? (
        <ActiveIcon
          {...styleProps(['icon', 'icon$active', disabled && 'icon$disabled'])}
          aria-hidden
        />
      ) : Icon ? (
        <Icon
          {...styleProps([
            'icon',
            active && 'icon$active',
            disabled && 'icon$disabled',
          ])}
          aria-hidden
        />
      ) : null,
    [active, Icon, ActiveIcon, styleProps, disabled],
  );

  return (
    <button
      {...styleProps(
        [
          'host',
          active && 'host$active',
          disabled && 'host$disabled',
          props.sx,
        ],
        [theme.vars, variantTheme.vars, props.theme],
      )}
      ref={actionRef}
      role='tab'
      aria-controls={id}
      aria-selected={active}
      onClick={handleClick}
    >
      <Elevation
        styles={[
          theme.elevationStyles,
          variantTheme.elevationStyles,
          ...asArray(props.elevationStyles),
        ]}
        disabled={disabled}
      />
      <div {...styleProps(['background', disabled && 'background$disabled'])} />
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
        styles={[
          theme.rippleStyles,
          variantTheme.rippleStyles,
          ...asArray(props.rippleStyles),
        ]}
        for={actionRef}
        disabled={disabled}
        visualState={visualState}
      />
      <div
        {...styleProps([
          'content',
          stacked && 'content$stacked',
          stacked && hasIcon && hasLabel && 'content$stacked$hasIcon$hasLabel',
        ])}
        role='presentation'
      >
        {hasIcon ? (
          badge && (variant === 'primary' || !hasLabel) ? (
            <Anchored
              content={
                badge ? <Badge {...badge} disabled={disabled} /> : undefined
              }
            >
              {renderIcon()}
            </Anchored>
          ) : (
            renderIcon()
          )
        ) : null}

        {label ? (
          <div {...styleProps(['labelContainer'])}>
            <div
              {...styleProps([
                'label',
                active && 'label$active',
                disabled && 'label$disabled',
              ])}
            >
              {label}
            </div>

            {!!badge && (!hasIcon || variant === 'secondary') ? (
              <Badge {...badge} disabled={disabled} />
            ) : null}
          </div>
        ) : null}

        {fullWidthIndicator ? null : indicator}
      </div>
      {fullWidthIndicator ? indicator : null}
    </button>
  );
};
