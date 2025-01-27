import { delay } from '@olivierpascal/helpers';
import { action } from '@storybook/addon-actions';

import type { IAny } from './types';

export const sbHandleEvent = <TArgs extends IAny>(
  name: string,
  args?: TArgs,
  delayInMs?: number,
): Promise<TArgs | undefined> => {
  if (!delayInMs) {
    return Promise.resolve(action(name)(args)).then(() => args);
  }

  const actionStartName = `${name}:start`;
  const actionEndName = `${name}:end`;
  action(actionStartName)([]);

  return delay(delayInMs).then(() => {
    action(actionEndName)(args);

    return args;
  });
};
