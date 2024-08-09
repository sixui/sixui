import { forwardRef } from 'react';

import type { ITextProps, ITextSize, ITextVariant } from './Text.types';
import {
  createPolymorphicComponent,
  type IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { useStyles } from '~/hooks/useStyles';
import { textStyles } from './Text.styles';
import { Base } from '../Base';
import { commonStyles } from '~/helpers/commonStyles';

export const textTagMap: Record<
  `${ITextVariant}$${ITextSize}`,
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

export const Text = createPolymorphicComponent<'span', ITextProps>(
  forwardRef<HTMLDivElement, ITextProps>(function Text(props, forwardedRef) {
    const {
      component,
      styles,
      sx,
      variant = 'body',
      size = 'md',
      children,
      gutterBottom,
      dimmed,
      truncate,
      truncateLines,
      ...other
    } = props as IWithAsProp<ITextProps>;

    const { combineStyles, globalStyles } = useStyles({
      name: 'Text',
      styles: [textStyles, styles],
    });

    const rootElement = component ?? textTagMap[`${variant}$${size}`];

    return (
      <Base
        component={rootElement}
        {...other}
        sx={[
          globalStyles,
          combineStyles(
            'host',
            dimmed && 'host$dimmed',
            truncate && commonStyles.truncate,
            !!truncateLines &&
              truncateLines > 0 &&
              commonStyles.truncateLines(truncateLines),
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
  }),
);
