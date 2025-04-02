import type { INavigationRailContentThemeFactory } from './NavigationRailContent.css';
import type { INavigationRailContentFactory } from './NavigationRailContent.types';
import { NavigationRailDestination } from '~/components/NavigationRail/NavigationRailDestination';
import { PaperBase } from '~/components/PaperBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './NavigationRailContent.constants';
import { navigationRailContentTheme } from './NavigationRailContent.css';

export const NavigationRailContent =
  componentFactory<INavigationRailContentFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      headerSlot,
      children,
      footerSlot,
      justify = 'center',
      side = 'left',
      divider,
      menuIcon,
      fab,
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
      },
    );

    return (
      <PaperBase
        {...getStyles('root', {
          modifiers: {
            'with-divider': divider,
            side,
            justify,
          },
        })}
        ref={forwardedRef}
        {...other}
      >
        <div {...getStyles('header')}>
          {headerSlot ?? (
            <>
              {menuIcon && (
                <div {...getStyles('menuIconContainer')}>{menuIcon}</div>
              )}
              {fab && <div {...getStyles('fabContainer')}>{fab}</div>}
            </>
          )}
        </div>
        <div {...getStyles('content')}>{children}</div>
        <div {...getStyles('footer')}>{footerSlot}</div>
      </PaperBase>
    );
  });

NavigationRailContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
NavigationRailContent.theme = navigationRailContentTheme;
NavigationRailContent.Destination = NavigationRailDestination;
