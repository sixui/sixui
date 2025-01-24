import { useState } from 'react';

import type { INavigationRailDestinationThemeFactory } from './NavigationRailDestination.css';
import type { INavigationRailDestinationFactory } from './NavigationRailDestination.types';
import { Anchored } from '~/components/Anchored';
import { ButtonBase } from '~/components/ButtonBase';
import { IndeterminateCircularProgressIndicator } from '~/components/IndeterminateCircularProgressIndicator';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { navigationRailDestinationTheme } from './NavigationRailDestination.css';

const COMPONENT_NAME = 'NavigationRailDestination';

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
            focusRing: getStyles('focusRing').className,
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

NavigationRailDestination.theme = navigationRailDestinationTheme;
NavigationRailDestination.displayName = `@sixui/${COMPONENT_NAME}`;
