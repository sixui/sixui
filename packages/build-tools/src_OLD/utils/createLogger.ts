import { Signale } from 'signale';

export const createLogger = (scope: string): Signale =>
  new Signale({
    scope,
    types: {
      success: {
        badge: '✔',
        color: 'green',
        label: '',
      },
      error: {
        badge: '✖',
        color: 'red',
        label: '',
      },
    },
  });
