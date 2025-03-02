import type { IBoxProps } from '~/components/Box';
import type { IButtonOwnProps } from '~/components/Button';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type { IStepperContextValue } from '../Stepper.context';
import type {
  IStepperStepThemeFactory,
  stepperStepTheme,
} from './StepperStep.css';
import type { StepperStepIndicator } from './StepperStepIndicator';

export interface IStepperStepChildrenRenderProps {
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
    | ((props: IStepperStepChildrenRenderProps) => React.ReactNode);
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
