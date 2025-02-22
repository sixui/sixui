import type { IBoxProps } from '~/components/Box';
import type { IFieldBaseOwnProps } from '~/components/FieldBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IElementProps, IOmit } from '~/utils/types';
import type {
  ITextAreaFieldThemeFactory,
  textAreaFieldTheme,
} from './TextAreaField.css';

export interface ITextAreaFieldOwnProps
  extends IOmit<IFieldBaseOwnProps, 'children'>,
    IElementProps<'textarea', 'className'> {
  /**
   * When true, a clear icon button will appear on the right side of the input.
   */
  clearable?: boolean;

  /**
   * The icon of the clear icon button.
   */
  clearIcon?: React.ReactNode;

  rootRef?: React.Ref<HTMLDivElement>;

  value?: string;
  defaultValue?: string;
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
