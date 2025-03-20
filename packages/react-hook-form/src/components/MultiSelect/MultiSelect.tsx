import type { IMultiSelectFactory } from '@sixui/core';
import type { FieldValues } from 'react-hook-form';
import { MultiSelect as $MultiSelect } from '@sixui/core';

import type { IFormComponentPropsFactory } from '~/utils/types';
import { useFormField } from '~/hooks/useFormField';

export type IMultiSelectProps<TFieldValues extends FieldValues> =
  IFormComponentPropsFactory<
    IMultiSelectFactory,
    TFieldValues,
    'value' | 'defaultValue'
  >;

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
