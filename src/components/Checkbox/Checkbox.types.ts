import type { IAny, IMaybeAsync } from '~/helpers/types';
import type { IInteractionsMergeStrategy } from '~/hooks/useInteractions';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { CheckboxIndicator } from '../CheckboxIndicator';
import type { IPaperBaseOwnProps } from '../PaperBase';
import type { checkboxTheme, ICheckboxThemeFactory } from './Checkbox.css';

export interface ICheckboxOwnProps extends IPaperBaseOwnProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  defaultIndeterminate?: boolean;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: React.InputHTMLAttributes<HTMLInputElement>['value'],
  ) => IMaybeAsync<IAny>;
  required?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  interactionsMergeStrategy?: IInteractionsMergeStrategy;
  id?: string;
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface ICheckboxProps
  extends IBoxProps,
    IComponentThemeProps<ICheckboxThemeFactory>,
    ICheckboxOwnProps {}

export type ICheckboxFactory = IComponentFactory<{
  props: ICheckboxProps;
  ref: HTMLInputElement;
  theme: typeof checkboxTheme;
  staticComponents: {
    Indicator: typeof CheckboxIndicator;
  };
}>;
