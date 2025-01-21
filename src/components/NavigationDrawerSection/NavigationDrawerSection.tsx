import type { INavigationDrawerSectionThemeFactory } from './NavigationDrawerSection.css';
import type { INavigationDrawerSectionFactory } from './NavigationDrawerSection.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { Divider } from '../Divider';
import { List } from '../List';
import { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import { navigationDrawerSectionTheme } from './NavigationDrawerSection.css';

const COMPONENT_NAME = 'NavigationDrawerSection';

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
NavigationDrawerSection.displayName = `@sixui/${COMPONENT_NAME}`;
NavigationDrawerSection.Destination = NavigationDrawerDestination;
