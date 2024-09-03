import { forwardRef } from 'react';

import type { IFabProps } from './Fab.types';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { useStyles } from '~/hooks/useStyles';
import { Button } from '../Button';
import { fabStyles } from './Fab.styles';
import { fabVariantStyles } from './variants';
import { fabTheme } from './Fab.stylex';

// https://github.com/material-components/material-web/blob/main/fab/internal/shared.ts
// https://github.com/material-components/material-web/blob/main/fab/internal/fab.ts

export const Fab = createPolymorphicComponent<'button', IFabProps>(
  forwardRef<HTMLButtonElement, IFabProps>(function Fab(props, forwardedRef) {
    const {
      styles,
      sx,
      innerStyles,
      size = 'md',
      variant = 'surface',
      label,
      lowered,
      children,
      ...other
    } = props;

    const variantStyles = variant ? fabVariantStyles[variant] : undefined;
    const { combineStyles, globalStyles } = useStyles({
      componentName: 'Fab',
      styles: [fabStyles, variantStyles, styles],
    });

    const extended = !!label;

    return (
      <Button
        variant={false}
        styles={innerStyles?.button}
        icon={children}
        {...other}
        sx={[
          fabTheme,
          globalStyles,
          combineStyles(
            'host',
            extended ? 'host$md' : `host$${size}`,
            extended && 'host$extended',
            lowered && 'host$lowered',
          ),
          sx,
        ]}
        ref={forwardedRef}
      >
        {label}
      </Button>
    );
  }),
);
