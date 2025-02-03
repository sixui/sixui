import type { INavigationDrawerSectionThemeFactory } from './NavigationDrawerSection.css';
import type { INavigationDrawerSectionFactory } from './NavigationDrawerSection.types';
import { Box } from '~/components/Box';
import { Divider } from '~/components/Divider';
import { List } from '~/components/List';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import { COMPONENT_NAME } from './NavigationDrawerSection.constants';
import { navigationDrawerSectionTheme } from './NavigationDrawerSection.css';

export const NavigationDrawerSection =
  componentFactory<INavigationDrawerSectionFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      headline,
      children,
      endDivider,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } =
      useComponentTheme<INavigationDrawerSectionThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: navigationDrawerSectionTheme,
      });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {headline && <div {...getStyles('headline')}>{headline}</div>}
        <div>
          <List {...getStyles('list')} ref={forwardedRef}>
            {children}
          </List>
          {endDivider && <Divider {...getStyles('divider')} />}
        </div>
      </Box>
    );
  });

NavigationDrawerSection.theme = navigationDrawerSectionTheme;
NavigationDrawerSection.displayName = `@sixui/core/${COMPONENT_NAME}`;
NavigationDrawerSection.Destination = NavigationDrawerDestination;
