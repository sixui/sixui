import type { IOmit, ISelectFactory } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { Select as $Select } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ISelectProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<ISelectFactory['props'], 'value' | 'defaultValue'> & {
      ref?: ISelectFactory['ref'];
    };

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
