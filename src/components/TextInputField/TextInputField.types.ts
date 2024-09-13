import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IFieldBaseOwnProps } from '../FieldBase';
import type { IBoxProps, IElementProps } from '../Box';
import type {
  textInputFieldTheme,
  ITextInputFieldThemeFactory,
} from './TextInputField.css';
import type { IControlledValueProps } from '~/hooks/useControlledValue';

export interface ITextInputFieldOwnProps
  extends IFieldBaseOwnProps,
    IControlledValueProps<string | number | ReadonlyArray<string>>,
    IElementProps<'input', 'className' | 'children'> {
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

  /**
   * When true, a clear icon button will appear on the right side of the input.
   */
  clearable?: boolean;

  /**
   * The icon of the clear icon button.
   */
  clearIcon?: React.ReactNode;
}

export interface ITextInputFieldProps
  extends IOmit<IBoxProps, 'children'>,
    IComponentThemeProps<ITextInputFieldThemeFactory>,
    ITextInputFieldOwnProps {}

export type ITextInputFieldFactory = IComponentFactory<{
  props: ITextInputFieldProps;
  ref: HTMLInputElement;
  theme: typeof textInputFieldTheme;
}>;
