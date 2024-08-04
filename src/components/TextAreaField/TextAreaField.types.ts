import type { IOmit } from '~/helpers/types';
import type { ITextFieldBaseProps } from '../TextFieldBase';

export type ITextAreaFieldOwnProps = IOmit<
  ITextFieldBaseProps<HTMLTextAreaElement>,
  // Props that are controlled by the component and should not be overridden.
  'inputRenderer' | 'forwardProps' | 'textArea'
>;

export type ITextAreaFieldProps = Omit<
  React.ComponentPropsWithoutRef<'textarea'>,
  keyof ITextAreaFieldOwnProps
> &
  ITextAreaFieldOwnProps;
