import type { IOmit } from '@/helpers/types';
import type { ITextFieldBaseProps } from '@/components/TextFieldBase';

type ITextAreaFieldInheritedProps = IOmit<
  ITextFieldBaseProps<HTMLTextAreaElement>,
  // Props that are controlled by the component and should not be overridden.
  'inputRenderer' | 'forwardProps' | 'textArea' | 'resizable'
>;

export type ITextAreaFieldProps = ITextAreaFieldInheritedProps &
  Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof ITextAreaFieldInheritedProps
  >;
