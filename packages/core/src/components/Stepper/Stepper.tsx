import { Children, cloneElement, isValidElement, useMemo } from 'react';

import type { IStepperContextValue } from './Stepper.context';
import type { IStepperThemeFactory } from './Stepper.css';
import type { IStepperFactory } from './Stepper.types';
import type { IStepperStepProps } from './StepperStep';
import { Box } from '~/components/Box';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeProps } from '~/utils/mergeProps';
import { isElementLike } from '~/utils/react/isElementLike';
import { COMPONENT_NAME } from './Stepper.constants';
import { StepperContextProvider } from './Stepper.context';
import { StepperConnector } from './StepperConnector';
import { StepperStep } from './StepperStep';
import { stepperTheme } from './Stepper.css';

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
      connectorRenderer = () => <StepperConnector />,
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

    type IStep = React.ReactElement<IStepperStepProps>;
    const isStep = (element: React.ReactElement): element is IStep =>
      !!StepperStep.displayName &&
      isElementLike(element, StepperStep.displayName);

    const validChildren = Children.toArray(children)
      .filter(isValidElement)
      .filter(isStep);

    const steps = validChildren.map((child, index) =>
      cloneElement(child, {
        index,
        last: index + 1 >= validChildren.length,
        loading: loading && activeStep === index,
        ...mergeProps(
          {
            onClick: onStepClick
              ? () => {
                  onStepClick(index);
                }
              : undefined,
          },
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
Stepper.Step = StepperStep;
Stepper.Connector = StepperConnector;
