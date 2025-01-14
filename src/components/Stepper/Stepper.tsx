import { Children, cloneElement, isValidElement, useMemo } from 'react';

import type { IStepProps } from '../Step';
import type { IStepperContextValue } from './Stepper.context';
import type { IStepperThemeFactory } from './Stepper.css';
import type { IStepperFactory } from './Stepper.types';
import { isElementLike } from '~/helpers/react/isElementLike';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeProps } from '~/utils/mergeProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Box } from '../Box';
import { Step } from '../Step';
import { StepConnector } from '../StepConnector';
import { StepperContextProvider } from './Stepper.context';
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
      connectorRenderer = () => <StepConnector />,
      orientation = 'horizontal',
      labelPosition: labelPositionProp = 'right',
      completed,
      onStepClick,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const labelPosition =
      orientation === 'horizontal' ? labelPositionProp : 'right';

    const { getStyles } = useComponentTheme<IStepperThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: stepperTheme,
      modifiers: {
        orientation,
        'label-position': labelPosition,
      },
    });

    type IStep = React.ReactElement<IStepProps>;
    const isStep = (element: React.ReactElement): element is IStep =>
      !!Step.displayName && isElementLike<IStep>(element, Step.displayName);

    const validChildren = Children.toArray(children)
      .filter(isValidElement)
      .filter(isStep);

    const steps = validChildren.map((child, index) =>
      cloneElement(child, {
        index,
        last: index + 1 >= validChildren.length,
        loading: loading && activeStep === index,
        ...mergeProps(
          { onClick: onStepClick ? () => onStepClick(index) : undefined },
          child.props,
        ),
      }),
    );

    const contextValue: IStepperContextValue = useMemo(
      () => ({
        activeStep:
          activeStep !== undefined
            ? Math.max(Math.min(activeStep, validChildren.length - 1), 0)
            : undefined,
        connectorRenderer,
        orientation,
        labelPosition,
        completed,
      }),
      [
        activeStep,
        validChildren.length,
        connectorRenderer,
        orientation,
        labelPosition,
        completed,
      ],
    );

    return (
      <StepperContextProvider value={contextValue}>
        <Box {...getStyles('root')} ref={forwardedRef} {...other}>
          {steps}
        </Box>
      </StepperContextProvider>
    );
  },
);

Stepper.theme = stepperTheme;
Stepper.displayName = `@sixui/${COMPONENT_NAME}`;
Stepper.Step = Step;
Stepper.Connector = StepConnector;
