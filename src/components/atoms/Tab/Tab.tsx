import React from 'react';
import { accumulate } from '@olivierpascal/helpers';

import type { IAny, IIcon, IMaybeAsync } from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  ITabStyleKey,
  ITabStyleVarKey,
  ITabVariant,
} from './Tab.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { Elevation } from '@/components/utils/Elevation';
import { FocusRing } from '@/components/utils/FocusRing';
import { Ripple } from '@/components/utils/Ripple';
import { useTabContext } from '../Tabs/useTabContext';

// https://github.com/material-components/material-web/blob/main/tabs/internal/tab.ts

export interface ITabProps extends IContainer<ITabStyleKey, ITabStyleVarKey> {
  variant?: ITabVariant;

  /**
   * Whether or not the tab is selected.
   **/
  active?: boolean;

  /**
   * Whether or not the icon renders inline with label or stacked vertically.
   */
  inlineIcon?: boolean;

  icon?: IIcon;
  activeIcon?: IIcon;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  label?: string;
  anchor?: string;
  disabled?: boolean;
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
  inlineIcon,
  onClick,
  label,
  anchor,
  disabled,
  ...props
}) => {
  const tabContext = useTabContext();
  const variant = props.variant ?? tabContext?.variant ?? 'primary';

  const { theme, styles, focusRingStyles, rippleStyles, elevationStyles } =
    useComponentTheme('Tab');
  const { theme: variantTheme, styles: variantStyles } = useComponentTheme(
    variantMap[variant],
  );

  const actionRef = React.useRef<HTMLButtonElement>(null);
  const visualState = accumulate(useVisualState(actionRef), props.visualState);
  const indicatorRef = React.useRef<HTMLDivElement>(null);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ITabStyleKey, ITabStyleVarKey>(
        stylesCombinatorFactory(styles, variantStyles, props.styles),
        visualState,
      ),
    [styles, variantStyles, props.styles, visualState],
  );

  const fullWidthIndicator = variant === 'secondary';
  const stacked = !inlineIcon;
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

  return (
    <button
      {...styleProps(
        ['host', active && 'host$active', disabled && 'host$disabled'],
        [theme, variantTheme, props.theme],
      )}
      ref={actionRef}
      role='tab'
      aria-controls={id}
      aria-selected={active}
      onClick={handleClick}
    >
      <Elevation styles={elevationStyles} disabled={disabled} />
      <div {...styleProps(['background', disabled && 'background$disabled'])} />
      <FocusRing
        styles={focusRingStyles}
        for={actionRef}
        visualState={visualState}
      />
      <Ripple
        styles={rippleStyles}
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
        {active && ActiveIcon ? (
          <ActiveIcon
            {...styleProps([
              'icon',
              'icon$active',
              disabled && 'icon$disabled',
            ])}
            aria-hidden='true'
          />
        ) : Icon ? (
          <Icon
            {...styleProps([
              'icon',
              active && 'icon$active',
              disabled && 'icon$disabled',
            ])}
            aria-hidden='true'
          />
        ) : null}

        {label ? (
          <div
            {...styleProps([
              'label',
              active && 'label$active',
              disabled && 'label$disabled',
            ])}
          >
            {label}
          </div>
        ) : null}

        {fullWidthIndicator ? null : indicator}
      </div>
      {fullWidthIndicator ? indicator : null}
    </button>
  );
};
