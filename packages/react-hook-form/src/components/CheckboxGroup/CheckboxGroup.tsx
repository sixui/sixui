import type {
  ICheckboxGroupProps as $ICheckboxGroupProps,
  IOmit,
} from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { CheckboxGroup as $CheckboxGroup } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ICheckboxGroupProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$ICheckboxGroupProps, 'value' | 'defaultValue'>;

type ICheckboxGroupStaticComponents = {
  Item: typeof $CheckboxGroup.Item;
  Card: typeof $CheckboxGroup.Card;
};

type ICheckboxGroup = (<TFieldValues extends FieldValues>(
  props: ICheckboxGroupProps<TFieldValues>,
) => React.JSX.Element) &
  ICheckboxGroupStaticComponents;

export const CheckboxGroup: ICheckboxGroup = <TFieldValues extends FieldValues>(
  props: ICheckboxGroupProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $ICheckboxGroupProps,
    Parameters<NonNullable<$ICheckboxGroupProps['onChange']>>
  >(props, {
    emptyValue: [],
  });

  return <$CheckboxGroup {...formFieldProps} />;
};

CheckboxGroup.Item = $CheckboxGroup.Item;
CheckboxGroup.Card = $CheckboxGroup.Card;
