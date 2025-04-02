import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IAnchoredThemeFactory } from './Anchored.css';
import type { IAnchoredFactory } from './Anchored.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './Anchored.constants';
import { anchoredTheme } from './Anchored.css';

export const Anchored = componentFactory<IAnchoredFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      position = 'top-end',
      overlap = 'rectangular',
      children,
      content,
      invisible: invisibleProp,
      offsetX,
      offsetY,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const invisible = invisibleProp || !content;

    const { getStyles } = useComponentTheme<IAnchoredThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: anchoredTheme,
    });

    return (
      <Box
        {...getStyles('root', {
          style: assignInlineVars({
            [anchoredTheme.tokens.offset.x]: offsetX ? px(offsetX) : undefined,
            [anchoredTheme.tokens.offset.y]: offsetY ? px(offsetY) : undefined,
          }),
          modifiers: {
            position,
            invisible,
          },
        })}
        ref={forwardedRef}
        {...other}
      >
        {children}
        <div
          {...getStyles([
            'content',
            overlap === 'rectangular'
              ? 'content$rectangularOverlap'
              : 'content$circularOverlap',
          ])}
        >
          {content}
        </div>
      </Box>
    );
  },
);

Anchored.displayName = `@sixui/core/${COMPONENT_NAME}`;
Anchored.theme = anchoredTheme;
