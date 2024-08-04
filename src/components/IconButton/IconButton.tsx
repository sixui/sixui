import { forwardRef, useMemo } from 'react';

import type { IIconButtonProps } from './IconButton.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { Button } from '../Button';
import { iconButtonStyles } from './IconButton.styles';
import { iconButtonVariantStyles } from './variants';
import { iconButtonTheme } from './IconButton.stylex';

// https://github.com/material-components/material-web/blob/main/iconbutton/internal/icon-button.ts

export const IconButton = createPolymorphicComponent<
  'button',
  IIconButtonProps
>(
  forwardRef<HTMLButtonElement, IIconButtonProps>(
    function IconButton(props, forwardedRef) {
      const {
        styles,
        sx,
        variant = 'standard',
        toggle,
        selected,
        icon,
        selectedIcon,
        'aria-label': ariaLabel,
        'aria-label-selected': ariaLabelSelected,
        ...other
      } = props;

      const componentTheme = useComponentTheme('IconButton');
      const variantStyles = variant
        ? iconButtonVariantStyles[variant]
        : undefined;

      const stylesCombinator = useMemo(
        () => stylesCombinatorFactory(iconButtonStyles, variantStyles, styles),
        [variantStyles, styles],
      );

      return (
        <Button
          sx={[
            iconButtonTheme,
            componentTheme.overridenStyles,
            stylesCombinator(
              'host',
              toggle
                ? selected
                  ? 'host$toggle$selected'
                  : 'host$toggle'
                : null,
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
    },
  ),
);
