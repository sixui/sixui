import type {
  FieldError,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form';

import type {
  IFormFieldProps,
  IUseFormFieldOptions,
} from '~/hooks/useFormField';
import type { IUnknownParamters } from './types';
import { useFormField } from '~/hooks/useFormField';

export type IFormFieldFactoryProps<
  TComponentProps extends IFormFieldProps<TChangeEventValue>,
  TFieldValues extends FieldValues,
  TChangeEventValue extends Array<unknown> = Parameters<
    NonNullable<TComponentProps['onChange']>
  >,
> = TComponentProps &
  IFormFieldProps<TChangeEventValue> &
  UseControllerProps<TFieldValues> & {
    getErrorText?: <TFieldValues extends FieldValues>(
      error: FieldError,
      rules?: UseControllerProps<TFieldValues>['rules'],
    ) => string | undefined;
  };

export type IFormFieldFactoryOptions = IUseFormFieldOptions;

export const formFieldFactory = <
  TComponentProps extends IFormFieldProps<TChangeEventValue>,
  TChangeEventValue extends Array<unknown> = Parameters<
    NonNullable<TComponentProps['onChange']>
  >,
>(
  component: React.FC<TComponentProps>,
  options?: IFormFieldFactoryOptions,
) =>
  function SixuiReactHookFormField<TFieldValues extends FieldValues>(
    props: IFormFieldFactoryProps<
      Omit<TComponentProps, 'value' | 'defaultValue'>,
      TFieldValues
    >,
  ): React.ReactNode {
    const formFieldProps = useFormField<TFieldValues, TChangeEventValue>(
      props,
      options,
    );

    const Component = component as React.FC<IFormFieldProps<TChangeEventValue>>;

    return <Component {...formFieldProps} />;
  };

export const formCheckableFieldFactory = <
  TComponentProps extends IFormFieldProps<TChangeEventValue>,
  TChangeEventValue extends IUnknownParamters = Parameters<
    NonNullable<TComponentProps['onChange']>
  >,
>(
  component: React.FC<TComponentProps>,
  options?: IFormFieldFactoryOptions,
) =>
  function SixuiReactHookFormCheckableField<TFieldValues extends FieldValues>(
    props: IFormFieldFactoryProps<
      Omit<TComponentProps, 'checked' | 'defaultChecked'>,
      TFieldValues
    >,
  ): React.ReactNode {
    const formFieldProps = useFormField<TFieldValues, TChangeEventValue>(
      props,
      {
        ...options,
        checkable: true,
      },
    );

    const Component = component as React.FC<IFormFieldProps<TChangeEventValue>>;

    return <Component {...formFieldProps} />;
  };
