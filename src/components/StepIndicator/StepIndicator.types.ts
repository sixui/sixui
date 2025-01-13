import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  IStepIndicatorThemeFactory,
  stepIndicatorTheme,
} from './StepIndicator.css';
import { IPaperOwnProps } from '../Paper';

export interface IStepIndicatorOwnProps extends IPaperOwnProps {
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

export interface IStepIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<IStepIndicatorThemeFactory>,
    IStepIndicatorOwnProps {}

export type IStepIndicatorFactory = IComponentFactory<{
  props: IStepIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof stepIndicatorTheme;
}>;
