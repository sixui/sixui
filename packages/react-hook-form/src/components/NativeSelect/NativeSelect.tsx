import type {
  INativeSelectProps as $INativeSelectProps,
  IOmit,
} from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { NativeSelect as $NativeSelect } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type INativeSelectProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$INativeSelectProps, 'value' | 'defaultValue'>;

type INativeSelect = <TFieldValues extends FieldValues>(
  props: INativeSelectProps<TFieldValues>,
) => React.JSX.Element;

export const NativeSelect: INativeSelect = <TFieldValues extends FieldValues>(
  props: INativeSelectProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $INativeSelectProps,
    Parameters<NonNullable<$INativeSelectProps['onChange']>>
  >(props);

  return <$NativeSelect {...formFieldProps} />;
};
