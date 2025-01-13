import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonOwnProps } from '../Button';
import type { IStepperContextValue } from '../Stepper';
import type { IStepThemeFactory, stepTheme } from './Step.css';
import { StepIndicator } from '../StepIndicator';

export interface IStepRenderProps {
  inactive: boolean;
  completed: boolean;
  hasError: boolean;
}

export interface IStepOwnProps
  extends IOmit<IButtonOwnProps, 'leadingIcon' | 'trailingIcon' | 'children'> {
  active?: boolean;
  completed?: boolean;
  index?: number;
  last?: boolean;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  hasError?: boolean;
  orientation?: IStepperContextValue['orientation'];
  nextConnector?: IStepperContextValue['connector'];
  alwaysExpanded?: boolean;

  /**
   * Only supported in vertical orientation.
   */
  labelPosition?: IStepperContextValue['labelPosition'];

  /**
   * Only supported in vertical orientation.
   */
  children?: React.ReactNode | ((props: IStepRenderProps) => React.ReactNode);
}

export interface IStepProps
  extends IBoxProps,
    IComponentThemeProps<IStepThemeFactory>,
    IStepOwnProps {}

export type IStepFactory = IComponentFactory<{
  props: IStepProps;
  ref: HTMLButtonElement;
  theme: typeof stepTheme;
  staticComponents: {
    Indicator: typeof StepIndicator;
  };
}>;
