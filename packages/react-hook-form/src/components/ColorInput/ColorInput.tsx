import type { IColorInputProps as $IColorInputProps, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { ColorInput as $ColorInput } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type IColorInputProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$IColorInputProps, 'value' | 'defaultValue'>;

type IColorInput = <TFieldValues extends FieldValues>(
  props: IColorInputProps<TFieldValues>,
) => React.JSX.Element;

export const ColorInput: IColorInput = <TFieldValues extends FieldValues>(
  props: IColorInputProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $IColorInputProps,
    Parameters<NonNullable<$IColorInputProps['onChange']>>
  >(props);

  return <$ColorInput {...formFieldProps} />;
};
