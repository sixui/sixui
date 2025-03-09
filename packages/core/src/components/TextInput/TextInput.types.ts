import type { IBoxProps } from '~/components/Box';
import type { IFieldBaseOwnProps } from '~/components/FieldBase';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IElementProps, IOmit } from '~/utils/types';
import type {
  ITextInputThemeFactory,
  textInputFieldTheme,
} from './TextInput.css';

export interface ITextInputOwnProps
  extends IOmit<IFieldBaseOwnProps, 'children'>,
    IElementProps<'input', 'className'> {
  /**
   * When true, the password field can be unmasked for `type="passord"` input
   * fields.
   *
   * @defaultValue true
   */
  unmaskable?: boolean;

  /**
   * An optional icon to mask the password for `type="passord"` input
   * fields.
   */
  maskIcon?: React.ReactNode;

  /**
   * An optional icon to unmask the password for `type="passord"` input
   * fields.
   */
  unmaskIcon?: React.ReactNode;

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

export interface ITextInputProps
  extends IBoxProps,
    IComponentThemeProps<ITextInputThemeFactory>,
    ITextInputOwnProps {}

export type ITextInputFactory = IComponentFactory<{
  props: ITextInputProps;
  ref: HTMLInputElement;
  theme: typeof textInputFieldTheme;
}>;
