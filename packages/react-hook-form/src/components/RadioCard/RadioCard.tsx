import type { IRadioCardFactory } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { RadioCard as $RadioCard } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type IRadioCardProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IRadioCardFactory['props'] & {
      ref?: IRadioCardFactory['ref'];
    };

type IRadioCard = (<TFieldValues extends FieldValues>(
  props: IRadioCardProps<TFieldValues>,
) => React.JSX.Element) &
  IRadioCardFactory['staticComponents'];

export const RadioCard: IRadioCard = <TFieldValues extends FieldValues>(
  props: IRadioCardProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    IRadioCardFactory['props'],
    Parameters<NonNullable<IRadioCardFactory['props']['onChange']>>
  >(props, {
    checkable: true,
  });

  return <$RadioCard {...formFieldProps} />;
};

RadioCard.Indicator = $RadioCard.Indicator;
