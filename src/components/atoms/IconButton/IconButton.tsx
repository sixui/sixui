import * as React from 'react';
import { accumulate, asArray } from '@olivierpascal/helpers';

import type {
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type { IContainer } from '@/helpers/Container';
import type {
  IIconButtonStyleKey,
  IIconButtonStyleVarKey,
  IIconButtonVariant,
} from './IconButton.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { useVisualState } from '@/hooks/useVisualState';
import {
  FocusRing,
  type IFocusRingStyleKey,
} from '@/components/utils/FocusRing';
import { Ripple, type IRippleStyleKey } from '@/components/utils/Ripple';
import { IThemeComponents } from '@/helpers/ThemeContext';
import {
  IndeterminateCircularProgressIndicator,
  type ICircularProgressIndicatorStyleKey,
} from '@/components/atoms/CircularProgressIndicator';

// https://github.com/material-components/material-web/blob/main/iconbutton/internal/icon-button.ts

export type IIconButtonProps = IContainer<
  IIconButtonStyleKey,
  IIconButtonStyleVarKey
> &
  Pick<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'disabled' | 'aria-label' | 'aria-haspopup' | 'aria-expanded'
  > &
  Pick<React.LinkHTMLAttributes<HTMLLinkElement>, 'href'> & {
    forwardRef?: React.RefObject<HTMLButtonElement | HTMLLinkElement>;
    onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
    variant?: IIconButtonVariant;
    toggle?: boolean;
    selected?: boolean;
    loading?: boolean;
    icon: React.ReactNode;
    selectedIcon?: React.ReactNode;
    component?: React.ElementType;
    'aria-label-selected'?: React.AriaAttributes['aria-label'];
    rippleStyles?: IZeroOrMore<ICompiledStyles<IRippleStyleKey>>;
    focusRingStyles?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
    circularProgressIndicatorStyles?: ICompiledStyles<ICircularProgressIndicatorStyleKey>;
  };

type IIconButtonVariantMap = {
  [key in IIconButtonVariant]: keyof Pick<
    IThemeComponents,
    | 'StandardIconButton'
    | 'FilledIconButton'
    | 'FilledTonalIconButton'
    | 'OutlinedIconButton'
  >;
};

const variantMap: IIconButtonVariantMap = {
  standard: 'StandardIconButton',
  filled: 'FilledIconButton',
  filledTonal: 'FilledTonalIconButton',
  outlined: 'OutlinedIconButton',
};

export const IconButton: React.FC<IIconButtonProps> = ({
  forwardRef,
  onClick,
  variant = 'standard',
  toggle,
  selected,
  href,
  ...props
}) => {
  const theme = useComponentTheme('IconButton');
  const variantTheme = useComponentTheme(variantMap[variant]);

  const actionElInternalRef = React.useRef<HTMLButtonElement | HTMLLinkElement>(
    null,
  );
  const actionRef = forwardRef ?? actionElInternalRef;
  const [handlingClick, setHandlingClick] = React.useState(false);
  const visualState = accumulate(useVisualState(actionRef), props.visualState);

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IIconButtonStyleKey, IIconButtonStyleVarKey>(
        stylesCombinatorFactory(
          theme.styles,
          variantTheme.styles,
          props.styles,
        ),
        visualState,
      ),
    [theme.styles, variantTheme.styles, props.styles, visualState],
  );

  const handleClick: React.MouseEventHandler<HTMLElement> | undefined = onClick
    ? (event) => {
        if (handlingClick) {
          return;
        }

        setHandlingClick(true);

        Promise.resolve(onClick(event))
          .finally(() => setHandlingClick(false))
          .catch((error: Error) => {
            throw error;
          });
      }
    : undefined;

  const loading = props.loading || handlingClick;
  const disabled = props.disabled || loading;
  const hasOverlay = loading;
  const hasOutline =
    theme.styles?.outline ||
    variantTheme.styles?.outline ||
    asArray(props.styles).some((styles) => !!styles?.outline);

  const Component: React.ElementType = props.component
    ? props.component
    : href
      ? 'a'
      : 'button';
  const icon =
    toggle && selected ? props.selectedIcon ?? props.icon : props.icon;

  return (
    <div
      {...styleProps(
        [
          'host',
          disabled ? 'host$disabled' : toggle ? 'host$toggle' : null,
          !disabled && selected
            ? toggle
              ? 'host$toggle$selected'
              : 'host$selected'
            : null,
          props.sx,
        ],
        [theme.vars, variantTheme.vars, props.theme],
      )}
    >
      {hasOutline ? (
        <div {...styleProps(['outline', disabled && 'outline$disabled'])} />
      ) : null}
      <div
        {...styleProps([
          'background',
          disabled
            ? 'background$disabled'
            : toggle
              ? selected
                ? 'background$selected'
                : 'background$unselected'
              : null,
        ])}
      />
      <FocusRing
        styles={[
          theme.focusRingStyles,
          variantTheme.focusRingStyles,
          ...asArray(props.focusRingStyles),
        ]}
        for={actionRef}
        visualState={visualState}
      />
      <Ripple
        styles={[
          theme.rippleStyles,
          variantTheme.rippleStyles,
          ...asArray(props.rippleStyles),
        ]}
        for={actionRef}
        disabled={disabled}
        visualState={visualState}
      />

      <Component
        {...styleProps(['button'])}
        ref={actionRef}
        onClick={handleClick}
        readOnly={disabled}
        tabIndex={disabled ? -1 : 0}
        aria-label={
          toggle && selected
            ? props['aria-label-selected'] ?? props['aria-label']
            : props['aria-label']
        }
        aria-haspopup={props['aria-haspopup']}
        aria-expanded={props['aria-expanded']}
      >
        <span {...styleProps(['touchTarget'])} />

        <div
          {...styleProps([
            'icon',
            disabled
              ? 'icon$disabled'
              : toggle
                ? selected
                  ? 'icon$toggle$selected'
                  : 'icon$toggle'
                : null,
            hasOverlay ? 'invisible' : null,
          ])}
        >
          {icon}
        </div>

        {hasOverlay ? (
          <div {...styleProps(['overlay'])}>
            <div {...styleProps([disabled && 'icon$disabled'])}>
              <IndeterminateCircularProgressIndicator
                styles={[
                  theme.circularProgressIndicatorStyles,
                  variantTheme.circularProgressIndicatorStyles,
                  ...asArray(props.circularProgressIndicatorStyles),
                ]}
              />
            </div>
          </div>
        ) : null}
      </Component>
    </div>
  );
};
