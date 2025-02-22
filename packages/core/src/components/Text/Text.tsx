import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { ITextThemeFactory } from './Text.css';
import type { ITextFactory, ITextSize, ITextVariant } from './Text.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './Text.constants';
import { textTheme } from './Text.css';

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

/**
 * @see https://m3.material.io/styles/typography/overview
 */
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
      variant,
      theme: textTheme,
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
Text.displayName = `@sixui/core/${COMPONENT_NAME}`;
