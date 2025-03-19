import type { IRadioCardProps as $IRadioCardProps } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { RadioCard as $RadioCard } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type IRadioCardProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & $IRadioCardProps;

type IRadioCard = <TFieldValues extends FieldValues>(
  props: IRadioCardProps<TFieldValues>,
) => React.JSX.Element;

export const RadioCard: IRadioCard = <TFieldValues extends FieldValues>(
  props: IRadioCardProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $IRadioCardProps,
    Parameters<NonNullable<$IRadioCardProps['onChange']>>
  >(props, {
    checkable: true,
  });

  return <$RadioCard {...formFieldProps} />;
};
