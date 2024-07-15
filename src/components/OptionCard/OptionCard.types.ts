import type {
  IAny,
  ICompiledStyles,
  IContainerProps,
  IMaybeAsync,
  IZeroOrMore,
} from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { ICardStylesKey } from '@/components/Card';
import type { IOptionCardStylesKey } from './OptionCard.styles';

export type IOptionCardControlRenderProps = {
  ref: React.Ref<HTMLInputElement>;
};

export type IOptionCardRenderProps = {
  checked?: boolean;
};

export type IOptionCardOwnProps = IContainerProps<IOptionCardStylesKey> & {
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
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
};

export type IOptionCardProps<TRoot extends React.ElementType> =
  IPolymorphicComponentPropsWithRef<TRoot, IOptionCardOwnProps>;
