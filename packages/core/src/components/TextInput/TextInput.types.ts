import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  ITextInputControlOwnProps,
  ITextInputControlProps,
  TextInputControl,
} from './TextInputControl';
import {
  ITextInputControlThemeFactory,
  textInputControlTheme,
} from './TextInputControl/TextInputControl.css';

export interface ITextInputOwnProps
  extends ITextInputControlOwnProps,
    Pick<
      ILabeledOwnProps,
      | 'label'
      | 'supportingText'
      | 'requiredSign'
      | 'hasError'
      | 'errorText'
      | 'loading'
      | 'disableOnLoading'
    > {
  labeledProps?: ILabeledProps;
  controlProps?: ITextInputControlProps;
}

export interface ITextInputProps
  extends IBoxProps,
    IComponentThemeProps<ITextInputControlThemeFactory>,
    ITextInputOwnProps {}

export type ITextInputFactory = IComponentFactory<{
  props: ITextInputProps;
  ref: HTMLInputElement;
  theme: typeof textInputControlTheme;
  staticComponents: {
    Control: typeof TextInputControl;
  };
}>;
