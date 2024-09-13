import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IFieldBaseOwnProps } from '../FieldBase';
import type { IBoxProps, IElementProps } from '../Box';
import type {
  textAreaFieldTheme,
  ITextAreaFieldThemeFactory,
} from './TextAreaField.css';
import type { IControlledValueProps } from '~/hooks/useControlledValue';

export interface ITextAreaFieldOwnProps
  extends IFieldBaseOwnProps,
    IControlledValueProps<string | number | ReadonlyArray<string>>,
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
}

export interface ITextAreaFieldProps
  extends IOmit<IBoxProps, 'children'>,
    IComponentThemeProps<ITextAreaFieldThemeFactory>,
    ITextAreaFieldOwnProps {}

export type ITextAreaFieldFactory = IComponentFactory<{
  props: ITextAreaFieldProps;
  ref: HTMLTextAreaElement;
  theme: typeof textAreaFieldTheme;
}>;
