import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
} from 'react';

import type { IContainerProps } from '@/helpers/types';
import type { IStepperStyleKey } from './Stepper.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { Step, type IStepProps } from '@/components/atoms/Step';
import { StepConnector } from '@/components/atoms/StepConnector';
import { isElementLike } from '@/helpers/react/isElementLike';
import { StepperContext, type IStepperContextValue } from './StepperContext';

export type IStepperProps = IContainerProps<IStepperStyleKey> & {
  children: React.ReactNode;
  activeStep?: number;
  loading?: boolean;
  connector?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  labelPosition?: 'right' | 'bottom';
  completed?: boolean;
};

const defaultConnector = <StepConnector />;

const Stepper = forwardRef<HTMLDivElement, IStepperProps>(
  function Stepper(props, ref) {
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

    const { theme } = useComponentTheme('Stepper');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory<IStepperStyleKey>(stylesCombinator),
      [stylesCombinator],
    );

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
        <div
          {...sxf(
            'host',
            `host$${orientation}`,
            labelPosition === 'bottom' && 'host$labelBottom',
            sx,
          )}
          ref={ref}
          {...other}
        >
          {steps}
        </div>
      </StepperContext.Provider>
    );
  },
);

const StepperNamespace = Object.assign(Stepper, {
  Step,
  Connector: StepConnector,
});

export { StepperNamespace as Stepper };
