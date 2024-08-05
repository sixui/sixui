import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
} from 'react';

import type { IStepperProps } from './Stepper.types';
import { Step, type IStepProps } from '../Step';
import { StepConnector } from '../StepConnector';
import { isElementLike } from '~/helpers/react/isElementLike';
import { StepperContext, type IStepperContextValue } from './StepperContext';
import { stepperStyles } from './Stepper.styles';
import { Base } from '../Base';
import { useStyles } from '~/hooks/useStyles';

const defaultConnector = <StepConnector />;

export const Stepper = forwardRef<HTMLDivElement, IStepperProps>(
  function Stepper(props, forwardedRef) {
    const {
      styles,
      sx,
      children,
      activeStep,
      loading,
      connector = defaultConnector,
      orientation = 'horizontal',
      labelPosition: labelPositionProp = 'right',
      completed,
      ...other
    } = props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'Stepper',
      styles: [stepperStyles, styles],
    });

    type IStep = React.ReactElement<IStepProps>;
    const isStep = (element: React.ReactElement): element is IStep =>
      !!Step.displayName && isElementLike<IStep>(element, Step.displayName);

    const validChildren = Children.toArray(children)
      .filter(isValidElement)
      .filter(isStep);

    // TODO: avoid cloneElement
    const steps = validChildren.map((child, index) =>
      cloneElement(child, {
        index,
        last: index + 1 >= validChildren.length,
        loading: loading && activeStep === index,
        ...child.props,
      }),
    );

    const labelPosition =
      orientation === 'horizontal' ? labelPositionProp : 'right';

    const contextValue: IStepperContextValue = useMemo(
      () => ({
        activeStep:
          activeStep !== undefined
            ? Math.max(Math.min(activeStep, validChildren.length - 1), 0)
            : undefined,
        connector,
        orientation,
        labelPosition,
        completed,
      }),
      [
        activeStep,
        validChildren.length,
        connector,
        orientation,
        labelPosition,
        completed,
      ],
    );

    return (
      <StepperContext.Provider value={contextValue}>
        <Base
          {...other}
          sx={[
            globalStyles,
            combineStyles(
              'host',
              `host$${orientation}`,
              labelPosition === 'bottom' && 'host$labelBottom',
            ),
            sx,
          ]}
          ref={forwardedRef}
        >
          {steps}
        </Base>
      </StepperContext.Provider>
    );
  },
);
