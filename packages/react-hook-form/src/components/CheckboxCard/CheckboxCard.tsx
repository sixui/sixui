import type { ICheckboxCardFactory, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { CheckboxCard as $CheckboxCard } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ICheckboxCardProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<ICheckboxCardFactory['props'], 'checked' | 'defaultChecked'> & {
      ref?: ICheckboxCardFactory['ref'];
    };

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
