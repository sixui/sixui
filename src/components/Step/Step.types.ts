import type { ICompiledStyles, IContainerProps } from '@/helpers/types';
import type { IButtonBaseOwnProps } from '@/components/ButtonBase';
import type { ICircularProgressIndicatorStylesKey } from '@/components/CircularProgressIndicator';
import type { IStepperContextValue } from '@/components/Stepper';
import type { IStepStylesKey } from './Step.styles';

export type IStepRenderProps = {
  active: boolean;
  completed: boolean;
  hasError: boolean;
};

export type IStepProps = IContainerProps<IStepStylesKey> & {
  innerStyles?: IButtonBaseOwnProps['innerStyles'] & {
    circularProgressIndicator?: ICompiledStyles<ICircularProgressIndicatorStylesKey>;
  };
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
};