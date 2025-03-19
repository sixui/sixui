import type { ICheckboxProps as $ICheckboxProps, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { Checkbox as $Checkbox } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ICheckboxProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$ICheckboxProps, 'checked' | 'defaultChecked'>;

type ICheckbox = <TFieldValues extends FieldValues>(
  props: ICheckboxProps<TFieldValues>,
) => React.JSX.Element;

export const Checkbox: ICheckbox = <TFieldValues extends FieldValues>(
  props: ICheckboxProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $ICheckboxProps,
    Parameters<NonNullable<$ICheckboxProps['onChange']>>
  >(props, {
    checkable: true,
  });

  return <$Checkbox {...formFieldProps} />;
};
