import type { IAny } from './types';
import { action } from '@storybook/addon-actions';
import { delay } from '@olivierpascal/helpers';

export const sbHandleEvent = (
  name: string,
  args: IAny = undefined,
  delayInMs = 300,
): Promise<void> => {
  const actionStartName = `${name}:start`;
  const actionEndName = `${name}:end`;
  action(actionStartName)([]);

  return delayInMs > 0
    ? delay(delayInMs).then(() => void action(actionEndName)(args))
    : Promise.resolve(void action(actionEndName)(args));
};
