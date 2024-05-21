import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type {
  IIconButtonStyleKey,
  IIconButtonVariant,
} from './IconButton.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { IThemeComponents } from '@/components/utils/Theme';
import { type IButtonStyleKey, type IButtonOwnProps, Button } from '../Button';

// https://github.com/material-components/material-web/blob/main/iconbutton/internal/icon-button.ts

const DEFAULT_TAG = 'button';

export type IIconButtonOwnProps = Omit<
  IButtonOwnProps,
  'variant' | 'icon' | 'trailingIcon'
> &
  IContainerProps<IIconButtonStyleKey> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    innerStyles?: IButtonOwnProps['innerStyles'] & {
      button?: IZeroOrMore<ICompiledStyles<IButtonStyleKey>>;
    };
    variant?: IIconButtonVariant | false;
    toggle?: boolean;
    selected?: boolean;
    icon: React.ReactNode;
    selectedIcon?: React.ReactNode;
    'aria-label-selected'?: React.AriaAttributes['aria-label'];
  };

export type IIconButtonProps<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IIconButtonOwnProps>;

type IIconButtonVariantMap = {
  [key in IIconButtonVariant]: keyof Pick<
    IThemeComponents,
    | 'StandardIconButton'
    | 'FilledIconButton'
    | 'FilledTonalIconButton'
    | 'OutlinedIconButton'
    | 'DangerIconButton'
  >;
};

const variantMap: IIconButtonVariantMap = {
  standard: 'StandardIconButton',
  filled: 'FilledIconButton',
  filledTonal: 'FilledTonalIconButton',
  outlined: 'OutlinedIconButton',
  danger: 'DangerIconButton',
};

type IIconButton = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IIconButtonProps<TRoot>,
) => React.ReactNode;

export const IconButton: IIconButton = forwardRef(function IconButton<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IIconButtonProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
  const {
    styles,
    sx,
    as = DEFAULT_TAG,
    innerStyles,
    variant = 'standard',
    toggle,
    selected,
    icon,
    selectedIcon,
    'aria-label': ariaLabel,
    'aria-label-selected': ariaLabelSelected,
    ...other
  } = props as IWithAsProp<IIconButtonOwnProps>;

  const { theme, variantTheme } = useComponentTheme(
    'IconButton',
    variant ? variantMap[variant] : undefined,
  );
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme?.styles, styles),
    [theme.styles, variantTheme?.styles, styles],
  );

  return (
    <Button
      ref={ref}
      as={as}
      styles={asArray(innerStyles?.button)}
      sx={[
        stylesCombinator(
          'host',
          toggle ? (selected ? 'host$toggle$selected' : 'host$toggle') : null,
        ),
        theme.vars,
        variantTheme?.vars,
        sx,
      ]}
      icon={selected ? selectedIcon ?? icon : icon}
      aria-label={
        toggle && selected ? ariaLabelSelected ?? ariaLabel : ariaLabel
      }
      {...other}
    />
  );
});
