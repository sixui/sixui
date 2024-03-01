import type { IAny } from './types';
import { action } from '@storybook/addon-actions';
import { delay } from '@olivierpascal/helpers';

export const sbHandleEvent = (
  name: string,
  args?: IAny,
  delayInMs?: number,
): Promise<void> => {
  if (!delayInMs) {
    return Promise.resolve(void action(name)(args));
  }

  const actionStartName = `${name}:start`;
  const actionEndName = `${name}:end`;
  action(actionStartName)([]);

  return delay(delayInMs).then(() => void action(actionEndName)(args));
};
