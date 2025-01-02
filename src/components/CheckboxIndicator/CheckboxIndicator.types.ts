import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type {
  checkboxIndicatorTheme,
  ICheckboxIndicatorThemeFactory,
} from './CheckboxIndicator.css';

export interface ICheckboxIndicatorOwnProps extends IPaperBaseOwnProps {
  checked?: boolean;
  indeterminate?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export interface ICheckboxIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<ICheckboxIndicatorThemeFactory>,
    ICheckboxIndicatorOwnProps {}

export type ICheckboxIndicatorFactory = IComponentFactory<{
  props: ICheckboxIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof checkboxIndicatorTheme;
}>;
