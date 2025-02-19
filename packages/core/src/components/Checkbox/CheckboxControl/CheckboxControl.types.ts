import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IUseCheckboxProps } from '~/hooks/useCheckbox';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  checkboxControlTheme,
  ICheckboxControlThemeFactory,
} from './CheckboxControl.css';

export interface ICheckboxControlOwnProps extends IUseCheckboxProps {
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface ICheckboxControlProps
  extends IBoxProps,
    IComponentThemeProps<ICheckboxControlThemeFactory>,
    ICheckboxControlOwnProps {}

export type ICheckboxControlFactory = IComponentFactory<{
  props: ICheckboxControlProps;
  ref: HTMLInputElement;
  theme: typeof checkboxControlTheme;
}>;
