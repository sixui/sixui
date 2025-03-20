import type { IRadioGroupFactory } from '@sixui/core';
import type { FieldValues } from 'react-hook-form';
import { RadioGroup as $RadioGroup } from '@sixui/core';

import type { IFormComponentPropsFactory } from '~/utils/types';
import { useFormField } from '~/hooks/useFormField';

export type IRadioGroupProps<TFieldValues extends FieldValues> =
  IFormComponentPropsFactory<
    IRadioGroupFactory,
    TFieldValues,
    'value' | 'defaultValue'
  >;

type IRadioGroup = (<TFieldValues extends FieldValues>(
  props: IRadioGroupProps<TFieldValues>,
) => React.JSX.Element) &
  IRadioGroupFactory['staticComponents'];

export const RadioGroup: IRadioGroup = <TFieldValues extends FieldValues>(
  props: IRadioGroupProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    IRadioGroupFactory['props'],
    Parameters<NonNullable<IRadioGroupFactory['props']['onChange']>>
  >(props, {
    emptyValue: [],
  });

  return <$RadioGroup {...formFieldProps} />;
};

RadioGroup.Item = $RadioGroup.Item;
RadioGroup.Card = $RadioGroup.Card;
