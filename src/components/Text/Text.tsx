import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { ITextThemeFactory } from './Text.css';
import type { ITextFactory, ITextSize, ITextVariant } from './Text.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { textTheme } from './Text.css';

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
      styles,
      style,
      variant = 'body',
      size = 'md',
      gutterBottom,
      dimmed,
      truncate,
      lineClamp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ITextThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: textTheme,
      variant,
      modifiers: {
        dimmed,
        truncate,
        ['line-clamp']: lineClamp,
        ['gutter-bottom']: gutterBottom,
        size,
      },
    });

    const rootElement = as ?? (variant ? textTagMap[variant][size] : 'div');

    return (
      <Box
        as={rootElement}
        {...getStyles('root', {
          style: lineClamp
            ? assignInlineVars({
                [textTheme.tokens.lineClamp]: String(lineClamp),
              })
            : undefined,
        })}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

Text.theme = textTheme;
Text.displayName = `@sixui/${COMPONENT_NAME}`;
