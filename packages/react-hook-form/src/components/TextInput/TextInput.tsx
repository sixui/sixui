import type { ITextInputProps as $ITextInputProps, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { TextInput as $TextInput } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ITextInputProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$ITextInputProps, 'value' | 'defaultValue'>;

type ITextInput = <TFieldValues extends FieldValues>(
  props: ITextInputProps<TFieldValues>,
) => React.JSX.Element;

export const TextInput: ITextInput = <TFieldValues extends FieldValues>(
  props: ITextInputProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $ITextInputProps,
    Parameters<NonNullable<$ITextInputProps['onChange']>>
  >(props);

  return <$TextInput {...formFieldProps} />;
};
