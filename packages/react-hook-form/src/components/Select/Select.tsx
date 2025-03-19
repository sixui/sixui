import type { ISelectProps as $ISelectProps, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { Select as $Select } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ISelectProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$ISelectProps, 'value' | 'defaultValue'>;

type ISelect = <TFieldValues extends FieldValues>(
  props: ISelectProps<TFieldValues>,
) => React.JSX.Element;

export const Select: ISelect = <TFieldValues extends FieldValues>(
  props: ISelectProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $ISelectProps,
    Parameters<NonNullable<$ISelectProps['onChange']>>
  >(props);

  return <$Select {...formFieldProps} />;
};
