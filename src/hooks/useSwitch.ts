import { useCallback, useState } from 'react';

import type { IAny, IMaybeAsync } from '~/helpers/types';
import { useLabeledContext } from '~/components/Labeled';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useControlledValue } from './useControlledValue';

export interface IUseSwitchProps {
  componentName: string;
  checked?: boolean;
  defaultChecked?: boolean;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | undefined,
  ) => IMaybeAsync<IAny>;
  loading?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  alwaysOn?: boolean;
  id?: string;
}

export interface IUseSwitchResult {
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  checked?: boolean;
  isOn?: boolean;
  id?: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const useSwitch = (props: IUseSwitchProps): IUseSwitchResult => {
  const labeledContext = useLabeledContext();
  const [handlingChange, setHandlingChange] = useState(false);
  const [checked, setChecked] = useControlledValue({
    controlled: props.checked,
    default: !!props.defaultChecked,
    name: props.componentName,
  });

  const loading = props.loading || handlingChange || labeledContext?.loading;
  const readOnly = props.readOnly || loading || labeledContext?.readOnly;
  const disabled = props.disabled || labeledContext?.disabled;
  const required = props.required ?? labeledContext?.required;
  const id = props.id ?? labeledContext?.id;
  const isOn = checked || props.alwaysOn;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (handlingChange) {
        return;
      }

      void executeLazyPromise(
        () =>
          props.onChange?.(
            event,
            event.target.checked ? event.target.value : undefined,
          ) as void,
        setHandlingChange,
      ).finally(() => setChecked(!event.target.checked));
    },
    [props, handlingChange, setChecked],
  );

  return {
    loading,
    disabled,
    readOnly,
    required,
    checked,
    isOn,
    id,
    handleChange,
  };
};
