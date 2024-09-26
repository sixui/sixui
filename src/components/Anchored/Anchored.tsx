import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IAnchoredThemeFactory } from './Anchored.css';
import type { IAnchoredFactory } from './Anchored.types';
import { px } from '~/helpers/styles/px';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { anchoredTheme } from './Anchored.css';

const COMPONENT_NAME = 'Anchored';

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
      theme: anchoredTheme,
      variant,
      modifiers: {
        position,
        invisible,
        overlap,
      },
    });

    return (
      <Box
        {...getStyles('root', {
          style: assignInlineVars({
            [anchoredTheme.tokens.offset.x]: offsetX ? px(offsetX) : undefined,
            [anchoredTheme.tokens.offset.y]: offsetY ? px(offsetY) : undefined,
          }),
        })}
        ref={forwardedRef}
        {...other}
      >
        {children}
        <div {...getStyles('content')}>{content}</div>
      </Box>
    );
  },
);

Anchored.theme = anchoredTheme;
Anchored.displayName = `@sixui/${COMPONENT_NAME}`;
