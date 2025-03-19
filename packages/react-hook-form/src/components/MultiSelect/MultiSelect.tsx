import type {
  IMultiSelectProps as $IMultiSelectProps,
  IOmit,
} from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { MultiSelect as $MultiSelect } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type IMultiSelectProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$IMultiSelectProps, 'value' | 'defaultValue'>;

type IMultiSelect = <TFieldValues extends FieldValues>(
  props: IMultiSelectProps<TFieldValues>,
) => React.JSX.Element;

export const MultiSelect: IMultiSelect = <TFieldValues extends FieldValues>(
  props: IMultiSelectProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $IMultiSelectProps,
    Parameters<NonNullable<$IMultiSelectProps['onChange']>>
  >(props, {
    emptyValue: [],
  });

  return <$MultiSelect {...formFieldProps} />;
};
