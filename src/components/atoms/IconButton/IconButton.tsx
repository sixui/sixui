import { forwardRef, useMemo } from 'react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { IIconButtonVariant } from './IconButton.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { IThemeComponents } from '@/components/utils/Theme';
import { Button } from '@/components/atoms/Button';
import {
  ICON_BUTTON_DEFAULT_TAG,
  IIconButtonOwnProps,
  type IIconButtonProps,
} from './IconButtonProps';

// https://github.com/material-components/material-web/blob/main/iconbutton/internal/icon-button.ts

type IIconButtonVariantMap = {
  [key in IIconButtonVariant]: keyof Pick<
    IThemeComponents,
    | 'StandardIconButton'
    | 'FilledIconButton'
    | 'FilledTonalIconButton'
    | 'OutlinedIconButton'
    | 'DangerIconButton'
    | 'SnackbarIconButton'
  >;
};

const variantMap: IIconButtonVariantMap = {
  standard: 'StandardIconButton',
  filled: 'FilledIconButton',
  filledTonal: 'FilledTonalIconButton',
  outlined: 'OutlinedIconButton',
  danger: 'DangerIconButton',
  snackbar: 'SnackbarIconButton',
};

type IIconButton = <
  TRoot extends React.ElementType = typeof ICON_BUTTON_DEFAULT_TAG,
>(
  props: IIconButtonProps<TRoot>,
) => React.ReactNode;

export const IconButton: IIconButton = forwardRef(function IconButton<
  TRoot extends React.ElementType = typeof ICON_BUTTON_DEFAULT_TAG,
>(props: IIconButtonProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    styles,
    sx,
    as,
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
      ref={forwardedRef}
      as={as}
      styles={styles}
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
