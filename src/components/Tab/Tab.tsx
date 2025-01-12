import { useCallback, useRef } from 'react';

import type { ITabThemeFactory } from './Tab.css';
import type { ITabFactory } from './Tab.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
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
      icon,
      activeIcon,
      anchor,
      badgeProps,
      disabled: disabledProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const activeIndicatorRef = useRef<HTMLDivElement>(null);
    const tabsContext = useTabsContext();

    const hasIconAndLabel = !!icon && !!label;
    const disabled = disabledProp ?? tabsContext?.disabled;
    const active =
      !disabled &&
      (tabsContext
        ? tabsContext.anchor !== undefined && tabsContext.anchor === anchor
        : activeProp);
    const hasIcon = active ? !!activeIcon || !!icon : !!icon;
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
        'with-icon-and-label': hasIconAndLabel,
        active,
        disabled,
      },
    });

    const renderActiveIndicator = useCallback(
      () => <div {...getStyles('activeIndicator')} ref={activeIndicatorRef} />,
      [getStyles],
    );

    return (
      <Button
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          stateLayer: getStyles('stateLayer').className,
          focusRing: getStyles('focusRing').className,
        })}
        ref={forwardedRef}
        variant={false}
        leadingIcon={icon}
        disabled={disabled}
        indicator={renderActiveIndicator()}
        {...other}
      >
        {label ?? children}
      </Button>
    );
  },
);

Tab.theme = tabTheme;
Tab.displayName = `@sixui/${COMPONENT_NAME}`;
