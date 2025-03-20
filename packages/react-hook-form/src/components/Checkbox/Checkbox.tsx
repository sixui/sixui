import type { ICheckboxFactory, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { Checkbox as $Checkbox } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ICheckboxProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<ICheckboxFactory['props'], 'checked' | 'defaultChecked'> & {
      ref?: ICheckboxFactory['ref'];
    };

type ICheckbox = (<TFieldValues extends FieldValues>(
  props: ICheckboxProps<TFieldValues>,
) => React.JSX.Element) &
  ICheckboxFactory['staticComponents'];

export const Checkbox: ICheckbox = <TFieldValues extends FieldValues>(
  props: ICheckboxProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    ICheckboxFactory['props'],
    Parameters<NonNullable<ICheckboxFactory['props']['onChange']>>
  >(props, {
    checkable: true,
  });

  return <$Checkbox {...formFieldProps} />;
};

Checkbox.Control = $Checkbox.Control;
Checkbox.Indicator = $Checkbox.Indicator;
