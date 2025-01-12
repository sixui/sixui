import { useCallback, useEffect, useRef } from 'react';

import type { ITabThemeFactory } from './Tab.css';
import type { ITabFactory } from './Tab.types';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Anchored } from '../Anchored';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { useTabsContext } from '../Tabs';
import { tabTheme, tabThemeVariants } from './Tab.css';

const COMPONENT_NAME = 'Tab';

export const Tab = polymorphicComponentFactory<ITabFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'primary',
      label,
      children,
      active: activeProp,
      icon: iconProp,
      activeIcon,
      anchor,
      badgeProps,
      disabled: disabledProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const activeTabRef = useRef<HTMLElement>(null);
    const activeTabHandleRef = useMergeRefs(forwardedRef, activeTabRef);
    const activeIndicatorRef = useRef<HTMLDivElement>(null);
    const tabsContext = useTabsContext();

    const disabled = disabledProp ?? tabsContext?.disabled;
    const active =
      !disabled &&
      (tabsContext
        ? tabsContext.anchor !== undefined && tabsContext.anchor === anchor
        : activeProp);
    const icon = active && activeIcon ? activeIcon : iconProp;
    const hasIcon = active ? !!activeIcon || !!icon : !!icon;
    const hasLabel = !!label;
    const hasBadge = !!badgeProps;
    const id =
      tabsContext && anchor ? `${tabsContext.id}-${anchor}` : undefined;

    const { getStyles } = useComponentTheme<ITabThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: tabTheme,
      themeVariants: tabThemeVariants,
      modifiers: {
        'with-icon': hasIcon,
        'with-label': hasLabel,
        active,
        disabled,
      },
    });

    const renderIcon = useCallback(
      (): React.ReactNode =>
        hasIcon &&
        (hasBadge && (variant === 'primary' || !hasLabel) ? (
          <Anchored
            content={
              badgeProps && !disabled ? <Badge {...badgeProps} /> : undefined
            }
          >
            {icon}
          </Anchored>
        ) : (
          icon
        )),
      [hasIcon, hasBadge, variant, hasLabel, badgeProps, disabled, icon],
    );

    const renderActiveIndicator = useCallback(
      () => <div {...getStyles('activeIndicator')} ref={activeIndicatorRef} />,
      [getStyles],
    );

    useEffect(() => {
      const activeTab = activeTabRef.current;
      const activeIndicator = activeIndicatorRef.current;
      if (tabsContext && active && activeTab && activeIndicator) {
        tabsContext.onTabActivated(activeTab, activeIndicator);
      }
    }, [active, anchor, tabsContext, forwardedRef]);

    return (
      <Button
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
          focusRing: getStyles('focusRing').className,
        })}
        ref={activeTabHandleRef}
        variant={false}
        leadingIcon={renderIcon()}
        disabled={disabled}
        indicator={renderActiveIndicator()}
        focusRingProps={{ variant: 'inward' }}
        role="tab"
        aria-controls={id}
        aria-selected={active}
        {...other}
      >
        {label ?? children}
        {hasBadge && !disabled && (!hasIcon || variant === 'secondary') && (
          <Badge {...badgeProps} ml="$2" />
        )}
      </Button>
    );
  },
);

Tab.theme = tabTheme;
Tab.displayName = `@sixui/${COMPONENT_NAME}`;
