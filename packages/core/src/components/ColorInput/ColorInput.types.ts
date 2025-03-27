import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  colorInputTheme,
  IColorInputThemeFactory,
} from './ColorInput.css';
import type {
  ColorInputControl,
  IColorInputControlOwnProps,
  IColorInputControlProps,
} from './ColorInputControl';

export interface IColorInputOwnProps
  extends IColorInputControlOwnProps,
    IOmit<ILabeledOwnProps, 'children'> {
  labeledProps?: Partial<ILabeledProps>;
  controlProps?: Partial<IColorInputControlProps>;
}

export interface IColorInputProps
  extends IBoxProps,
    IComponentThemeProps<IColorInputThemeFactory>,
    IColorInputOwnProps {}

export type IColorInputFactory = IComponentFactory<{
  props: IColorInputProps;
  ref: HTMLInputElement;
  theme: typeof colorInputTheme;
  staticComponents: {
    Control: typeof ColorInputControl;
  };
}>;
