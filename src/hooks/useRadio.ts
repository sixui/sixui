import { useCallback, useState } from 'react';

import type { IAny, IMaybeAsync } from '~/helpers/types';
import { useLabeledContext } from '~/components/Labeled';
import { useRadioGroupContext } from '~/components/RadioGroup';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';

export interface IUseRadioProps {
  checked?: boolean;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string | undefined,
  ) => IMaybeAsync<IAny>;
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
}

export interface IUseRadioResult {
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  checked?: boolean;
  id?: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
}

export const useRadio = (props: IUseRadioProps): IUseRadioResult => {
  const labeledContext = useLabeledContext();
  const radioGroupContext = useRadioGroupContext();
  const [handlingChange, setHandlingChange] = useState(false);

  const loading =
    props.loading ||
    handlingChange ||
    labeledContext?.loading ||
    (radioGroupContext?.loading && radioGroupContext.nextValue === props.value);
  const readOnly =
    props.readOnly ||
    labeledContext?.readOnly ||
    radioGroupContext?.loading ||
    loading;
  const disabled =
    props.disabled || labeledContext?.disabled || radioGroupContext?.loading;
  const required = props.required ?? labeledContext?.required;
  const id = props.id ?? labeledContext?.id;
  const name = radioGroupContext?.name ?? props.name;
  const checked = !!(
    (radioGroupContext?.value !== undefined &&
      radioGroupContext.value === props.value) ||
    props.checked
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (handlingChange) {
        return;
      }

      const nextChecked = event.target.checked;
      const nextValue = nextChecked ? event.target.value : undefined;

      void executeLazyPromise(async () => {
        await props.onChange?.(event, nextValue);
        await radioGroupContext?.onChange?.(event, nextValue);
      }, setHandlingChange);
    },
    [props, handlingChange, radioGroupContext],
  );

  return {
    loading,
    disabled,
    readOnly,
    required,
    checked,
    id,
    handleChange,
    name,
  };
};
