import type { IOmit, ISwitchFactory } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { Switch as $Switch } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ISwitchProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<ISwitchFactory['props'], 'checked' | 'defaultChecked'> & {
      ref?: ISwitchFactory['ref'];
    };

type ISwitch = (<TFieldValues extends FieldValues>(
  props: ISwitchProps<TFieldValues>,
) => React.JSX.Element) &
  ISwitchFactory['staticComponents'];

export const Switch: ISwitch = <TFieldValues extends FieldValues>(
  props: ISwitchProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    ISwitchFactory['props'],
    Parameters<NonNullable<ISwitchFactory['props']['onChange']>>
  >(props, {
    checkable: true,
  });

  return <$Switch {...formFieldProps} />;
};

Switch.Control = $Switch.Control;
Switch.Indicator = $Switch.Indicator;
