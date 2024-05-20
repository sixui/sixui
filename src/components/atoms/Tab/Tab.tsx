import {
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { IThemeComponents } from '@/components/utils/Theme';
import type {
  ITabStyleKey,
  ITabStyleVarKey,
  ITabVariant,
} from './Tab.styledefs';
import { Badge, type IBadgeProps } from '../Badge';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { type IVisualState, useVisualState } from '@/hooks/useVisualState';
import { Elevation, IElevationStyleKey } from '@/components/utils/Elevation';
import { FocusRing, IFocusRingStyleKey } from '@/components/utils/FocusRing';
import {
  StateLayer,
  type IStateLayerStyleKey,
} from '@/components/utils/StateLayer';
import { Anchored } from '@/components/utils/Anchored';
import { useForkRef } from '@/hooks/useForkRef';
import { TabContext } from '@/components/atoms/Tabs';

// https://github.com/material-components/material-web/blob/main/tabs/internal/tab.ts

const DEFAULT_TAG = 'button';

export type ITabOwnProps = IContainerProps<ITabStyleKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    elevation?: IZeroOrMore<ICompiledStyles<IElevationStyleKey>>;
  };
  visualState?: IVisualState;
  variant?: ITabVariant | false;

  /**
   * Whether or not the tab is selected.
   **/
  active?: boolean;

  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  label?: string;
  href?: string;
  anchor?: string;
  disabled?: boolean;
  badge?: IBadgeProps;
};

export type ITabProps<TRoot extends React.ElementType = typeof DEFAULT_TAG> =
  IPolymorphicComponentPropsWithRef<TRoot, ITabOwnProps>;

type ITabVariantMap = {
  [key in ITabVariant]: keyof Pick<
    IThemeComponents,
    'PrimaryTab' | 'SecondaryTab'
  >;
};

const variantMap: ITabVariantMap = {
  primary: 'PrimaryTab',
  secondary: 'SecondaryTab',
};

type ITab = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: ITabProps<TRoot>,
) => React.ReactNode;

export const Tab: ITab = forwardRef(function Tab<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: ITabProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
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
    disabled,
    badge,
    ...other
  } = props as IWithAsProp<ITabOwnProps>;

  const context = useContext(TabContext);
  const variant = variantProp ?? context?.variant ?? 'primary';

  const actionRef = useRef<HTMLButtonElement>(null);
  const { visualState, ref: visualStateRef } = useVisualState(visualStateProp, {
    disabled,
  });
  const handleRef = useForkRef(ref, visualStateRef, actionRef);

  const { theme, variantTheme, settings } = useComponentTheme(
    'Tab',
    variant ? variantMap[variant] : undefined,
  );
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme?.styles, styles),
    [theme.styles, variantTheme?.styles, styles],
  );
  const sxf = useMemo(
    () =>
      stylePropsFactory<ITabStyleKey, ITabStyleVarKey>(
        stylesCombinator,
        visualState,
      ),
    [stylesCombinator, visualState],
  );

  const indicatorRef = useRef<HTMLDivElement>(null);

  const fullWidthIndicator = variant === 'secondary';
  const stacked = variant === 'primary';
  const hasLabel = !!label;
  const active = !disabled
    ? context
      ? context.anchor !== undefined && context.anchor === anchor
      : activeProp
    : false;
  const hasIcon = active ? !!activeIcon ?? !!icon : !!icon;
  const id = context && anchor ? `${context.id}-${anchor}` : undefined;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      context?.onChange(anchor);

      Promise.resolve(onClick?.(event)).catch((error: Error) => {
        throw error;
      });
    },
    [onClick, context, anchor],
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
    if (context && active && activeTab && indicator) {
      context.onTabActivated(activeTab, indicator);
    }
  }, [active, anchor, context]);

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

  const Component = as ?? (href ? settings.linkAs : DEFAULT_TAG);

  return (
    <Component
      {...sxf(
        'host',
        active && 'host$active',
        disabled && 'host$disabled',
        theme.vars,
        variantTheme?.vars,
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
        styles={[
          theme.elevationStyles,
          variantTheme?.elevationStyles,
          ...asArray(innerStyles?.elevation),
        ]}
        disabled={disabled}
      />
      <div {...sxf('background', disabled && 'background$disabled')} />
      <StateLayer
        styles={[
          theme.stateLayerStyles,
          variantTheme?.stateLayerStyles,
          ...asArray(innerStyles?.stateLayer),
        ]}
        for={actionRef}
        disabled={disabled}
        visualState={visualState}
      />
      <FocusRing
        styles={[
          theme.focusRingStyles,
          variantTheme?.focusRingStyles,
          ...asArray(innerStyles?.focusRing),
        ]}
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
