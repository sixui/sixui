import signale from 'signale';

export const createLogger = (scope: string): signale.Signale =>
  // eslint-disable-next-line import-x/no-named-as-default-member
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
