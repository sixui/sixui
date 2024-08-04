import { forwardRef, useMemo } from 'react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import type {
  TYPOGRAPHY_DEFAULT_TAG,
  ITypographyOwnProps,
  ITypographyProps,
} from './Typography.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { typographyStyles } from './Typography.styles';

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
    component,
    styles,
    sx,
    variant = 'body',
    size = 'md',
    children,
    gutterBottom,
    ...other
  } = props as IWithAsProp<ITypographyOwnProps>;

  const componentTheme = useComponentTheme('Typography');
  const stylesCombinator = useMemo(
    () => stylesCombinatorFactory(typographyStyles, styles),
    [styles],
  );
  const sxf = useMemo(
    () => stylePropsFactory(stylesCombinator),
    [stylesCombinator],
  );

  const Component = component ?? typographyTagMap[`${variant}$${size}`];

  // TODO: make utility
  const isReactComponent = typeof Component === 'function';
  const styleProps = isReactComponent
    ? {
        sx: [
          stylesCombinator(
            componentTheme.overridenStyles,
            'host',
            gutterBottom && 'host$gutterBottom',
            `${variant}$${size}`,
          ),
          sx,
        ],
      }
    : sxf(
        componentTheme.overridenStyles,
        'host',
        gutterBottom && 'host$gutterBottom',
        `${variant}$${size}`,
        sx,
      );

  return (
    <Component {...other} {...styleProps} ref={forwardedRef}>
      {children}
    </Component>
  );
});
