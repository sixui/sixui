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
import { useTabsContext } from '../Tabs/useTabsContext';

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
  fullWidthIndicator?: boolean;
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
  fullWidthIndicator,
  inlineIcon,
  onClick,
  label,
  anchor,
  disabled,
  ...props
}) => {
  const tabsContext = useTabsContext();
  const variant = tabsContext?.variant ?? props.variant ?? 'primary';

  const { theme, styles, focusRingStyles, rippleStyles, elevationStyles } =
    useComponentTheme('Tab');
  const { theme: variantTheme, styles: variantStyles } = useComponentTheme(
    variantMap[variant],
  );

  const hostRef = React.useRef<HTMLDivElement>(null);
  const actionElRef = React.useRef<HTMLButtonElement>(null);
  const visualState = accumulate(
    useVisualState(actionElRef),
    props.visualState,
  );
  const indicatorRef = React.useRef<HTMLDivElement>(null);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ITabStyleKey, ITabStyleVarKey>(
        stylesCombinatorFactory(styles, variantStyles, props.styles),
        visualState,
      ),
    [styles, variantStyles, props.styles, visualState],
  );

  const stacked = !inlineIcon;
  const hasLabel = !!label;
  const active = !disabled
    ? tabsContext
      ? tabsContext.anchor !== undefined && tabsContext.anchor === anchor
      : props.active
    : false;
  const hasIcon = active ? !!ActiveIcon || !!Icon : !!Icon;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> =
    React.useCallback(
      (event) => {
        tabsContext?.onChange(anchor);

        Promise.resolve(onClick?.(event)).catch((error: Error) => {
          throw error;
        });
      },
      [onClick, tabsContext, anchor],
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
    const activeTab = hostRef.current;
    const indicator = indicatorRef.current;
    if (tabsContext && active && activeTab && indicator) {
      tabsContext.onTabActivated(activeTab, indicator);
    }
  }, [active, anchor, tabsContext]);

  return (
    <div
      {...styleProps(
        ['host', active && 'host$active', disabled && 'host$disabled'],
        [theme, variantTheme, props.theme],
      )}
      ref={hostRef}
    >
      <button
        {...styleProps(['button'])}
        ref={actionElRef}
        role='tab'
        // TODO: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tab_role#associated_roles_and_attributes
        aria-controls=''
        aria-selected={active}
        onClick={handleClick}
      >
        <div
          {...styleProps(['background', disabled && 'background$disabled'])}
        />
        <FocusRing
          styles={focusRingStyles}
          for={actionElRef}
          visualState={visualState}
          inward
        />
        <Elevation styles={elevationStyles} disabled={disabled} />
        <Ripple
          styles={rippleStyles}
          for={actionElRef}
          disabled={disabled}
          visualState={visualState}
        />
        <div
          {...styleProps([
            'content',
            stacked && 'content$stacked',
            stacked &&
              hasIcon &&
              hasLabel &&
              'content$stacked$hasIcon$hasLabel',
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
    </div>
  );
};
