import type { IAny, IMaybeAsync, IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { IRadioThemeFactory, RadioTheme } from './Radio.css';

export interface IRadioOwnProps
  extends IOmit<IButtonBaseOwnProps, 'children' | 'type'> {
  checked?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: React.InputHTMLAttributes<HTMLInputElement>['value'],
  ) => IMaybeAsync<IAny>;
  loading?: boolean;
  name?: string;
  value?: string;
  id?: string;
}

export interface IRadioProps
  extends IBoxProps,
    IComponentThemeProps<IRadioThemeFactory>,
    IRadioOwnProps {}

export type IRadioFactory = IComponentFactory<{
  props: IRadioProps;
  ref: HTMLDivElement;
  theme: typeof RadioTheme;
}>;
