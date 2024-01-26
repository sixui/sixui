import React from 'react';
import { accumulate } from '@olivierpascal/helpers';

import type { IAny, IMaybeAsync, IIcon } from '@/helpers/types';
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
import { FocusRing } from '@/components/utils/FocusRing';
import { Ripple } from '@/components/utils/Ripple';
import { IThemeComponents } from '@/helpers/ThemeContext';
import { IndeterminateCircularProgressIndicator } from '@/components/atoms/CircularProgressIndicator';

export interface IIconButtonProps
  extends IContainer<IIconButtonStyleKey, IIconButtonStyleVarKey>,
    Pick<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      'disabled' | 'aria-label' | 'aria-haspopup' | 'aria-expanded'
    >,
    Pick<React.LinkHTMLAttributes<HTMLLinkElement>, 'href'> {
  forwardRef?: React.RefObject<HTMLButtonElement | HTMLLinkElement>;
  onClick?: (event: React.MouseEvent<HTMLElement>) => IMaybeAsync<IAny>;
  variant?: IIconButtonVariant;
  toggle?: boolean;
  selected?: boolean;
  loading?: boolean;
  icon: IIcon;
  selectedIcon?: IIcon;
  component?: React.ElementType;
  'aria-label-selected'?: React.AriaAttributes['aria-label'];
}

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

// https://github.com/material-components/material-web/blob/main/iconbutton/internal/icon-button.ts
export const IconButton: React.FC<IIconButtonProps> = ({
  forwardRef,
  onClick,
  variant = 'standard',
  toggle,
  selected,
  href,
  ...props
}) => {
  const {
    theme,
    styles,
    rippleStyles,
    focusRingStyles,
    circularProgressIndicatorStyles,
  } = useComponentTheme('IconButton');
  const { theme: variantTheme, styles: variantStyles } = useComponentTheme(
    variantMap[variant],
  );

  const actionElInternalRef = React.useRef<HTMLButtonElement | HTMLLinkElement>(
    null,
  );
  const actionElRef = forwardRef ?? actionElInternalRef;
  const [handlingClick, setHandlingClick] = React.useState(false);
  const visualState = accumulate(
    useVisualState(actionElRef),
    props.visualState,
  );

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IIconButtonStyleKey, IIconButtonStyleVarKey>(
        stylesCombinatorFactory(styles, variantStyles, props.styles),
        visualState,
      ),
    [styles, variantStyles, props.styles, visualState],
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

  const Component: React.ElementType = href ? 'a' : props.component ?? 'button';
  const Icon =
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
        ],
        [theme, variantTheme, props.theme],
      )}
    >
      {variantStyles?.outline ? (
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
        styles={focusRingStyles}
        for={actionElRef}
        visualState={visualState}
      />
      <Ripple
        styles={rippleStyles}
        for={actionElRef}
        disabled={disabled}
        visualState={visualState}
      />

      <Component
        {...styleProps(['button'])}
        ref={actionElRef}
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

        <Icon
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
          aria-hidden='true'
        />

        {hasOverlay ? (
          <div {...styleProps(['overlay'])}>
            <div {...styleProps([disabled && 'icon$disabled'])}>
              <IndeterminateCircularProgressIndicator
                styles={circularProgressIndicatorStyles}
              />
            </div>
          </div>
        ) : null}
      </Component>
    </div>
  );
};
