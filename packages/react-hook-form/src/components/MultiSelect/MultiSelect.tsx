import type { IMultiSelectFactory, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { MultiSelect as $MultiSelect } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type IMultiSelectProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<IMultiSelectFactory['props'], 'value' | 'defaultValue'> & {
      ref?: IMultiSelectFactory['ref'];
    };

type IMultiSelect = (<TFieldValues extends FieldValues>(
  props: IMultiSelectProps<TFieldValues>,
) => React.JSX.Element) &
  IMultiSelectFactory['staticComponents'];

export const MultiSelect: IMultiSelect = <TFieldValues extends FieldValues>(
  props: IMultiSelectProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    IMultiSelectFactory['props'],
    Parameters<NonNullable<IMultiSelectFactory['props']['onChange']>>
  >(props, {
    emptyValue: [],
  });

  return <$MultiSelect {...formFieldProps} />;
};

MultiSelect.Control = $MultiSelect.Control;
