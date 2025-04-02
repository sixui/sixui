import type { IStepperConnectorThemeFactory } from './StepperConnector.css';
import type { IStepperConnectorFactory } from './StepperConnector.types';
import { Divider } from '~/components/Divider';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { useStepperStepContext } from '../StepperStep/StepperStep.context';
import { COMPONENT_NAME } from './StepperConnector.constants';
import { dividerTheme } from './StepperConnector.css';

export const StepperConnector = componentFactory<IStepperConnectorFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      orientation: orientationProp,
      stepLabelPosition: stepLabelPositionProp,
      labelPosition: contentPositionProp,
      verticalAlign = 'middle',
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const stepContext = useStepperStepContext();

    const orientation = orientationProp ?? stepContext.orientation;
    const stepLabelPosition =
      stepLabelPositionProp ?? stepContext.labelPosition;
    const contentPosition =
      (orientation === 'horizontal' ? contentPositionProp : undefined) ??
      'middle';

    const { getStyles } = useComponentTheme<IStepperConnectorThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: dividerTheme,
    });

    return (
      <Divider
        {...getStyles('root', {
          modifiers: {
            orientation,
            'step-label-position': stepLabelPosition,
            completed: stepContext.completed,
          },
        })}
        ref={forwardedRef}
        orientation={orientation}
        labelPosition={contentPosition}
        verticalAlign={verticalAlign}
        {...other}
      />
    );
  },
);

StepperConnector.displayName = `@sixui/core/${COMPONENT_NAME}`;
StepperConnector.theme = dividerTheme;
