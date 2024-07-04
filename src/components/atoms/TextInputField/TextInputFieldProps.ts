import type { IOmit } from '@/helpers/types';
import type { ITextFieldProps } from '@/components/atoms/TextField';

export type ITextInputFieldOwnProps = {
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
   * An optional prefix to display before the input value.
   */
  prefixText?: string;

  /**
   * An optional suffix to display after the input value.
   */
  suffixText?: string;

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
};

type ITextInputFieldInheritedProps = IOmit<
  ITextFieldProps<HTMLInputElement>,
  // Props that are controlled by the component and should not be overridden.
  'inputRenderer' | 'forwardProps' | 'textArea' | 'resizable'
>;

export type ITextInputFieldProps = ITextInputFieldInheritedProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    keyof (ITextInputFieldInheritedProps | ITextInputFieldOwnProps)
  > &
  ITextInputFieldOwnProps;
