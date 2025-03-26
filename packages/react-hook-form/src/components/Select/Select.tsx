import type { ISelectFactory } from '@sixui/core';
import type { FieldValues } from 'react-hook-form';
import { Select as $Select } from '@sixui/core';

import type { IFormComponentPropsFactory } from '~/utils/types';
import { useFormField } from '~/hooks/useFormField';

export type ISelectProps<TFieldValues extends FieldValues> =
  IFormComponentPropsFactory<
    ISelectFactory,
    TFieldValues,
    'value' | 'defaultValue'
  >;

type ISelect = (<TFieldValues extends FieldValues>(
  props: ISelectProps<TFieldValues>,
) => React.JSX.Element) &
  ISelectFactory['staticComponents'];

export const Select: ISelect = <TFieldValues extends FieldValues>(
  props: ISelectProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    ISelectFactory['props'],
    Parameters<NonNullable<ISelectFactory['props']['onChange']>>
  >(props);

  return <$Select {...formFieldProps} />;
};

Select.Control = $Select.Control;
Select.Skeleton = $Select.Skeleton;
