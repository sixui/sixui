import { forwardRef, useMemo } from 'react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type { ITypographyStyleKey } from './Typography.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  TYPOGRAPHY_DEFAULT_TAG,
  type ITypographyOwnProps,
  type ITypographyProps,
} from './TypographyProps';

export const typographyTagMap = {
  display$lg: 'span',
  display$md: 'span',
  display$sm: 'span',
  headline$lg: 'h1',
  headline$md: 'h2',
  headline$sm: 'h3',
  title$lg: 'h4',
  title$md: 'h5',
  title$sm: 'h6',
  body$lg: 'p',
  body$md: 'p',
  body$sm: 'p',
  label$lg: 'span',
  label$md: 'span',
  label$sm: 'span',
};

type ITypography = <
  TRoot extends React.ElementType = typeof TYPOGRAPHY_DEFAULT_TAG,
>(
  props: ITypographyProps<TRoot>,
) => React.ReactNode;

export const Typography: ITypography = forwardRef(function Typography<
  TRoot extends React.ElementType = typeof TYPOGRAPHY_DEFAULT_TAG,
>(props: ITypographyProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as,
    styles,
    sx,
    variant = 'body',
    size = 'md',
    children,
    gutterBottom,
    ...other
  } = props as IWithAsProp<ITypographyOwnProps>;

  const { theme } = useComponentTheme('Typography');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory<ITypographyStyleKey>(stylesCombinator),
    [stylesCombinator],
  );

  const Component = as ?? typographyTagMap[`${variant}$${size}`];

  return (
    <Component
      {...sxf(
        'host',
        gutterBottom && 'host$gutterBottom',
        `${variant}$${size}`,
        sx,
      )}
      sx={sx}
      ref={forwardedRef}
      {...other}
    >
      {children}
    </Component>
  );
});
