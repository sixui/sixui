import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  ITextAreaControlOwnProps,
  ITextAreaControlProps,
  TextAreaControl,
} from './TextAreaControl';
import {
  ITextAreaControlThemeFactory,
  textAreaControlTheme,
} from './TextAreaControl/TextAreaControl.css';

export interface ITextAreaOwnProps
  extends ITextAreaControlOwnProps,
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
  controlProps?: ITextAreaControlProps;
}

export interface ITextAreaProps
  extends IBoxProps,
    IComponentThemeProps<ITextAreaControlThemeFactory>,
    ITextAreaOwnProps {}

export type ITextAreaFactory = IComponentFactory<{
  props: ITextAreaProps;
  ref: HTMLTextAreaElement;
  theme: typeof textAreaControlTheme;
  staticComponents: {
    Control: typeof TextAreaControl;
  };
}>;
