import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide, IOmit } from '~/utils/types';
import type { IRadioThemeFactory, radioTheme } from './Radio.css';
import type {
  IRadioControlOwnProps,
  IRadioControlProps,
  RadioControl,
} from './RadioControl';
import type { RadioIndicator } from './RadioIndicator';

export interface IRadioOwnProps
  extends IRadioControlOwnProps,
    IOmit<ILabeledOwnProps, 'children' | 'readOnlyOnLoading'> {
  labelPosition?: IHorizontalSide;
  labeledProps?: ILabeledProps;
  controlProps?: IRadioControlProps;
}

export interface IRadioProps
  extends IBoxProps,
    IComponentThemeProps<IRadioThemeFactory>,
    IRadioOwnProps {}

export type IRadioFactory = IComponentFactory<{
  props: IRadioProps;
  ref: HTMLInputElement;
  theme: typeof radioTheme;
  staticComponents: {
    Control: typeof RadioControl;
    Indicator: typeof RadioIndicator;
  };
}>;
