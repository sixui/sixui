import type { INavigationDrawerDestinationThemeFactory } from './NavigationDrawerDestination.css';
import type { INavigationDrawerDestinationFactory } from './NavigationDrawerDestination.types';
import { ListItem } from '~/components/List/ListItem';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
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
        <ListItem
          {...getStyles('root')}
          classNames={mergeClassNames(classNames, {
            item: getStyles('item').className,
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

NavigationDrawerDestination.theme = navigationDrawerDestinationTheme;
NavigationDrawerDestination.displayName = `@sixui/${COMPONENT_NAME}`;
