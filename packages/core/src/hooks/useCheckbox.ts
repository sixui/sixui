import { useCallback, useState } from 'react';

import type { IMaybeAsync } from '~/utils/types';
import { useCheckboxGroupControlContext } from '~/components/CheckboxGroup/CheckboxGroupControl/CheckboxGroupControl.context';
import { useLabeledContext } from '~/components/Labeled/Labeled.context';
import { useControlledValue } from '~/hooks/useControlledValue';
import { executeLazyPromise } from '~/utils/executeLazyPromise';

export interface IUseCheckboxProps {
  componentName?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  defaultIndeterminate?: boolean;
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
  hasError?: boolean;
}

export interface IUseCheckboxResult {
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  checked?: boolean;
  indeterminate?: boolean;
  id?: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  hasError?: boolean;
}

export const useCheckbox = (props: IUseCheckboxProps): IUseCheckboxResult => {
  const labeledContext = useLabeledContext();
  const checkboxGroupControlContext = useCheckboxGroupControlContext();
  const [handlingChange, setHandlingChange] = useState(false);
  const [checkedValue, setCheckedValue] = useControlledValue({
    controlled: props.checked,
    default: !!props.defaultChecked,
    name: props.componentName ?? 'Checkbox',
  });
  const [indeterminate, setIndeterminate] = useControlledValue({
    controlled: props.indeterminate,
    default: !!props.defaultIndeterminate,
    name: props.componentName ?? 'Checkbox',
  });

  const loading =
    props.loading ||
    handlingChange ||
    labeledContext?.loading ||
    (checkboxGroupControlContext?.loading &&
      props.value !== undefined &&
      checkboxGroupControlContext.changingValues?.includes(props.value));
  const readOnly =
    props.readOnly ||
    labeledContext?.readOnly ||
    checkboxGroupControlContext?.readOnly ||
    checkboxGroupControlContext?.loading ||
    loading;
  const disabled =
    props.disabled ||
    labeledContext?.disabled ||
    checkboxGroupControlContext?.disabled;
  const required = props.required ?? labeledContext?.required;
  const hasError =
    props.hasError ??
    checkboxGroupControlContext?.hasError ??
    labeledContext?.hasError;
  const id = props.id ?? labeledContext?.id;
  const checked =
    ((props.value !== undefined &&
      checkboxGroupControlContext?.value?.includes(props.value)) ||
      checkedValue) &&
    !indeterminate;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (handlingChange) {
        return;
      }

      const nextChecked = event.target.checked;
      const nextValues = checkboxGroupControlContext
        ? [
            ...new Set(
              event.target.checked
                ? [
                    ...(checkboxGroupControlContext.value ?? []),
                    event.target.value,
                  ]
                : [
                    ...(checkboxGroupControlContext.value?.filter(
                      (value) => value !== event.target.value,
                    ) ?? []),
                  ],
            ),
          ]
        : [];

      void executeLazyPromise(async () => {
        await props.onChange?.(nextChecked, event);
        await checkboxGroupControlContext?.onChange?.(nextValues, event);
      }, setHandlingChange).finally(() => {
        if (!checkboxGroupControlContext) {
          setCheckedValue(nextChecked);
        }
        setIndeterminate(false);
      });
    },
    [
      props,
      handlingChange,
      setCheckedValue,
      setIndeterminate,
      checkboxGroupControlContext,
    ],
  );

  return {
    loading,
    disabled,
    readOnly,
    required,
    checked,
    indeterminate,
    id,
    handleChange,
    hasError,
  };
};
