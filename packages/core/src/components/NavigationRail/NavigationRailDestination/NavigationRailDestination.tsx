import { useState } from 'react';

import type { INavigationRailDestinationThemeFactory } from './NavigationRailDestination.css';
import type { INavigationRailDestinationFactory } from './NavigationRailDestination.types';
import { Anchored } from '~/components/Anchored';
import { ButtonBase } from '~/components/ButtonBase';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { executeLazyPromise } from '~/utils/executeLazyPromise';
import { COMPONENT_NAME } from './NavigationRailDestination.constants';
import { navigationRailDestinationTheme } from './NavigationRailDestination.css';

export const NavigationRailDestination =
  polymorphicComponentFactory<INavigationRailDestinationFactory>(
    (props, forwardedRef) => {
      const {
        classNames,
        className,
        styles,
        style,
        variant,
        label,
        active,
        icon,
        activeIcon,
        disabled,
        readOnly: readOnlyProp,
        loading: loadingProp,
        onClick,
        badge,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

      const [handlingClick, setHandlingClick] = useState(false);

      const loading = loadingProp || handlingClick;
      const readOnly = readOnlyProp || loading;
      const disabledOrReadOnly = disabled || readOnly;

      const { getStyles } =
        useComponentTheme<INavigationRailDestinationThemeFactory>({
          componentName: COMPONENT_NAME,
          classNames,
          className,
          styles,
          style,
          variant,
          theme: navigationRailDestinationTheme,
          modifiers: {
            'icon-only': !label,
            active,
            disabled: disabledOrReadOnly,
          },
        });

      const handleClick: React.MouseEventHandler = (event) => {
        if (handlingClick || !onClick) {
          return;
        }

        void executeLazyPromise(
          () => onClick(event) as Promise<void>,
          setHandlingClick,
        );
      };

      const renderIcon = (): React.ReactNode =>
        active ? (activeIcon ?? icon) : icon;

      return (
        <ButtonBase
          {...getStyles('root')}
          classNames={mergeClassNames(classNames, {
            stateLayer: getStyles('stateLayer').className,
          })}
          ref={forwardedRef}
          variant={false}
          disabled={disabled}
          readOnly={readOnly}
          aria-selected={active}
          onClick={handleClick}
          {...other}
        >
          {({ renderFocusRing, renderStateLayer, renderTouchTarget }) => (
            <>
              {renderFocusRing()}

              <div {...getStyles('activeIndicator')}>
                {renderStateLayer()}
                <div {...getStyles('icon')}>
                  {loading ? (
                    <IndeterminateCircularProgressIndicator />
                  ) : (
                    <>
                      {!disabled && badge ? (
                        <Anchored content={badge}>{renderIcon()}</Anchored>
                      ) : (
                        renderIcon()
                      )}
                    </>
                  )}
                </div>
              </div>

              {label && <div {...getStyles('label')}>{label}</div>}

              {renderTouchTarget()}
            </>
          )}
        </ButtonBase>
      );
    },
  );

NavigationRailDestination.displayName = `@sixui/core/${COMPONENT_NAME}`;
NavigationRailDestination.theme = navigationRailDestinationTheme;
