import type { ICheckboxGroupFactory } from '@sixui/core';
import type { FieldValues } from 'react-hook-form';
import { CheckboxGroup as $CheckboxGroup } from '@sixui/core';

import type { IFormComponentPropsFactory } from '~/utils/types';
import { useFormField } from '~/hooks/useFormField';

export type ICheckboxGroupProps<TFieldValues extends FieldValues> =
  IFormComponentPropsFactory<
    ICheckboxGroupFactory,
    TFieldValues,
    'value' | 'defaultValue'
  >;

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
