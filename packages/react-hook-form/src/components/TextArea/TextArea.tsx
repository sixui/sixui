import type { IOmit, ITextAreaFactory } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { TextArea as $TextArea } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ITextAreaProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<ITextAreaFactory['props'], 'value' | 'defaultValue'> & {
      ref?: ITextAreaFactory['ref'];
    };

type ITextArea = (<TFieldValues extends FieldValues>(
  props: ITextAreaProps<TFieldValues>,
) => React.JSX.Element) &
  ITextAreaFactory['staticComponents'];

export const TextArea: ITextArea = <TFieldValues extends FieldValues>(
  props: ITextAreaProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    ITextAreaFactory['props'],
    Parameters<NonNullable<ITextAreaFactory['props']['onChange']>>
  >(props);

  return <$TextArea {...formFieldProps} />;
};

TextArea.Control = $TextArea.Control;
