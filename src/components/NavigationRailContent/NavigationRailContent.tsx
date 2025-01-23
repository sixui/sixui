import type { INavigationRailContentThemeFactory } from './NavigationRailContent.css';
import type { INavigationRailContentFactory } from './NavigationRailContent.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { NavigationRailDestination } from '../NavigationRailDestination';
import { PaperBase } from '../PaperBase';
import { navigationRailContentTheme } from './NavigationRailContent.css';

const COMPONENT_NAME = 'NavigationRailContent';

export const NavigationRailContent =
  componentFactory<INavigationRailContentFactory>((props, forwardedRef) => {
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
      side = 'left',
      divider,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<INavigationRailContentThemeFactory>(
      {
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: navigationRailContentTheme,
        modifiers: {
          'with-divider': divider,
          side,
          justify,
        },
      },
    );

    return (
      <PaperBase {...getStyles('root')} ref={forwardedRef} {...other}>
        {header && <div {...getStyles('header')}>{header}</div>}
        <div {...getStyles('content')}>{children}</div>
        {footer && <div {...getStyles('footer')}>{footer}</div>}
      </PaperBase>
    );
  });

NavigationRailContent.theme = navigationRailContentTheme;
NavigationRailContent.displayName = `@sixui/${COMPONENT_NAME}`;
NavigationRailContent.Destination = NavigationRailDestination;
