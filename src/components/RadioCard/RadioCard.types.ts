import type { IAny, IMaybeAsync } from '~/helpers/types';
import type { IInteractionsMergeStrategy } from '~/hooks/useInteractions';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { RadioIndicator } from '../RadioIndicator';
import type { IRadioCardThemeFactory, RadioCardTheme } from './RadioCard.css';

export interface IRadioCardRenderProps {
  checked?: boolean;
}

export interface IRadioCardOwnProps {
  checked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: React.InputHTMLAttributes<HTMLInputElement>['value'],
  ) => IMaybeAsync<IAny>;
  required?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  disabled?: boolean;
  interactionsMergeStrategy?: IInteractionsMergeStrategy;
  name?: string;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  id?: string;
  rootRef?: React.Ref<HTMLButtonElement>;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  children?:
    | React.ReactNode
    | ((renderProps: IRadioCardRenderProps) => React.ReactNode);
}

export interface IRadioCardProps
  extends IBoxProps,
    IComponentThemeProps<IRadioCardThemeFactory>,
    IRadioCardOwnProps {}

export type IRadioCardFactory = IComponentFactory<{
  props: IRadioCardProps;
  ref: HTMLInputElement;
  theme: typeof RadioCardTheme;
  staticComponents: {
    Indicator: typeof RadioIndicator;
  };
}>;
