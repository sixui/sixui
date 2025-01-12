import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IStepThemeFactory, stepTheme } from './Step.css';

export interface IStepOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
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
