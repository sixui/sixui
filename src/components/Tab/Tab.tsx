import { useCallback, useRef } from 'react';

import type { ITabThemeFactory } from './Tab.css';
import type { ITabFactory } from './Tab.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { Button } from '../Button';
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
      active,
      icon,
      activeIcon,
      anchor,
      badgeProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const activeIndicatorRef = useRef<HTMLDivElement>(null);

    const hasIconAndLabel = !!icon && !!label;

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
