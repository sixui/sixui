import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps, IElementProps } from '../Box';
import type { IFieldBaseOwnProps } from '../FieldBase';
import type {
  ITextAreaFieldThemeFactory,
  textAreaFieldTheme,
} from './TextAreaField.css';

export interface ITextAreaFieldOwnProps
  extends IFieldBaseOwnProps,
    IElementProps<'textarea', 'className' | 'children'> {
  textAreaRef?: React.Ref<HTMLTextAreaElement>;

  /**
   * When true, a clear icon button will appear on the right side of the input.
   */
  clearable?: boolean;

  /**
   * The icon of the clear icon button.
   */
  clearIcon?: React.ReactNode;

  children?: React.ReactNode;
}

export interface ITextAreaFieldProps
  extends IBoxProps,
    IComponentThemeProps<ITextAreaFieldThemeFactory>,
    ITextAreaFieldOwnProps {}

export type ITextAreaFieldFactory = IComponentFactory<{
  props: ITextAreaFieldProps;
  ref: HTMLTextAreaElement;
  theme: typeof textAreaFieldTheme;
}>;
