import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStepperContextValue } from './Stepper.context';
import type { IStepperThemeFactory, stepperTheme } from './Stepper.css';
import type { StepperConnector } from './StepperConnector';
import type { StepperStep } from './StepperStep';

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
    Step: typeof StepperStep;
    Connector: typeof StepperConnector;
  };
}>;
