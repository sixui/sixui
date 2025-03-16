import { useCallback, useState } from 'react';

import type { IMaybeAsync } from '~/utils/types';
import { useLabeledContext } from '~/components/Labeled/Labeled.context';
import { useRadioGroupControlContext } from '~/components/RadioGroup//RadioGroupControl/RadioGroupControl.context';
import { executeLazyPromise } from '~/utils/executeLazyPromise';

export interface IUseRadioProps {
  checked?: boolean;
  value?: string;
  onChange?: (
    checked: boolean,
    event?: React.ChangeEvent<HTMLInputElement>,
  ) => IMaybeAsync<unknown>;
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  hasError?: boolean;
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
  hasError?: boolean;
}

export const useRadio = (props: IUseRadioProps): IUseRadioResult => {
  const labeledContext = useLabeledContext();
  const radioGroupControlContext = useRadioGroupControlContext();
  const [handlingChange, setHandlingChange] = useState(false);

  const loading =
    props.loading ||
    handlingChange ||
    labeledContext?.loading ||
    (radioGroupControlContext?.loading &&
      radioGroupControlContext.changingValue === props.value);
  const readOnly =
    props.readOnly ||
    labeledContext?.readOnly ||
    radioGroupControlContext?.readOnly ||
    radioGroupControlContext?.loading ||
    loading;
  const disabled =
    props.disabled ||
    labeledContext?.disabled ||
    radioGroupControlContext?.disabled;
  const required = props.required ?? labeledContext?.required;
  const hasError =
    props.hasError ??
    radioGroupControlContext?.hasError ??
    labeledContext?.hasError;
  const id = props.id ?? labeledContext?.id;
  const name = radioGroupControlContext?.name ?? props.name;
  const checked = !!(
    (radioGroupControlContext?.value !== undefined &&
      radioGroupControlContext.value === props.value) ||
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
        await props.onChange?.(nextChecked, event);
        await radioGroupControlContext?.onChange?.(nextValue, event);
      }, setHandlingChange);
    },
    [props, handlingChange, radioGroupControlContext],
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
    hasError,
  };
};
