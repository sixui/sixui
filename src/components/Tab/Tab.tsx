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

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import { Badge } from '@/components/Badge';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/components/VisualState';
import { Elevation } from '@/components/Elevation';
import { FocusRing } from '@/components/FocusRing';
import { StateLayer } from '@/components/StateLayer';
import { Anchored } from '@/components/Anchored';
import { TabContext } from '@/components/Tabs';
import {
  TAB_DEFAULT_TAG,
  type ITabOwnProps,
  type ITabProps,
} from './Tab.types';
import { tabVariantStyles } from './variants';
import {
  tabElevationStyles,
  tabFocusRingStyles,
  tabStateLayerStyles,
  tabStyles,
} from './Tab.styles';
import { tabTheme } from './Tab.stylex';

// https://github.com/material-components/material-web/blob/main/tabs/internal/tab.ts

type ITab = <TRoot extends React.ElementType = typeof TAB_DEFAULT_TAG>(
  props: ITabProps<TRoot>,
) => React.ReactNode;

export const Tab: ITab = forwardRef(function Tab<
  TRoot extends React.ElementType = typeof TAB_DEFAULT_TAG,
>(props: ITabProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as,
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
  } = props as IWithAsProp<ITabOwnProps>;

  const tabContext = useContext(TabContext);
  const variant = variantProp ?? tabContext?.variant ?? 'primary';
  const disabled = disabledProp ?? tabContext?.disabled;

  const actionRef = useRef<HTMLButtonElement>(null);
  const { visualState, setRef: visualStateRef } = useVisualState(
    visualStateProp,
    { disabled },
  );
  const handleRef = useMergeRefs([forwardedRef, visualStateRef, actionRef]);

  const componentTheme = useComponentTheme('Tab');
  const variantStyles = variant ? tabVariantStyles[variant] : undefined;

  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(tabStyles, variantStyles, styles),
    [variantStyles, styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator, visualState),
    [stylesCombinator, visualState],
  );

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
        {...sxf('indicator', active && 'indicator$active')}
        ref={indicatorRef}
      />
    ),
    [sxf, active],
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
          {...sxf('icon', 'icon$active', disabled && 'icon$disabled')}
          aria-hidden
        >
          {activeIcon}
        </div>
      ) : icon ? (
        <div
          {...sxf('icon', active && 'icon$active', disabled && 'icon$disabled')}
          aria-hidden
        >
          {icon}
        </div>
      ) : null,
    [active, icon, activeIcon, sxf, disabled],
  );

  const Component =
    as ?? (href ? (componentTheme.settings?.linkAs ?? 'a') : TAB_DEFAULT_TAG);

  return (
    <Component
      {...sxf(
        tabTheme,
        componentTheme.overridenStyles,
        'host',
        active && 'host$active',
        disabled && 'host$disabled',
        sx,
      )}
      sx={sx}
      ref={handleRef}
      role='tab'
      aria-controls={id}
      aria-selected={active}
      onClick={handleClick}
      href={href}
      {...other}
    >
      <Elevation
        styles={[tabElevationStyles, ...asArray(innerStyles?.elevation)]}
        disabled={disabled}
      />
      <div {...sxf('background', disabled && 'background$disabled')} />
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
        {...sxf(
          'content',
          stacked && 'content$stacked',
          stacked && hasIcon && hasLabel && 'content$stacked$hasIcon$hasLabel',
        )}
        role='presentation'
      >
        {hasIcon ? (
          badge && (variant === 'primary' || !hasLabel) ? (
            <Anchored
              content={
                badge ? <Badge {...badge} disabled={disabled} /> : undefined
              }
            >
              {renderIcon()}
            </Anchored>
          ) : (
            renderIcon()
          )
        ) : null}

        {label ? (
          <div {...sxf('labelContainer')}>
            <div
              {...sxf(
                'label',
                active && 'label$active',
                disabled && 'label$disabled',
              )}
            >
              {label}
            </div>

            {!!badge && (!hasIcon || variant === 'secondary') ? (
              <Badge {...badge} disabled={disabled} />
            ) : null}
          </div>
        ) : null}

        {fullWidthIndicator ? null : indicator}
      </div>
      {fullWidthIndicator ? indicator : null}
    </Component>
  );
});
