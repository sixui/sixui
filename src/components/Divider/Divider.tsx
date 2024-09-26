import type { IDividerThemeFactory } from './Divider.css';
import type { IDividerFactory } from './Divider.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { dividerTheme } from './Divider.css';

const COMPONENT_NAME = 'Divider';

export const Divider = componentFactory<IDividerFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      orientation = 'horizontal',
      inset,
      insetStart,
      insetEnd,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const hasInsetStart = !!inset || !!insetStart;
    const hasInsetEnd = !!inset || !!insetEnd;

    const { getStyles } = useComponentTheme<IDividerThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: dividerTheme,
      variant,
      modifiers: {
        orientation,
        'inset-start': hasInsetStart,
        'inset-end': hasInsetEnd,
      },
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children ? (
          <>
            <div {...getStyles('line')} />
            <div {...getStyles('textContainer')}>
              <div {...getStyles('text')}>{children}</div>
            </div>
            <div {...getStyles('line')} />
          </>
        ) : (
          <div {...getStyles('line')} />
        )}
      </Box>
    );
  },
);

Divider.theme = dividerTheme;
Divider.displayName = `@sixui/${COMPONENT_NAME}`;
