import type { IOrientation } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { Step } from '../Step';
import type { IStepperThemeFactory, stepperTheme } from './Stepper.css';
import { StepConnector } from '../StepConnector';

export interface IStepperOwnProps {
  children: React.ReactNode;
  activeStep?: number;
  loading?: boolean;
  connector?: React.ReactNode;
  orientation?: IOrientation;
  labelPosition?: 'right' | 'bottom';
  completed?: boolean;
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
