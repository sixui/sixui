import React from 'react';
import { accumulate } from '@olivierpascal/helpers';

import type { IAny, IIcon, IMaybeAsync } from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type { IThemeComponents } from '@/helpers/ThemeContext';
import type {
  ITabStyleKey,
  ITabStyleVarKey,
  ITabVariant,
} from './Tab.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import { Elevation } from '@/components/utils/Elevation';
import { FocusRing } from '@/components/utils/FocusRing';
import { Ripple } from '@/components/utils/Ripple';

// https://github.com/material-components/material-web/blob/main/tabs/internal/tab.ts

export interface ITabProps extends IContainer<ITabStyleKey, ITabStyleVarKey> {
  variant?: ITabVariant;

  /**
   * Whether or not the tab is selected.
   **/
  active?: boolean;

  /**
   * Whether or not the icon renders inline with label or stacked vertically.
   */
  inlineIcon?: boolean;

  icon?: IIcon;
  fullWidthIndicator?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  children?: React.ReactNode;
  disabled?: boolean;
}

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

export const Tab: React.FC<ITabProps> = ({
  variant = 'primary',
  icon: Icon,
  fullWidthIndicator,
  inlineIcon,
  onClick,
  children,
  disabled,
  ...props
}) => {
  const { theme, styles, focusRingStyles, rippleStyles, elevationStyles } =
    useComponentTheme('Tab');
  const { theme: variantTheme, styles: variantStyles } = useComponentTheme(
    variantMap[variant],
  );

  const actionElRef = React.useRef<HTMLDivElement>(null);
  const visualState = accumulate(
    useVisualState(actionElRef),
    props.visualState,
  );

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<ITabStyleKey, ITabStyleVarKey>(
        stylesCombinatorFactory(styles, variantStyles, props.styles),
        visualState,
      ),
    [styles, variantStyles, props.styles, visualState],
  );

  const active = !disabled ? props.active : false;
  const stacked = !inlineIcon;
  const hasIcon = !!Icon;
  const hasLabel = !!children;

  const indicator = React.useMemo(
    () => <div {...styleProps(['indicator', active && 'indicator$active'])} />,
    [styleProps, active],
  );

  return (
    <div
      {...styleProps(
        ['host', active && 'host$active', disabled && 'host$disabled'],
        [theme, variantTheme, props.theme],
      )}
    >
      <div
        {...styleProps(['button'])}
        ref={actionElRef}
        role='presentation'
        onClick={onClick}
      >
        <div
          {...styleProps(['background', disabled && 'background$disabled'])}
        />
        <FocusRing
          styles={focusRingStyles}
          for={actionElRef}
          visualState={visualState}
          inward
        />
        <Elevation styles={elevationStyles} disabled={disabled} />
        <Ripple
          styles={rippleStyles}
          for={actionElRef}
          disabled={disabled}
          visualState={visualState}
        />
        <div
          {...styleProps([
            'content',
            stacked && 'content$stacked',
            stacked &&
              hasIcon &&
              hasLabel &&
              'content$stacked$hasIcon$hasLabel',
          ])}
          role='presentation'
        >
          {Icon ? (
            <Icon
              {...styleProps([
                'icon',
                active && 'icon$active',
                disabled && 'icon$disabled',
              ])}
              aria-hidden='true'
            />
          ) : null}
          <div {...styleProps(['label', disabled && 'label$disabled'])}>
            {children}
          </div>
          {fullWidthIndicator ? null : indicator}
        </div>
        {fullWidthIndicator ? indicator : null}
      </div>
    </div>
  );
};
