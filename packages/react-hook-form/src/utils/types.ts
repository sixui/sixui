import type { IComponentFactoryPayload, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';

export type IUnknownParamters = Array<unknown>;

export type IFormComponentPropsFactory<
  TComponentFactoryPayload extends IComponentFactoryPayload,
  TFieldValues extends FieldValues,
  TPropsToOmit extends string = never,
> = UseControllerProps<TFieldValues> &
  IOmit<TComponentFactoryPayload['props'], TPropsToOmit> & {
    ref?: React.Ref<TComponentFactoryPayload['ref']>;
  };
