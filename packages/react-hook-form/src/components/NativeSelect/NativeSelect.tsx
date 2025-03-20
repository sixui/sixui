import type { INativeSelectFactory, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { NativeSelect as $NativeSelect } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type INativeSelectProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<INativeSelectFactory['props'], 'value' | 'defaultValue'> & {
      ref?: INativeSelectFactory['ref'];
    };

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
