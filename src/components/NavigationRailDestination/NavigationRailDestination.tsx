import type { INavigationRailDestinationThemeFactory } from './NavigationRailDestination.css';
import type { INavigationRailDestinationFactory } from './NavigationRailDestination.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Button } from '../Button';
import { navigationRailDestinationTheme } from './NavigationRailDestination.css';

const COMPONENT_NAME = 'NavigationRailDestination';

export const NavigationRailDestination =
  polymorphicComponentFactory<INavigationRailDestinationFactory>(
    (props, forwardedRef) => {
      const { classNames, className, styles, style, variant, label, ...other } =
        useProps({ componentName: COMPONENT_NAME, props });

      const { getStyles } =
        useComponentTheme<INavigationRailDestinationThemeFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          variant,
          theme: navigationRailDestinationTheme,
        });

      return (
        <Button
          {...getStyles('root')}
          // classNames={mergeClassNames(classNames, {
          //   stateLayer: getStyles('stateLayer').className,
          //   focusRing: getStyles('focusRing').className,
          // })}
          ref={forwardedRef}
          variant={false}
          // leadingIcon={renderIcon()}
          // aria-selected={active}
          {...other}
        >
          {({
            renderFocusRing,
            renderStateLayer,
            renderContent,
            renderTouchTarget,
          }) => (
            <>
              {renderFocusRing()}
              {renderStateLayer()}
              {renderContent(label)}
              {renderTouchTarget()}
            </>
          )}
        </Button>
      );
    },
  );

NavigationRailDestination.theme = navigationRailDestinationTheme;
NavigationRailDestination.displayName = `@sixui/${COMPONENT_NAME}`;
