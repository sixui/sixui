import type { IAny } from '@sixui/core';
import type {
  FieldError,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { IUnknownParamters } from '~/utils/types';

export interface IFormFieldProps<TChangeEventValue extends IUnknownParamters> {
  onChange?: (...args: TChangeEventValue) => void;
  hasError?: boolean;
  errorText?: React.ReactNode;
  required?: boolean;
}

export type IUseFormFieldProps<
  TChangeEventValue extends IUnknownParamters,
  TFieldValues extends FieldValues,
> = IFormFieldProps<TChangeEventValue> &
  UseControllerProps<TFieldValues> & {
    getErrorText?: <TFieldValues extends FieldValues>(
      error: FieldError,
      rules?: UseControllerProps<TFieldValues>['rules'],
    ) => string | undefined;
  };

export type IUseFormFieldResult<TChangeEventValue extends IUnknownParamters> =
  IFormFieldProps<TChangeEventValue> & {
    value: IAny;
    onChange: (...args: TChangeEventValue) => void;
  };

export type IUseFormFieldOptions = {
  emptyValue?: IAny;
  checkable?: true;
};

const defaultOptions = {
  emptyValue: '',
};

export const useFormField = <
  TFieldValues extends FieldValues,
  TChangeEventValue extends IUnknownParamters = [string],
>(
  props: IUseFormFieldProps<TChangeEventValue, TFieldValues>,
  optionsProp?: IUseFormFieldOptions,
): IUseFormFieldResult<TChangeEventValue> => {
  const {
    name,
    control,
    defaultValue: defaultValueProp,
    rules: rulesProp,
    shouldUnregister,
    onChange,
    required: requiredProp,
    disabled,
    getErrorText,
    ...other
  } = props;

  const options = {
    ...defaultOptions,
    ...optionsProp,
  };

  const required = !!rulesProp?.required || requiredProp;
  const rules = {
    ...rulesProp,
    required,
  };

  const { field, fieldState } = useController<TFieldValues>({
    name,
    control,
    defaultValue: defaultValueProp,
    rules,
    shouldUnregister,
    disabled,
  });

  const errorText = fieldState.error
    ? (getErrorText?.(fieldState.error, rules) ?? fieldState.error.message)
    : undefined;
  const hasError = !!fieldState.error;

  return {
    ...field,
    onChange: (...args: TChangeEventValue) => {
      field.onChange(...args);
      onChange?.(...args);
    },
    hasError,
    errorText,
    required,
    ...(options.checkable
      ? {
          checked: !!field.value,
        }
      : {
          value: field.value ?? options.emptyValue,
        }),
    ...other,
  };
};
