import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { checkmarkTheme, ICheckmarkThemeFactory } from './Checkmark.css';

export interface ICheckmarkOwnProps {
  disabled?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  wasUnchecked?: boolean;
  wasDisabled?: boolean;
}

export interface ICheckmarkProps
  extends IBoxProps,
    IComponentThemeProps<ICheckmarkThemeFactory>,
    ICheckmarkOwnProps {}

export type ICheckmarkFactory = IComponentFactory<{
  props: ICheckmarkProps;
  ref: HTMLDivElement;
  theme: typeof checkmarkTheme;
}>;
