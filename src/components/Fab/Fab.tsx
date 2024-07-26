import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { Button } from '~/components/Button';
import {
  FAB_DEFAULT_TAG,
  type IFabProps,
  type IFabOwnProps,
} from './Fab.types';
import { fabStyles } from './Fab.styles';
import { fabVariantStyles } from './variants';
import { fabTheme } from './Fab.stylex';

// https://github.com/material-components/material-web/blob/main/fab/internal/shared.ts
// https://github.com/material-components/material-web/blob/main/fab/internal/fab.ts

type IFab = <TRoot extends React.ElementType = typeof FAB_DEFAULT_TAG>(
  props: IFabProps<TRoot>,
) => React.ReactNode;

export const Fab: IFab = forwardRef(function Fab<
  TRoot extends React.ElementType = typeof FAB_DEFAULT_TAG,
>(props: IFabProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    styles,
    sx,
    as = FAB_DEFAULT_TAG,
    innerStyles,
    size = 'md',
    variant = 'surface',
    label,
    lowered,
    children,
    ...other
  } = props as IWithAsProp<IFabOwnProps>;

  const componentTheme = useComponentTheme('Fab');
  const variantStyles = variant ? fabVariantStyles[variant] : undefined;

  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(fabStyles, variantStyles, styles),
    [variantStyles, styles],
  );

  const extended = !!label;

  return (
    <Button
      ref={forwardedRef}
      as={as}
      variant={false}
      styles={asArray(innerStyles?.button)}
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
      icon={children}
      {...other}
    >
      {label}
    </Button>
  );
});
