import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { asArray } from '@olivierpascal/helpers';
import { useMergeRefs } from '@floating-ui/react';

import type { ITabProps } from './Tab.types';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { Badge } from '../Badge';
import { useVisualState } from '../VisualState';
import { Elevation } from '../Elevation';
import { FocusRing } from '../FocusRing';
import { StateLayer } from '../StateLayer';
import { Anchored } from '../Anchored';
import { TabContext } from '../Tabs';
import { tabVariantStyles } from './variants';
import {
  tabElevationStyles,
  tabFocusRingStyles,
  tabStateLayerStyles,
  tabStyles,
} from './Tab.styles';
import { tabTheme } from './Tab.stylex';
import { Base } from '../Base';
import { useStyles } from '~/hooks/useStyles';

// https://github.com/material-components/material-web/blob/main/tabs/internal/tab.ts

export const Tab = createPolymorphicComponent<'div', ITabProps>(
  forwardRef<HTMLButtonElement, ITabProps>(function Tab(props, forwardedRef) {
    const {
      component,
      styles,
      sx,
      innerStyles,
      visualState: visualStateProp,
      variant: variantProp,
      icon,
      activeIcon,
      active: activeProp,
      onClick,
      href,
      label,
      anchor,
      disabled: disabledProp,
      badge,
      ...other
    } = props as IWithAsProp<ITabProps>;

    const tabContext = useContext(TabContext);
    const variant = variantProp ?? tabContext?.variant ?? 'primary';
    const disabled = disabledProp ?? tabContext?.disabled;

    const actionRef = useRef<HTMLButtonElement>(null);
    const { visualState, setRef: visualStateRef } = useVisualState(
      visualStateProp,
      { disabled },
    );
    const handleRef = useMergeRefs([forwardedRef, visualStateRef, actionRef]);

    const variantStyles = variant ? tabVariantStyles[variant] : undefined;
    const { combineStyles, getStyles, globalStyles, settings } = useStyles({
      name: 'Tab',
      styles: [tabStyles, variantStyles, styles],
      visualState,
    });

    const indicatorRef = useRef<HTMLDivElement>(null);

    const fullWidthIndicator = variant === 'secondary';
    const stacked = variant === 'primary';
    const hasLabel = !!label;
    const active = !disabled
      ? tabContext
        ? tabContext.anchor !== undefined && tabContext.anchor === anchor
        : activeProp
      : false;
    const hasIcon = active ? !!activeIcon || !!icon : !!icon;
    const id = tabContext && anchor ? `${tabContext.id}-${anchor}` : undefined;

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
      (event) => {
        tabContext?.onChange(anchor);

        Promise.resolve(onClick?.(event)).catch((error: Error) => {
          throw error;
        });
      },
      [onClick, tabContext, anchor],
    );

    const indicator = useMemo(
      () => (
        <div
          {...getStyles('indicator', active && 'indicator$active')}
          ref={indicatorRef}
        />
      ),
      [getStyles, active],
    );

    useEffect(() => {
      const activeTab = actionRef.current;
      const indicator = indicatorRef.current;
      if (tabContext && active && activeTab && indicator) {
        tabContext.onTabActivated(activeTab, indicator);
      }
    }, [active, anchor, tabContext]);

    const renderIcon = useCallback(
      (): React.ReactNode | null =>
        active && activeIcon ? (
          <div
            {...getStyles('icon', 'icon$active', disabled && 'icon$disabled')}
            aria-hidden
          >
            {activeIcon}
          </div>
        ) : icon ? (
          <div
            {...getStyles(
              'icon',
              active && 'icon$active',
              disabled && 'icon$disabled',
            )}
            aria-hidden
          >
            {icon}
          </div>
        ) : null,
      [active, icon, activeIcon, getStyles, disabled],
    );

    const rootElement =
      component ?? (href ? (settings?.linkAs ?? 'a') : 'button');

    return (
      <Base
        component={rootElement}
        role='tab'
        aria-controls={id}
        aria-selected={active}
        onClick={handleClick}
        href={href}
        {...other}
        visualState={visualState}
        sx={[
          tabTheme,
          globalStyles,
          combineStyles(
            'host',
            active && 'host$active',
            disabled && 'host$disabled',
          ),
          sx,
        ]}
        ref={handleRef}
      >
        <Elevation
          styles={[tabElevationStyles, ...asArray(innerStyles?.elevation)]}
          disabled={disabled}
        />
        <div {...getStyles('background', disabled && 'background$disabled')} />
        <StateLayer
          styles={[tabStateLayerStyles, ...asArray(innerStyles?.stateLayer)]}
          for={actionRef}
          disabled={disabled}
          visualState={visualState}
        />
        <FocusRing
          styles={[tabFocusRingStyles, ...asArray(innerStyles?.focusRing)]}
          for={actionRef}
          visualState={visualState}
        />
        <div
          {...getStyles(
            'content',
            stacked && 'content$stacked',
            stacked &&
              hasIcon &&
              hasLabel &&
              'content$stacked$hasIcon$hasLabel',
          )}
          role='presentation'
        >
          {hasIcon ? (
            badge && (variant === 'primary' || !hasLabel) ? (
              <Anchored
                content={badge && !disabled ? <Badge {...badge} /> : undefined}
              >
                {renderIcon()}
              </Anchored>
            ) : (
              renderIcon()
            )
          ) : null}

          {label ? (
            <div {...getStyles('labelContainer')}>
              <div
                {...getStyles(
                  'label',
                  active && 'label$active',
                  disabled && 'label$disabled',
                )}
              >
                {label}
              </div>

              {badge && !disabled && (!hasIcon || variant === 'secondary') ? (
                <Badge {...badge} />
              ) : null}
            </div>
          ) : null}

          {fullWidthIndicator ? null : indicator}
        </div>
        {fullWidthIndicator ? indicator : null}
      </Base>
    );
  }),
);
