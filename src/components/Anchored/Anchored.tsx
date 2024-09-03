import type { IAnchoredFactory } from './Anchored.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useStyles } from '~/utils/styles/useStyles';
import { Box } from '../Box';
import { anchoredStyles, type IAnchoredStylesFactory } from './Anchored.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

const COMPONENT_NAME = 'Anchored';

export const Anchored = componentFactory<IAnchoredFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      style,
      variant,
      position = 'top-right',
      overlap = 'rectangular',
      children,
      content,
      invisible: invisibleProp,
      offsetX,
      offsetY,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const invisible = invisibleProp || !content;

    const { getStyles } = useStyles<IAnchoredStylesFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles: anchoredStyles,
      style,
      variant,
      modifiers: {
        position,
        invisible,
        overlap,
      },
    });

    return (
      <Box
        {...other}
        {...getStyles('root', {
          style: assignInlineVars({
            [anchoredStyles.tokens.offset.x]: offsetX,
            [anchoredStyles.tokens.offset.y]: offsetY,
          }),
        })}
        ref={forwardedRef}
      >
        {children}
        <div {...getStyles('content')}>{content}</div>
      </Box>
    );
  },
);
