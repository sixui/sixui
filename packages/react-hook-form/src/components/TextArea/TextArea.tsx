import type { ITextAreaFactory } from '@sixui/core';
import type { FieldValues } from 'react-hook-form';
import { TextArea as $TextArea } from '@sixui/core';

import type { IFormComponentPropsFactory } from '~/utils/types';
import { useFormField } from '~/hooks/useFormField';

export type ITextAreaProps<TFieldValues extends FieldValues> =
  IFormComponentPropsFactory<
    ITextAreaFactory,
    TFieldValues,
    'value' | 'defaultValue'
  >;

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
