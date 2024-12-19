import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { IRadioThemeFactory, RadioTheme } from './Radio.css';

export type IRadioVariant = 'primary';

export interface IRadioOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IRadioProps
  extends IBoxProps,
    IButtonBaseOwnProps,
    IComponentThemeProps<IRadioThemeFactory>,
    IRadioOwnProps {}

export type IRadioFactory = IComponentFactory<{
  props: IRadioProps;
  ref: HTMLDivElement;
  theme: typeof RadioTheme;
  variant: IRadioVariant | false;
}>;
