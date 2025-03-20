import type { IOmit, IRadioGroupFactory } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { RadioGroup as $RadioGroup } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type IRadioGroupProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<IRadioGroupFactory['props'], 'value' | 'defaultValue'> & {
      ref?: IRadioGroupFactory['ref'];
    };

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
