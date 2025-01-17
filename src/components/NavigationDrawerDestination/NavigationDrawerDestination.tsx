import type { INavigationDrawerDestinationThemeFactory } from './NavigationDrawerDestination.css';
import type { INavigationDrawerDestinationFactory } from './NavigationDrawerDestination.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ListItem } from '../ListItem';
import { navigationDrawerDestinationTheme } from './NavigationDrawerDestination.css';

const COMPONENT_NAME = 'NavigationDrawerDestination';

export const NavigationDrawerDestination =
  componentFactory<INavigationDrawerDestinationFactory>(
    (props, forwardedRef) => {
      const {
        classNames,
        className,
        styles,
        style,
        variant,
        active,
        badgeLabel,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

      const { getStyles } =
        useComponentTheme<INavigationDrawerDestinationThemeFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          variant,
          theme: navigationDrawerDestinationTheme,
        });

      return (
        <ListItem
          {...getStyles('root')}
          classNames={mergeClassNames(classNames, {
            item: getStyles('item').className,
          })}
          variant={false}
          ref={forwardedRef}
          selected={active}
          trailingSupportingText={badgeLabel}
          {...other}
        />
      );
    },
  );

NavigationDrawerDestination.theme = navigationDrawerDestinationTheme;
NavigationDrawerDestination.displayName = `@sixui/${COMPONENT_NAME}`;
