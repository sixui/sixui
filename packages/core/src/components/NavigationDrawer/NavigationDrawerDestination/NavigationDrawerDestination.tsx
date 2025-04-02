import type { INavigationDrawerDestinationThemeFactory } from './NavigationDrawerDestination.css';
import type { INavigationDrawerDestinationFactory } from './NavigationDrawerDestination.types';
import { ListItemButton } from '~/components/List/ListItemButton';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { COMPONENT_NAME } from './NavigationDrawerDestination.constants';
import { navigationDrawerDestinationTheme } from './NavigationDrawerDestination.css';

/**
 * @see https://m3.material.io/components/navigation-drawer/overview
 */
export const NavigationDrawerDestination =
  polymorphicComponentFactory<INavigationDrawerDestinationFactory>(
    (props, forwardedRef) => {
      const {
        classNames,
        className,
        styles,
        style,
        variant,
        leadingIcon: leadingIconProp,
        trailingIcon: trailingIconProp,
        active,
        activeLeadingIcon,
        activeTrailingIcon,
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

      const leadingIcon = active
        ? (activeLeadingIcon ?? leadingIconProp)
        : leadingIconProp;
      const trailingIcon = active
        ? (activeTrailingIcon ?? trailingIconProp)
        : trailingIconProp;

      return (
        <ListItemButton
          {...getStyles('root')}
          classNames={mergeClassNames(classNames, {
            listItem: getStyles('listItem').className,
          })}
          variant={false}
          ref={forwardedRef}
          selected={active}
          trailingSupportingText={badgeLabel}
          leadingIcon={leadingIcon}
          trailingIcon={trailingIcon}
          {...other}
        />
      );
    },
  );

NavigationDrawerDestination.displayName = `@sixui/core/${COMPONENT_NAME}`;
NavigationDrawerDestination.theme = navigationDrawerDestinationTheme;
