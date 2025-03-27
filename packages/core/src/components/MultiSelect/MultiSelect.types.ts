import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  IMultiSelectThemeFactory,
  multiSelectTheme,
} from './MultiSelect.css';
import type {
  IMultiSelectControlOwnProps,
  IMultiSelectControlProps,
  MultiSelectControl,
} from './MultiSelectControl';

export interface IMultiSelectOwnProps
  extends IMultiSelectControlOwnProps,
    IOmit<ILabeledOwnProps, 'children'> {
  labeledProps?: Partial<ILabeledProps>;
  controlProps?: Partial<IMultiSelectControlProps>;
  skeleton?: boolean;
}

export interface IMultiSelectProps
  extends IBoxProps,
    IComponentThemeProps<IMultiSelectThemeFactory>,
    IMultiSelectOwnProps {}

export type IMultiSelectFactory = IComponentFactory<{
  props: IMultiSelectProps;
  ref: HTMLDivElement;
  theme: typeof multiSelectTheme;
  staticComponents: {
    Control: typeof MultiSelectControl;
  };
}>;
