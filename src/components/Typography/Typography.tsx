import { forwardRef } from 'react';

import type {
  ITypographyProps,
  ITypographySize,
  ITypographyVariant,
} from './Typography.types';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { typographyStyles } from './Typography.styles';
import { Base } from '../Base';

export const typographyTagMap: Record<
  `${ITypographyVariant}$${ITypographySize}`,
  React.ElementType
> = {
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

export const Typography = createPolymorphicComponent<'span', ITypographyProps>(
  forwardRef<HTMLDivElement, ITypographyProps>(
    function Typography(props, forwardedRef) {
      const {
        component,
        styles,
        sx,
        variant = 'body',
        size = 'md',
        children,
        gutterBottom,
        ...other
      } = props as IWithAsProp<ITypographyProps>;

      const { combineStyles, globalStyles } = useStyles({
        name: 'Typography',
        styles: [typographyStyles, styles],
      });

      const rootElement = component ?? typographyTagMap[`${variant}$${size}`];

      return (
        <Base
          component={rootElement}
          {...other}
          sx={[
            globalStyles,
            combineStyles(
              'host',
              gutterBottom && 'host$gutterBottom',
              `${variant}$${size}`,
              sx,
            ),
          ]}
          ref={forwardedRef}
        >
          {children}
        </Base>
      );
    },
  ),
);
