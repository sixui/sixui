import type { IStepperConnectorThemeFactory } from './StepperConnector.css';
import type { IStepperConnectorFactory } from './StepperConnector.types';
import { Divider } from '~/components/Divider';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useStepperStepContext } from '../StepperStep/StepperStep.context';
import { dividerTheme } from './StepperConnector.css';

const COMPONENT_NAME = 'StepperConnector';

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

    const orientation =
      orientationProp ?? stepContext?.orientation ?? 'horizontal';
    const stepLabelPosition =
      stepLabelPositionProp ?? stepContext?.labelPosition ?? 'right';
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
      modifiers: {
        orientation,
        'step-label-position': stepLabelPosition,
        completed: stepContext?.completed,
      },
    });

    return (
      <Divider
        {...getStyles('root')}
        ref={forwardedRef}
        orientation={orientation}
        labelPosition={contentPosition}
        verticalAlign={verticalAlign}
        {...other}
      />
    );
  },
);

StepperConnector.theme = dividerTheme;
StepperConnector.displayName = `@sixui/${COMPONENT_NAME}`;
