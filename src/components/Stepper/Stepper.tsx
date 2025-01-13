import type { IStepperThemeFactory } from './Stepper.css';
import type { IStepperFactory } from './Stepper.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { Step } from '../Step';
import { StepConnector } from '../StepConnector';
import { stepperTheme } from './Stepper.css';

const COMPONENT_NAME = 'Stepper';

export const Stepper = componentFactory<IStepperFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      activeStep,
      loading,
      connector = <StepConnector />,
      orientation = 'horizontal',
      labelPosition = 'right',
      completed,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IStepperThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: stepperTheme,
    });

    return (
      <Box {...getStyles('root')} ref={forwardedRef} {...other}>
        {children}
      </Box>
    );
  },
);

Stepper.theme = stepperTheme;
Stepper.displayName = `@sixui/${COMPONENT_NAME}`;
Stepper.Step = Step;
Stepper.Connector = StepConnector;
