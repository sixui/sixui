import type { IAny, IMaybeAsync, IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ICardOwnProps } from '../Card';
import type {
  checkboxCardTheme,
  ICheckboxCardThemeFactory,
} from './CheckboxCard.css';

export interface ICheckboxCardRenderProps {
  checked?: boolean;
}

export interface ICheckboxCardOwnProps
  extends IOmit<ICardOwnProps, 'children'> {
  checked?: boolean;
  defaultChecked?: boolean;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: React.InputHTMLAttributes<HTMLInputElement>['value'],
  ) => IMaybeAsync<IAny>;
  required?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  disabled?: boolean;
  id?: string;
  rootRef?: React.Ref<HTMLDivElement>;

  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  children?:
    | React.ReactNode
    | ((renderProps: ICheckboxCardRenderProps) => React.ReactNode);
}

export interface ICheckboxCardProps
  extends IBoxProps,
    IComponentThemeProps<ICheckboxCardThemeFactory>,
    ICheckboxCardOwnProps {}

export type ICheckboxCardFactory = IComponentFactory<{
  props: ICheckboxCardProps;
  ref: HTMLInputElement;
  theme: typeof checkboxCardTheme;
}>;
