import type { IOmit } from '@/helpers/types';
import type { ITextFieldProps } from '@/components/atoms/TextField';

type ITextAreaFieldInheritedProps = IOmit<
  ITextFieldProps<HTMLTextAreaElement>,
  // Props that are controlled by the component and should not be overridden.
  'inputRenderer' | 'forwardProps' | 'textArea' | 'resizable'
>;

export type ITextAreaFieldProps = ITextAreaFieldInheritedProps &
  Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof ITextAreaFieldInheritedProps
  >;
