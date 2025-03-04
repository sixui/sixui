import { useCallback, useState } from 'react';

import type { IMaybeAsync } from '~/utils/types';
import { useLabeledContext } from '~/components/Labeled/Labeled.context';
import { useRadioGroupContext } from '~/components/Radio/RadioGroup/RadioGroup.context';
import { executeLazyPromise } from '~/utils/executeLazyPromise';

export interface IUseRadioProps {
  checked?: boolean;
  value?: string;
  onChange?: (value: string | undefined) => IMaybeAsync<unknown>;
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
    (radioGroupContext?.loading &&
      radioGroupContext.changingValue === props.value);
  const readOnly =
    props.readOnly ||
    labeledContext?.readOnly ||
    radioGroupContext?.loading ||
    loading;
  const disabled = props.disabled || labeledContext?.disabled;
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
        await props.onChange?.(nextValue);
        await radioGroupContext?.onChange?.(nextValue);
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
