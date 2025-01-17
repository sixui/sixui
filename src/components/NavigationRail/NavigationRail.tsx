import type { INavigationRailThemeFactory } from './NavigationRail.css';
import type { INavigationRailFactory } from './NavigationRail.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { NavigationRailDestination } from '../NavigationRailDestination';
import { PaperBase } from '../PaperBase';
import { navigationRailTheme } from './NavigationRail.css';

const COMPONENT_NAME = 'NavigationRail';

export const NavigationRail = componentFactory<INavigationRailFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      header,
      children,
      footer,
      justify = 'center',
      divider,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<INavigationRailThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: navigationRailTheme,
      modifiers: {
        'with-divider': divider,
        justify,
      },
    });

    return (
      <PaperBase {...getStyles('root')} ref={forwardedRef} {...other}>
        {header && <div {...getStyles('header')}>{header}</div>}
        <div {...getStyles('content')}>{children}</div>
        {footer && <div {...getStyles('footer')}>{footer}</div>}
      </PaperBase>
    );
  },
);

NavigationRail.theme = navigationRailTheme;
NavigationRail.displayName = `@sixui/${COMPONENT_NAME}`;
NavigationRail.Destination = NavigationRailDestination;
