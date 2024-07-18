import { forwardRef, useMemo } from 'react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type {
  ICON_BUTTON_DEFAULT_TAG,
  IIconButtonOwnProps,
  IIconButtonProps,
} from './IconButton.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Button } from '@/components/Button';
import { iconButtonStyles } from './IconButton.styles';
import { iconButtonVariantStyles } from './variants';
import { iconButtonTheme } from './IconButton.stylex';

// https://github.com/material-components/material-web/blob/main/iconbutton/internal/icon-button.ts

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

  const componentTheme = useComponentTheme('IconButton');
  const variantStyles = variant ? iconButtonVariantStyles[variant] : undefined;

  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(iconButtonStyles, variantStyles, styles),
    [variantStyles, styles],
  );

  return (
    <Button
      as={as}
      sx={[
        iconButtonTheme,
        componentTheme.overridenStyles,
        stylesCombinator(
          'host',
          toggle ? (selected ? 'host$toggle$selected' : 'host$toggle') : null,
        ),
        sx,
      ]}
      icon={selected ? (selectedIcon ?? icon) : icon}
      aria-label={
        toggle && selected ? (ariaLabelSelected ?? ariaLabel) : ariaLabel
      }
      {...other}
      ref={forwardedRef}
    />
  );
});
