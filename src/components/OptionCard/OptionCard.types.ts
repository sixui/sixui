import type { IAny, IMaybeAsync, IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ICardOwnProps, ICardVariant } from '../Card';
import type {
  IOptionCardThemeFactory,
  optionCardTheme,
} from './OptionCard.css';

export interface IOptionCardRenderProps {
  checked?: boolean;
}

export interface IOptionCardOwnProps extends IOmit<ICardOwnProps, 'children'> {
  control?: React.ElementType;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  children?:
    | React.ReactNode
    | ((renderProps: IOptionCardRenderProps) => React.ReactNode);
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
  id?: string;
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface IOptionCardProps
  extends IBoxProps,
    IComponentThemeProps<IOptionCardThemeFactory>,
    IOptionCardOwnProps {}

export type IOptionCardFactory = IComponentFactory<{
  props: IOptionCardProps;
  ref: HTMLInputElement;
  theme: typeof optionCardTheme;
  variant: ICardVariant;
}>;
