import type { IAny, IMaybeAsync } from '~/helpers/types';
import type { IInteractionsMergeStrategy } from '~/hooks/useInteractions';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { RadioIndicator } from '../RadioIndicator';
import type { IRadioThemeFactory, RadioTheme } from './Radio.css';

export interface IRadioOwnProps {
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
  value?: string;
  id?: string;
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface IRadioProps
  extends IBoxProps,
    IComponentThemeProps<IRadioThemeFactory>,
    IRadioOwnProps {}

export type IRadioFactory = IComponentFactory<{
  props: IRadioProps;
  ref: HTMLInputElement;
  theme: typeof RadioTheme;
  staticComponents: {
    Indicator: typeof RadioIndicator;
  };
}>;
