import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  INativeSelectThemeFactory,
  nativeSelectTheme,
} from './NativeSelect.css';
import type {
  INativeSelectControlOwnProps,
  INativeSelectControlProps,
  NativeSelectControl,
} from './NativeSelectControl';

export interface INativeSelectOwnProps
  extends INativeSelectControlOwnProps,
    IOmit<ILabeledOwnProps, 'children'> {
  labeledProps?: ILabeledProps;
  controlProps?: INativeSelectControlProps;
}

export interface INativeSelectProps
  extends IBoxProps,
    IComponentThemeProps<INativeSelectThemeFactory>,
    INativeSelectOwnProps {}

export type INativeSelectFactory = IComponentFactory<{
  props: INativeSelectProps;
  ref: HTMLSelectElement;
  theme: typeof nativeSelectTheme;
  staticComponents: {
    Control: typeof NativeSelectControl;
  };
}>;
