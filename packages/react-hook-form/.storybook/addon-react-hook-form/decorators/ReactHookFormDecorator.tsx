import type { Decorator } from '@storybook/react';
import { useEffect } from 'react';
import { Box } from '@sixui/core';
import { useChannel } from '@storybook/preview-api';
import { FormProvider, useForm } from 'react-hook-form';

import { EVENTS } from '../constants';

export interface IReactHookFormDecoratorContext {
  parameters: {
    form?: {
      defaultValues: Record<string, unknown>;
    };
    resolver?: unknown;
  };
  args: {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

export const ReactHookFormDecorator: Decorator = (Story, context) => {
  const { parameters, args } =
    context as unknown as IReactHookFormDecoratorContext;

  const defaultValues = {
    [args.name]: args[args.name],
    ...parameters.form?.defaultValues,
  };

  const methods = useForm({
    defaultValues,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: parameters.resolver as any,
  });

  const { handleSubmit, control } = methods;

  const emit = useChannel({
    [EVENTS.REQUEST]: () => {
      void handleSubmit(
        (values) => {
          emit(EVENTS.RESULT, values);
        },
        (errors) => {
          emit(EVENTS.ERROR, errors);
        },
      )();
    },
  });

  useEffect(() => {
    emit(EVENTS.RESULT, control._defaultValues);
  }, [control._defaultValues, emit]);

  emit(EVENTS.ERROR, control._formState.errors);
  emit(EVENTS.DIRTY, control._formState.dirtyFields);

  return (
    <Box mx="auto">
      <FormProvider {...methods}>
        <form id="react-hook-form">
          <Story />
        </form>
      </FormProvider>
    </Box>
  );
};
