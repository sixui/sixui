import signale from 'signale';

export const createLogger = (scope: string): signale.Signale =>
  new signale.Signale({
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
