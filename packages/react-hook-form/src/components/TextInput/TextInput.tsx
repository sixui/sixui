import type { IOmit, ITextInputFactory } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInput as $TextInput } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ITextInputProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<ITextInputFactory['props'], 'value' | 'defaultValue'> & {
      ref?: ITextInputFactory['ref'];
    };

type ITextInput = (<TFieldValues extends FieldValues>(
  props: ITextInputProps<TFieldValues>,
) => React.JSX.Element) &
  ITextInputFactory['staticComponents'];

export const TextInput: ITextInput = <TFieldValues extends FieldValues>(
  props: ITextInputProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    ITextInputFactory['props'],
    Parameters<NonNullable<ITextInputFactory['props']['onChange']>>
  >(props);

  return <$TextInput {...formFieldProps} />;
};

TextInput.Control = $TextInput.Control;
