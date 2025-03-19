import type { ITextAreaProps as $ITextAreaProps, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { TextArea as $TextArea } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ITextAreaProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$ITextAreaProps, 'value' | 'defaultValue'>;

type ITextArea = <TFieldValues extends FieldValues>(
  props: ITextAreaProps<TFieldValues>,
) => React.JSX.Element;

export const TextArea: ITextArea = <TFieldValues extends FieldValues>(
  props: ITextAreaProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $ITextAreaProps,
    Parameters<NonNullable<$ITextAreaProps['onChange']>>
  >(props);

  return <$TextArea {...formFieldProps} />;
};
