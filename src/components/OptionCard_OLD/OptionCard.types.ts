import type {
  IAny,
  ICompiledStyles,
  IMaybeAsync,
  IZeroOrMore,
} from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { ICardStylesKey } from '../Card';
import type { IOptionCardStylesKey } from './OptionCard.styles';

export type IOptionCardControlRenderProps = {
  ref: React.Ref<HTMLInputElement>;
};

export type IOptionCardRenderProps = {
  checked?: boolean;
};

export type IOptionCardProps = IBaseProps<IOptionCardStylesKey> & {
  innerStyles?: {
    card?: IZeroOrMore<ICompiledStyles<ICardStylesKey>>;
  };
  label: string;
  supportingText?: string;
  children?:
    | React.ReactNode
    | ((renderProps: IOptionCardRenderProps) => React.ReactNode);
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: React.InputHTMLAttributes<HTMLInputElement>['value'],
  ) => IMaybeAsync<IAny>;
  disabled?: boolean;
  readOnly?: boolean;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
};
