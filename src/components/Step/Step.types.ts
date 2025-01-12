import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IStepperContextValue } from '../Stepper';
import type { IStepThemeFactory, stepTheme } from './Step.css';

export interface IStepRenderProps {
  active: boolean;
  completed: boolean;
  hasError: boolean;
}

export interface IStepOwnProps {
  active?: boolean;
  completed?: boolean;
  disabled?: boolean;
  index?: number;
  last?: boolean;
  icon?: React.ReactNode;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  hasError?: boolean;
  loading?: boolean;
  onClick?: () => void;
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
  ref: HTMLDivElement;
  theme: typeof stepTheme;
}>;
