import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IStepperStepIndicatorThemeFactory,
  stepperStepIndicatorTheme,
} from './StepperStepIndicator.css';
import { IPaperOwnProps } from '~/components/Paper';

export interface IStepperStepIndicatorOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  hasError?: boolean;
  hasErrorIcon?: React.ReactNode;
  completed?: boolean;
  completedIcon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

export interface IStepperStepIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<IStepperStepIndicatorThemeFactory>,
    IStepperStepIndicatorOwnProps {}

export type IStepperStepIndicatorFactory = IComponentFactory<{
  props: IStepperStepIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof stepperStepIndicatorTheme;
}>;
