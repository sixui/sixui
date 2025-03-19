import type { ISwitchProps as $ISwitchProps, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { Switch as $Switch } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ISwitchProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$ISwitchProps, 'checked' | 'defaultChecked'>;

type ISwitch = <TFieldValues extends FieldValues>(
  props: ISwitchProps<TFieldValues>,
) => React.JSX.Element;

export const Switch: ISwitch = <TFieldValues extends FieldValues>(
  props: ISwitchProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $ISwitchProps,
    Parameters<NonNullable<$ISwitchProps['onChange']>>
  >(props, {
    checkable: true,
  });

  return <$Switch {...formFieldProps} />;
};
