import type { IOmit } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IFieldBaseOwnProps } from '../FieldBase';
import type { IBoxProps } from '../Box';
import type {
  textInputFieldTheme,
  ITextInputFieldThemeFactory,
} from './TextInputField.css';

export interface ITextInputFieldOwnProps extends IFieldBaseOwnProps {
  /**
   * The `<input />` type to use, defaults to "text". The type greatly changes
   * how the text field behaves.
   *
   * This component supports a limited number of `<input />` types:
   *
   * - text
   * - textarea
   * - email
   * - number
   * - password
   * - search
   * - tel
   * - url
   *
   * See
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
   * for more details on each input type.
   *
   * @defaultValue 'text'
   */
  type?: string;

  /**
   * When true, hide the spinner for `type="number"` input fields.
   */
  noSpinner?: boolean;

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

  inputRef?: React.Ref<HTMLInputElement>;
}

export interface ITextInputFieldProps
  extends IOmit<IBoxProps, 'children'>,
    IComponentThemeProps<ITextInputFieldThemeFactory>,
    ITextInputFieldOwnProps {}

export type ITextInputFieldFactory = IPolymorphicComponentFactory<{
  props: ITextInputFieldProps;
  defaultRef: HTMLInputElement;
  defaultRoot: 'input';
  theme: typeof textInputFieldTheme;
}>;
