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
      contentPosition = 'middle',
      inset,
      insetStart,
      insetEnd,
      label,
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
      variant,
      theme: dividerTheme,
      modifiers: {
        orientation,
        'inset-start': hasInsetStart,
        'inset-end': hasInsetEnd,
        'content-position': contentPosition,
      },
    });

    const renderText = (): React.ReactNode => (
      <div {...getStyles('textContainer')}>
        <div {...getStyles('text')}>{label}</div>
      </div>
    );

    const renderLine = (): React.ReactNode => <div {...getStyles('line')} />;

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {label ? (
          contentPosition === 'top' ? (
            <>
              {renderText()}
              {renderLine()}
            </>
          ) : contentPosition === 'bottom' ? (
            <>
              {renderLine()}
              {renderText()}
            </>
          ) : (
            <>
              {renderLine()}
              {renderText()}
              {renderLine()}
            </>
          )
        ) : (
          renderLine()
        )}
      </Box>
    );
  },
);

Divider.theme = dividerTheme;
Divider.displayName = `@sixui/${COMPONENT_NAME}`;
