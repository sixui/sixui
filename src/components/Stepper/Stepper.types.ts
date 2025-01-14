import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { Step } from '../Step';
import type { StepConnector } from '../StepConnector';
import type { IStepperContextValue } from './Stepper.context';
import type { IStepperThemeFactory, stepperTheme } from './Stepper.css';

export interface IStepperOwnProps extends IStepperContextValue {
  children: React.ReactNode;
  onStepClick?: (index: number) => void;
}

export interface IStepperProps
  extends IBoxProps,
    IComponentThemeProps<IStepperThemeFactory>,
    IStepperOwnProps {}

export type IStepperFactory = IComponentFactory<{
  props: IStepperProps;
  ref: HTMLDivElement;
  theme: typeof stepperTheme;
  staticComponents: {
    Step: typeof Step;
    Connector: typeof StepConnector;
  };
}>;
