import { forwardRef, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';
import { asArray } from '@olivierpascal/helpers';

import type { INavigationRailDestinationProps } from './NavigationRailDestination.types';
import { useStyles } from '~/hooks/useStyles';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/utils/component/createPolymorphicComponent';
import { Base } from '../Base';
import { useVisualState } from '../VisualState';
import { StateLayer } from '../StateLayer';
import { FocusRing } from '../FocusRing';
import {
  navigationRailDestinationFocusRingStyles,
  navigationRailDestinationStateLayerStyles,
  navigationRailDestinationStyles,
} from './NavigationRailDestination.styles';
import { navigationRailDestinationTheme } from './NavigationRailDestination.stylex';
import { Anchored } from '../Anchored';

export const NavigationRailDestination = createPolymorphicComponent<
  'button',
  INavigationRailDestinationProps
>(
  forwardRef<HTMLButtonElement, INavigationRailDestinationProps>(
    function NavigationRailDestination(props, forwardedRef) {
      const {
        as,
        styles,
        sx,
        innerStyles,
        visualState: visualStateProp,
        children,
        href,
        readOnly,
        icon,
        activeIcon,
        label,
        active,
        badge,
        ...other
      } = props as IWithAsProp<INavigationRailDestinationProps>;

      const visuallyDisabled = other.disabled || readOnly;
      const { visualState, setRef: setVisualStateRef } = useVisualState(
        visualStateProp,
        { disabled: visuallyDisabled },
      );

      const visualStateRef = useRef<HTMLElement>(null);
      const handleRef = useMergeRefs([
        forwardedRef,
        setVisualStateRef,
        visualStateRef,
      ]);

      const { combineStyles, getStyles, globalStyles, settings } = useStyles({
        componentName: 'NavigationRailDestination',
        styles: [navigationRailDestinationStyles, styles],
        visualState,
      });

      const rootElement = as ?? (href ? (settings?.linkAs ?? 'a') : 'button');

      return (
        <Base
          as={rootElement}
          href={href}
          role='button'
          tabIndex={visuallyDisabled ? -1 : 0}
          {...other}
          visualState={visualState}
          sx={[
            globalStyles,
            navigationRailDestinationTheme,
            combineStyles(
              'host',
              active ? 'host$active' : 'host$inactive',
              !label && 'host$noLabel',
            ),
            sx,
          ]}
          ref={handleRef}
        >
          {visuallyDisabled ? null : (
            <FocusRing
              styles={[
                navigationRailDestinationFocusRingStyles,
                ...asArray(innerStyles?.focusRing),
              ]}
              for={visualStateRef}
              visualState={visualState}
            />
          )}

          <div
            {...getStyles('iconContainer', !label && 'iconContainer$noLabel')}
          >
            {active ? (
              <div
                {...getStyles(
                  'activeIndicator',
                  !label && 'activeIndicator$noLabel',
                )}
              />
            ) : null}
            <StateLayer
              styles={[
                navigationRailDestinationStateLayerStyles,
                ...asArray(innerStyles?.stateLayer),
              ]}
              for={visualStateRef}
              disabled={visuallyDisabled}
              interactionState={visualState}
            />
            <Anchored content={badge}>
              <div
                {...getStyles('icon', active ? `icon$active` : `icon$inactive`)}
              >
                {active ? activeIcon : icon}
              </div>
            </Anchored>
          </div>

          {label ? (
            <div
              {...getStyles(
                'labelText',
                active ? `labelText$active` : `labelText$inactive`,
              )}
            >
              {label}
            </div>
          ) : null}

          {children}
        </Base>
      );
    },
  ),
);
