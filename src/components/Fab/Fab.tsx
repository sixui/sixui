import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IFabProps } from './Fab.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { Button } from '~/components/Button';
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

    const componentTheme = useComponentTheme('Fab');
    const variantStyles = variant ? fabVariantStyles[variant] : undefined;

    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(fabStyles, variantStyles, styles),
      [variantStyles, styles],
    );

    const extended = !!label;

    return (
      <Button
        variant={false}
        styles={asArray(innerStyles?.button)}
        icon={children}
        {...other}
        sx={[
          fabTheme,
          componentTheme.overridenStyles,
          stylesCombinator(
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
