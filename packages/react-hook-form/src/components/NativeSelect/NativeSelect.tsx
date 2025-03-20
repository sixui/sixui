import type { INativeSelectFactory } from '@sixui/core';
import type { FieldValues } from 'react-hook-form';
import { NativeSelect as $NativeSelect } from '@sixui/core';

import type { IFormComponentPropsFactory } from '~/utils/types';
import { useFormField } from '~/hooks/useFormField';

export type INativeSelectProps<TFieldValues extends FieldValues> =
  IFormComponentPropsFactory<
    INativeSelectFactory,
    TFieldValues,
    'value' | 'defaultValue'
  >;

type INativeSelect = (<TFieldValues extends FieldValues>(
  props: INativeSelectProps<TFieldValues>,
) => React.JSX.Element) &
  INativeSelectFactory['staticComponents'];

export const NativeSelect: INativeSelect = <TFieldValues extends FieldValues>(
  props: INativeSelectProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    INativeSelectFactory['props'],
    Parameters<NonNullable<INativeSelectFactory['props']['onChange']>>
  >(props);

  return <$NativeSelect {...formFieldProps} />;
};

NativeSelect.Control = $NativeSelect.Control;
