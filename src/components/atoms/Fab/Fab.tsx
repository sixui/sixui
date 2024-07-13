import { forwardRef, useMemo } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { IFabVariant } from './Fab.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';
import { IThemeComponents } from '@/components/utils/Theme';
import { Button } from '@/components/atoms/Button';
import { FAB_DEFAULT_TAG, type IFabProps, type IFabOwnProps } from './FabProps';

// https://github.com/material-components/material-web/blob/main/fab/internal/shared.ts
// https://github.com/material-components/material-web/blob/main/fab/internal/fab.ts

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

  const { theme, variantTheme } = useComponentThemeOld(
    'Fab',
    variant ? variantMap[variant] : undefined,
  );
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, variantTheme?.styles, styles),
    [theme.styles, variantTheme?.styles, styles],
  );

  const extended = !!label;

  return (
    <Button
      ref={forwardedRef}
      as={as}
      variant={false}
      styles={asArray(innerStyles?.button)}
      sx={[
        stylesCombinator(
          'host',
          extended ? 'host$md' : `host$${size}`,
          extended && 'host$extended',
          lowered && 'host$lowered',
        ),
        theme.vars,
        variantTheme?.vars,
        sx,
      ]}
      icon={children}
      {...other}
    >
      {label}
    </Button>
  );
});
