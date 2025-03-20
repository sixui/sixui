import type { ICheckboxGroupFactory, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { CheckboxGroup as $CheckboxGroup } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ICheckboxGroupProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<ICheckboxGroupFactory['props'], 'value' | 'defaultValue'> & {
      ref?: ICheckboxGroupFactory['ref'];
    };

type ICheckboxGroup = (<TFieldValues extends FieldValues>(
  props: ICheckboxGroupProps<TFieldValues>,
) => React.JSX.Element) &
  ICheckboxGroupFactory['staticComponents'];

export const CheckboxGroup: ICheckboxGroup = <TFieldValues extends FieldValues>(
  props: ICheckboxGroupProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    ICheckboxGroupFactory['props'],
    Parameters<NonNullable<ICheckboxGroupFactory['props']['onChange']>>
  >(props, {
    emptyValue: [],
  });

  return <$CheckboxGroup {...formFieldProps} />;
};

CheckboxGroup.Item = $CheckboxGroup.Item;
CheckboxGroup.Card = $CheckboxGroup.Card;
