import type { ICheckboxFactory } from '@sixui/core';
import type { FieldValues } from 'react-hook-form';
import { Checkbox as $Checkbox } from '@sixui/core';

import type { IFormComponentPropsFactory } from '~/utils/types';
import { useFormField } from '~/hooks/useFormField';

export type ICheckboxProps<TFieldValues extends FieldValues> =
  IFormComponentPropsFactory<
    ICheckboxFactory,
    TFieldValues,
    'checked' | 'defaultChecked'
  >;

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
