import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { ITextAreaThemeFactory, textAreaTheme } from './TextArea.css';
import type {
  ITextAreaControlOwnProps,
  ITextAreaControlProps,
  TextAreaControl,
} from './TextAreaControl';

export interface ITextAreaOwnProps
  extends ITextAreaControlOwnProps,
    Pick<
      ILabeledOwnProps,
      | 'label'
      | 'supportingText'
      | 'withRequiredSign'
      | 'requiredSign'
      | 'hasError'
      | 'errorText'
      | 'loading'
      | 'readOnlyOnLoading'
    > {
  labeledProps?: ILabeledProps;
  controlProps?: ITextAreaControlProps;
}

export interface ITextAreaProps
  extends IBoxProps,
    IComponentThemeProps<ITextAreaThemeFactory>,
    ITextAreaOwnProps {}

export type ITextAreaFactory = IComponentFactory<{
  props: ITextAreaProps;
  ref: HTMLTextAreaElement;
  theme: typeof textAreaTheme;
  staticComponents: {
    Control: typeof TextAreaControl;
  };
}>;
