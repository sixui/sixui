import type { IRadioGroupProps as $IRadioGroupProps, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { RadioGroup as $RadioGroup } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type IRadioGroupProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$IRadioGroupProps, 'value' | 'defaultValue'>;

type IRadioGroupStaticComponents = {
  Item: typeof $RadioGroup.Item;
  Card: typeof $RadioGroup.Card;
};

type IRadioGroup = (<TFieldValues extends FieldValues>(
  props: IRadioGroupProps<TFieldValues>,
) => React.JSX.Element) &
  IRadioGroupStaticComponents;

export const RadioGroup: IRadioGroup = <TFieldValues extends FieldValues>(
  props: IRadioGroupProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $IRadioGroupProps,
    Parameters<NonNullable<$IRadioGroupProps['onChange']>>
  >(props, {
    emptyValue: [],
  });

  return <$RadioGroup {...formFieldProps} />;
};

RadioGroup.Item = $RadioGroup.Item;
RadioGroup.Card = $RadioGroup.Card;
