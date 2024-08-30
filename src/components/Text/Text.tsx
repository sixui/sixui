import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { ITextFactory, ITextSize, ITextVariant } from './Text.types';
import { polymorphicComponentFactory } from '~/utils/polymorphicComponentFactory';
import { useProps } from '~/hooks/useProps';
import { useStyles } from '~/hooks/useStyles2';
import { Box } from '../Box';
import { textStyles, type ITextStylesFactory } from './Text.css';

const COMPONENT_NAME = 'Text';

export const textTagMap: Record<
  ITextVariant,
  Record<ITextSize, React.ElementType>
> = {
  display: {
    sm: 'span',
    md: 'span',
    lg: 'span',
  },
  headline: {
    sm: 'h3',
    md: 'h2',
    lg: 'h1',
  },
  title: {
    sm: 'h5',
    md: 'h4',
    lg: 'h3',
  },
  body: {
    sm: 'p',
    md: 'p',
    lg: 'p',
  },
  label: {
    sm: 'span',
    md: 'span',
    lg: 'span',
  },
};

export const Text = polymorphicComponentFactory<ITextFactory>(
  (props, forwardedRef) => {
    const {
      as,
      classNames,
      className,
      style,
      variant = 'body',
      size = 'md',
      gutterBottom,
      dimmed,
      truncate,
      lineClamp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const modifiers = {
      dimmed,
      truncate,
      ['line-clamp']: lineClamp,
      ['gutter-bottom']: gutterBottom,
      variant,
      size,
    };

    const { getStyles } = useStyles<ITextStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: textStyles,
      style,
      variant,
      modifiers,
    });

    const rootElement = as ?? textTagMap[variant][size];

    return (
      <Box
        {...other}
        as={rootElement}
        {...getStyles('root', {
          style:
            !!lineClamp && lineClamp > 0
              ? assignInlineVars({
                  [textStyles.tokens.lineClamp]: String(lineClamp),
                })
              : undefined,
        })}
        ref={forwardedRef}
      />
    );
  },
);
