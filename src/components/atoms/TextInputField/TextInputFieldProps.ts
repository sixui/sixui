import type { IOmit } from '@/helpers/types';
import type { ITextFieldProps } from '@/components/atoms/TextField';

/**
 * Input types that are compatible with the component.
 */
export type ITextFieldType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url'
  | 'textarea';

/**
 * Input types that are not fully supported for the component.
 */
export type ITextFieldUnsupportedType =
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'file'
  | 'month'
  | 'time'
  | 'week';

/**
 * Input types that are incompatible with the component.
 */
export type IInvalidTextFieldInvalidType =
  | 'button'
  | 'checkbox'
  | 'hidden'
  | 'image'
  | 'radio'
  | 'range'
  | 'reset'
  | 'submit';

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
  type?: ITextFieldType | ITextFieldUnsupportedType;

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
  'forwardHtmlPropsToChildren' | 'textArea' | 'resizable'
>;

export type ITextInputFieldProps = ITextInputFieldInheritedProps &
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    keyof (ITextInputFieldInheritedProps | ITextInputFieldOwnProps)
  > &
  ITextInputFieldOwnProps;
