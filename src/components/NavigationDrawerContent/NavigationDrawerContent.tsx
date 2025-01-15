import type { INavigationDrawerContentThemeFactory } from './NavigationDrawerContent.css';
import type { INavigationDrawerContentFactory } from './NavigationDrawerContent.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { SideSheetContent } from '../SideSheetContent';
import {
  navigationDrawerContentTheme,
  navigationDrawerContentThemeVariants,
} from './NavigationDrawerContent.css';

const COMPONENT_NAME = 'NavigationDrawerContent';

export const NavigationDrawerContent =
  componentFactory<INavigationDrawerContentFactory>((props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant = 'standard',
      disabled,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } =
      useComponentTheme<INavigationDrawerContentThemeFactory>({
        componentName: COMPONENT_NAME,
        classNames,
        className,
        styles,
        style,
        variant,
        theme: navigationDrawerContentTheme,
        themeVariants: navigationDrawerContentThemeVariants,
        modifiers: {
          disabled,
        },
      });

    return (
      <SideSheetContent
        {...getStyles('root')}
        variant={variant}
        ref={forwardedRef}
        {...other}
      />
    );
  });

NavigationDrawerContent.theme = navigationDrawerContentTheme;
NavigationDrawerContent.displayName = `@sixui/${COMPONENT_NAME}`;
