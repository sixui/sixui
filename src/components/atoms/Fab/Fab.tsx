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
} from '@/helpers/polymorphicComponentTypes';
import type { IFabSize, IFabStyleKey, IFabVariant } from './Fab.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { IThemeComponents } from '@/helpers/ThemeContext';
import { type IButtonStyleKey, type IButtonOwnProps, Button } from '../Button';

// https://github.com/material-components/material-web/blob/main/fab/internal/shared.ts
// https://github.com/material-components/material-web/blob/main/fab/internal/fab.ts

const DEFAULT_TAG = 'button';

export type IFabOwnProps = Omit<
  IButtonOwnProps,
  'variant' | 'icon' | 'trailingIcon'
> &
  IContainerProps<IFabStyleKey> & {
    innerStyles?: IButtonOwnProps['innerStyles'] & {
      button?: IZeroOrMore<ICompiledStyles<IButtonStyleKey>>;
    };
    children?: React.ReactNode;
    size?: IFabSize;
    variant?: IFabVariant;
    label?: string;
    lowered?: boolean;
  };

export type IFabProps<TRoot extends React.ElementType = typeof DEFAULT_TAG> =
  IPolymorphicComponentPropsWithRef<TRoot, IFabOwnProps>;

type IFabVariantMap = {
  [key in IFabVariant]: keyof Pick<
    IThemeComponents,
    'SurfaceFab' | 'PrimaryFab' | 'SecondaryFab' | 'TertiaryFab' | 'BrandedFab'
  >;
};

const variantMap: IFabVariantMap = {
  surface: 'SurfaceFab',
  primary: 'PrimaryFab',
  secondary: 'SecondaryFab',
  tertiary: 'TertiaryFab',
  branded: 'BrandedFab',
};

type IFab = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IFabProps<TRoot>,
) => React.ReactNode;

export const Fab: IFab = forwardRef(function Fab<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IFabProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
  const {
    styles,
    sx,
    as = DEFAULT_TAG,
    innerStyles,
    size = 'md',
    variant = 'surface',
    label,
    lowered,
    children,
    ...other
  } = props as IWithAsProp<IFabOwnProps>;

  const theme = useComponentTheme('Fab');
  const variantTheme = useComponentTheme(variantMap[variant]);
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme.styles, styles),
    [theme.styles, variantTheme.styles, styles],
  );

  const extended = !!label;

  return (
    <Button
      ref={ref}
      as={as}
      variant='elevated'
      styles={asArray(innerStyles?.button)}
      sx={[
        stylesCombinator(
          'host',
          extended ? 'host$md' : `host$${size}`,
          extended && 'host$extended',
          lowered && 'host$lowered',
        ),
        theme.vars,
        variantTheme.vars,
        sx,
      ]}
      icon={children}
      {...other}
    >
      {label}
    </Button>
  );
});
