import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { ISelectThemeFactory, selectTheme } from './Select.css';
import type {
  ISelectControlOwnProps,
  ISelectControlProps,
  SelectControl,
} from './SelectControl';

export interface ISelectOwnProps
  extends ISelectControlOwnProps,
    Pick<
      ILabeledOwnProps,
      | 'label'
      | 'supportingText'
      | 'requiredSign'
      | 'hasError'
      | 'errorText'
      | 'loading'
      | 'readOnlyOnLoading'
    > {
  labeledProps?: ILabeledProps;
  controlProps?: ISelectControlProps;
}

export interface ISelectProps
  extends IBoxProps,
    IComponentThemeProps<ISelectThemeFactory>,
    ISelectOwnProps {}

export type ISelectFactory = IComponentFactory<{
  props: ISelectProps;
  ref: HTMLDivElement;
  theme: typeof selectTheme;
  staticComponents: {
    Control: typeof SelectControl;
  };
}>;
