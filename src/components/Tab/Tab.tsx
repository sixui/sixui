import { useCallback, useEffect, useRef, useState } from 'react';

import type { ITabThemeFactory } from './Tab.css';
import type { ITabFactory } from './Tab.types';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Anchored } from '../Anchored';
import { Button } from '../Button';
import { useTabsContext } from '../Tabs/Tabs.context';
import { tabTheme, tabThemeVariants } from './Tab.css';

const COMPONENT_NAME = 'Tab';

export const Tab = polymorphicComponentFactory<ITabFactory>(
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

    const activeTabRef = useRef<HTMLElement>(null);
    const activeTabHandleRef = useMergeRefs(forwardedRef, activeTabRef);
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
      !!badge &&
      !disabled &&
      !!hasLabel &&
      (variant === 'secondary' || !hasIcon);

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
        disabled: disabledOrReadOnly,
        active,
        'with-icon': hasIcon,
        'with-label': hasLabel,
        'with-inline-badge': hasInlineBadge,
        'with-anchored-badge': hasAnchoredBadge,
      },
    });

    const renderIcon = (): React.ReactNode =>
      hasIcon &&
      (hasAnchoredBadge ? (
        <Anchored content={!disabled && badge}>{icon}</Anchored>
      ) : (
        icon
      ));

    const renderActiveIndicator = (): React.ReactNode => (
      <div {...getStyles('activeIndicator')} ref={activeIndicatorRef} />
    );

    useEffect(() => {
      const activeTab = activeTabRef.current;
      const activeIndicator = activeIndicatorRef.current;
      if (!activeTab || !activeIndicator) {
        return;
      }

      if (active) {
        tabsContext?.onTabActivated(activeTab, activeIndicator);
      }
    }, [active, anchor, tabsContext, forwardedRef]);

    const handleClick: React.MouseEventHandler<Element> = useCallback(
      (event) => {
        if (handlingClick) {
          return;
        }

        setHandlingClick(true);

        void Promise.resolve()
          .then(() => onClick?.(event))
          .then(() => tabsContext?.onChange?.(anchor))
          .finally(() => setHandlingClick(false));
      },
      [onClick, tabsContext, anchor, handlingClick, setHandlingClick],
    );

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

Tab.theme = tabTheme;
Tab.displayName = `@sixui/${COMPONENT_NAME}`;
