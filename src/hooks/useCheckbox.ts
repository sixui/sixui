import { useCallback, useState } from 'react';

import type { IAny, IMaybeAsync } from '~/helpers/types';
import { useCheckboxGroupContext } from '~/components/CheckboxGroup';
import { useLabeledContext } from '~/components/Labeled';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useControlledValue } from '~/hooks/useControlledValue';

export interface IUseCheckboxProps {
  componentName: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  defaultIndeterminate?: boolean;
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
}

export const useCheckbox = (props: IUseCheckboxProps): IUseCheckboxResult => {
  const labeledContext = useLabeledContext();
  const checkboxGroupContext = useCheckboxGroupContext();
  const [handlingChange, setHandlingChange] = useState(false);
  const [checkedValue, setCheckedValue] = useControlledValue({
    controlled: props.checked,
    default: !!props.defaultChecked,
    name: props.componentName,
  });
  const [indeterminate, setIndeterminate] = useControlledValue({
    controlled: props.indeterminate,
    default: !!props.defaultIndeterminate,
    name: props.componentName,
  });

  const loading =
    props.loading ||
    handlingChange ||
    labeledContext?.loading ||
    (checkboxGroupContext?.loading &&
      props.value !== undefined &&
      checkboxGroupContext.changingValues?.includes(props.value));
  const readOnly =
    props.readOnly ||
    labeledContext?.readOnly ||
    checkboxGroupContext?.loading ||
    loading;
  const disabled = props.disabled || labeledContext?.disabled;
  const required = props.required ?? labeledContext?.required;
  const id = props.id ?? labeledContext?.id;
  const checked =
    !!(
      (props.value !== undefined &&
        checkboxGroupContext?.values?.includes(props.value)) ||
      checkedValue
    ) && !indeterminate;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (handlingChange) {
        return;
      }

      const nextChecked = event.target.checked && !indeterminate;
      const nextValue = nextChecked ? event.target.value : undefined;
      const nextValues = checkboxGroupContext
        ? [
            ...new Set(
              event.target.checked
                ? [...(checkboxGroupContext.values ?? []), event.target.value]
                : [
                    ...(checkboxGroupContext.values?.filter(
                      (value) => value !== event.target.value,
                    ) ?? []),
                  ],
            ),
          ]
        : [];

      void executeLazyPromise(async () => {
        await props.onChange?.(event, nextValue);
        await checkboxGroupContext?.onChange?.(event, nextValues);
      }, setHandlingChange).finally(() => {
        if (!checkboxGroupContext) {
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
      checkboxGroupContext,
      indeterminate,
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
  };
};
