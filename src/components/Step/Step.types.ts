import type { ICompiledStyles } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IButtonBaseProps } from '../ButtonBase';
import type { ICircularProgressIndicatorStylesKey } from '../CircularProgressIndicator';
import type { IStepperContextValue } from '../Stepper';
import type { IStepStylesKey } from './Step.styles';

export type IStepRenderProps = {
  active: boolean;
  completed: boolean;
  hasError: boolean;
};

export type IStepProps = IBaseProps<IStepStylesKey> & {
  innerStyles?: IButtonBaseProps['innerStyles'] & {
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
