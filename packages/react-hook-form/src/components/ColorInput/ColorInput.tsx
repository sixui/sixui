import type { IColorInputFactory, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { ColorInput as $ColorInput } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type IColorInputProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<IColorInputFactory['props'], 'value' | 'defaultValue'> & {
      ref?: IColorInputFactory['ref'];
    };

type IColorInput = (<TFieldValues extends FieldValues>(
  props: IColorInputProps<TFieldValues>,
) => React.JSX.Element) &
  IColorInputFactory['staticComponents'];

export const ColorInput: IColorInput = <TFieldValues extends FieldValues>(
  props: IColorInputProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    IColorInputFactory['props'],
    Parameters<NonNullable<IColorInputFactory['props']['onChange']>>
  >(props);

  return <$ColorInput {...formFieldProps} />;
};

ColorInput.Control = $ColorInput.Control;
