import type { IAny } from '@sixui/core';
import type {
  FieldError,
  FieldValues,
  UseControllerProps,
  UseControllerReturn,
} from 'react-hook-form';
import { useController } from 'react-hook-form';

import type { IUnknownParamters } from '~/utils/types';

export interface IFormFieldProps<
  TChangeEventValue extends IUnknownParamters = [string],
> {
  name?: string;
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
  IFormFieldProps<TChangeEventValue>;

export type IUseFormFieldOptions = {
  emptyValue?: IAny;
  checkable?: true;
  supportsErrorProps?: boolean;
};

const defaultOptions = {
  emptyValue: '',
  supportsErrorProps: true,
};

export const useFormField = <
  TFieldValues extends FieldValues,
  TComponentProps extends object,
  TChangeEventValue extends IUnknownParamters = [string],
>(
  props: TComponentProps & IUseFormFieldProps<TChangeEventValue, TFieldValues>,
  optionsProp?: IUseFormFieldOptions,
): TComponentProps & UseControllerReturn<TFieldValues> => {
  const {
    name,
    control,
    defaultValue,
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
    defaultValue,
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
    required,
    ...(options.supportsErrorProps
      ? {
          hasError,
          errorText,
        }
      : undefined),
    ...(options.checkable
      ? {
          checked: !!field.value,
        }
      : {
          value: field.value ?? options.emptyValue,
        }),
    ...other,
  } as unknown as TComponentProps & UseControllerReturn<TFieldValues>;
};
