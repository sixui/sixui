import type { IStepConnectorThemeFactory } from './StepConnector.css';
import type { IStepConnectorFactory } from './StepConnector.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { dividerTheme } from './StepConnector.css';

const COMPONENT_NAME = 'StepConnector';

export const StepConnector = componentFactory<IStepConnectorFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      orientation = 'horizontal',
      stepLabelPosition,
      textPosition,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IStepConnectorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: dividerTheme,
      modifiers: {
        orientation,
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

StepConnector.theme = dividerTheme;
StepConnector.displayName = `@sixui/${COMPONENT_NAME}`;
