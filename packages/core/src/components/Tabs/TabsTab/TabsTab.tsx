import { useCallback, useEffect, useRef, useState } from 'react';

import type { ITabsTabThemeFactory } from './TabsTab.css';
import type { ITabsTabFactory } from './TabsTab.types';
import { Anchored } from '~/components/Anchored';
import { Button } from '~/components/Button';
import { useTabsContext } from '~/components/Tabs/Tabs.context';
import { useComponentTheme, useProps } from '~/components/Theme';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { COMPONENT_NAME } from './TabsTab.constants';
import { tabsTabTheme, tabsTabThemeVariants } from './TabsTab.css';

/**
 * @see https://m3.material.io/components/tabs/overview
 */
export const TabsTab = polymorphicComponentFactory<ITabsTabFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant: variantProp,
      label,
      loading: loadingProp,
      active: activeProp,
      icon: iconProp,
      activeIcon,
      readOnly: readOnlyProp,
      anchor,
      badge,
      disabled: disabledProp,
      onClick,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const activeTabsTabRef = useRef<HTMLElement>(null);
    const activeTabsTabHandleRef = useMergeRefs(forwardedRef, activeTabsTabRef);
    const activeIndicatorRef = useRef<HTMLDivElement>(null);
    const tabsContext = useTabsContext();
    const [handlingClick, setHandlingClick] = useState(false);

    const variant = variantProp ?? tabsContext?.variant ?? 'primary';
    const disabled = disabledProp ?? tabsContext?.disabled;
    const active = tabsContext
      ? tabsContext.anchor !== undefined && tabsContext.anchor === anchor
      : activeProp;
    const icon = active && activeIcon ? activeIcon : iconProp;
    const hasIcon = active ? !!activeIcon || !!icon : !!icon;
    const hasLabel = !!label;
    const id =
      tabsContext && anchor ? `${tabsContext.id}-${anchor}` : undefined;
    const loading = loadingProp || handlingClick;
    const readOnly = readOnlyProp || loading;
    const disabledOrReadOnly = disabled || readOnly;
    const hasAnchoredBadge =
      !!badge && !disabled && (variant === 'primary' || !hasLabel);
    const hasInlineBadge =
      !!badge && !disabled && hasLabel && (variant === 'secondary' || !hasIcon);

    const { getStyles } = useComponentTheme<ITabsTabThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: tabsTabTheme,
      themeVariants: tabsTabThemeVariants,
    });

    const renderIcon = (): React.ReactNode =>
      hasIcon &&
      (hasAnchoredBadge ? <Anchored content={badge}>{icon}</Anchored> : icon);

    const renderActiveIndicator = (): React.ReactNode => (
      <div {...getStyles('activeIndicator')} ref={activeIndicatorRef} />
    );

    useEffect(() => {
      const activeTabsTab = activeTabsTabRef.current;
      const activeIndicator = activeIndicatorRef.current;
      if (!activeTabsTab || !activeIndicator) {
        return;
      }

      if (active) {
        tabsContext?.onTabActivated(activeTabsTab, activeIndicator);
      }
    }, [active, anchor, tabsContext, forwardedRef]);

    const handleClick: React.MouseEventHandler = useCallback(
      (event) => {
        if (handlingClick) {
          return;
        }

        setHandlingClick(true);

        void Promise.resolve()
          .then(() => onClick?.(event))
          .then(() => tabsContext?.onChange?.(anchor))
          .finally(() => {
            setHandlingClick(false);
          });
      },
      [onClick, tabsContext, anchor, handlingClick, setHandlingClick],
    );

    return (
      <Button
        {...getStyles('root', {
          modifiers: {
            disabled: disabledOrReadOnly,
            active,
            'with-icon': hasIcon,
            'with-label': hasLabel,
            'with-inline-badge': hasInlineBadge,
            'with-anchored-badge': hasAnchoredBadge,
          },
        })}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
        })}
        ref={activeTabsTabHandleRef}
        variant={false}
        leadingIcon={renderIcon()}
        disabled={disabled}
        readOnly={readOnly}
        focusRingProps={{ variant: 'inward' }}
        role="tab"
        aria-controls={id}
        aria-selected={active}
        onClick={handleClick}
        loading={loading}
        {...other}
      >
        {({
          renderFocusRing,
          renderStateLayer,
          renderContent,
          renderTouchTarget,
        }) => (
          <>
            {renderFocusRing()}
            {renderStateLayer()}
            {renderContent(
              hasInlineBadge ? (
                <>
                  <span {...getStyles('label')}>{label}</span>
                  {badge}
                </>
              ) : (
                label
              ),
            )}
            {renderActiveIndicator()}
            {renderTouchTarget()}
          </>
        )}
      </Button>
    );
  },
);

TabsTab.displayName = `@sixui/core/${COMPONENT_NAME}`;
TabsTab.theme = tabsTabTheme;
