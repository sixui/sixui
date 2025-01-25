import type { IBoxProps } from '~/components/Box';
import type { IButtonOwnProps } from '~/components/Button';
import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IStepperContextValue } from '../Stepper.context';
import type {
  IStepperStepThemeFactory,
  stepperStepTheme,
} from './StepperStep.css';
import type { StepperStepIndicator } from './StepperStepIndicator';

export interface IStepperStepRenderProps {
  active?: boolean;
  completed?: boolean;
  hasError?: boolean;
}

export interface IStepperStepOwnProps
  extends IOmit<IButtonOwnProps, 'leadingIcon' | 'trailingIcon' | 'children'>,
    IOmit<IStepperContextValue, 'activeStep'> {
  active?: boolean;
  index?: number;
  last?: boolean;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  hasError?: boolean;
  alwaysExpanded?: boolean;

  /**
   * Only supported in vertical orientation.
   */
  children?:
    | React.ReactNode
    | ((props: IStepperStepRenderProps) => React.ReactNode);
}

export interface IStepperStepProps
  extends IBoxProps,
    IComponentThemeProps<IStepperStepThemeFactory>,
    IStepperStepOwnProps {}

export type IStepperStepFactory = IComponentFactory<{
  props: IStepperStepProps;
  ref: HTMLButtonElement;
  theme: typeof stepperStepTheme;
  staticComponents: {
    Indicator: typeof StepperStepIndicator;
  };
}>;
