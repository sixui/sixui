import type { IDividerThemeFactory } from './Divider.css';
import type { IDividerFactory } from './Divider.types';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Divider.constants';
import { dividerTheme } from './Divider.css';

/**
 * @see https://m3.material.io/components/divider/overview
 */
export const Divider = componentFactory<IDividerFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      orientation = 'horizontal',
      labelPosition = 'middle',
      verticalAlign,
      indent,
      indentStart,
      indentEnd,
      label,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const hasInsetStart = !!indent || !!indentStart;
    const hasInsetEnd = !!indent || !!indentEnd;

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
        'label-position': labelPosition,
        'vertical-align': verticalAlign,
      },
    });

    const renderText = (): React.ReactNode => (
      <div {...getStyles('textContainer')}>
        <div {...getStyles('text')}>{label}</div>
      </div>
    );

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {label ? (
          labelPosition === 'top' ? (
            <>
              {renderText()}
              <div {...getStyles(['line', 'line$end'])} />
            </>
          ) : labelPosition === 'bottom' ? (
            <>
              <div {...getStyles(['line', 'line$start'])} />
              {renderText()}
            </>
          ) : (
            <>
              <div {...getStyles(['line', 'line$start'])} />
              {renderText()}
              <div {...getStyles(['line', 'line$end'])} />
            </>
          )
        ) : (
          <div {...getStyles(['line', 'line$start', 'line$end'])} />
        )}
      </Box>
    );
  },
);

Divider.theme = dividerTheme;
Divider.displayName = `@sixui/core/${COMPONENT_NAME}`;
