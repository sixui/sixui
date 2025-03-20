import type { ICheckboxCardFactory } from '@sixui/core';
import type { FieldValues } from 'react-hook-form';
import { CheckboxCard as $CheckboxCard } from '@sixui/core';

import type { IFormComponentPropsFactory } from '~/utils/types';
import { useFormField } from '~/hooks/useFormField';

export type ICheckboxCardProps<TFieldValues extends FieldValues> =
  IFormComponentPropsFactory<
    ICheckboxCardFactory,
    TFieldValues,
    'checked' | 'defaultChecked'
  >;

type ICheckboxCard = <TFieldValues extends FieldValues>(
  props: ICheckboxCardProps<TFieldValues>,
) => React.JSX.Element;

export const CheckboxCard: ICheckboxCard = <TFieldValues extends FieldValues>(
  props: ICheckboxCardProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    ICheckboxCardFactory['props'],
    Parameters<NonNullable<ICheckboxCardFactory['props']['onChange']>>
  >(props, {
    checkable: true,
  });

  return <$CheckboxCard {...formFieldProps} />;
};
