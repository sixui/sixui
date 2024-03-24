import { useCallback, useEffect, useRef, useState } from 'react';

import { isProduction } from '@/helpers/isProduction';

type IUseControlledProps<T> = {
  /**
   * Holds the component value when it's controlled.
   */
  controlled?: T;

  /**
   * The default value when uncontrolled.
   */
  default?: T;

  /**
   * The component name displayed in warnings.
   */
  name: string;

  /**
   * The name of the state variable displayed in warnings.
   */
  state?: string;

  // TODO: wait for a fix and delete this option.
  // See: https://github.com/tailwindlabs/headlessui/issues/3044
  noDefaultStateWarning?: boolean;
};

type IUseControlledValue<TValue> = [
  TValue | undefined,
  (newValue: React.SetStateAction<TValue | undefined>) => void,
];

// https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/useControlled/useControlled.js
// https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/useControlled/useControlled.d.ts
export const useControlled = <TValue>({
  name,
  state = 'value',
  noDefaultStateWarning,
  ...props
}: IUseControlledProps<TValue | undefined>): IUseControlledValue<TValue> => {
  const { current: isControlled } = useRef(props.controlled !== undefined);
  const [valueState, setValue] = useState(props.default);
  const value = isControlled ? props.controlled : valueState;

  if (!isProduction()) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (isControlled !== (props.controlled !== undefined)) {
        const controlledState = (isControlled: boolean): string =>
          isControlled ? 'controlled' : 'uncontrolled';
        const fromState = controlledState(isControlled);
        const toState = controlledState(!isControlled);

        // eslint-disable-next-line no-console
        console.error(
          [
            `sixui: A component is changing the ${fromState} ${state} state of ${name} to be ${toState}.`,
            'Elements should not switch from uncontrolled to controlled (or vice versa).',
            `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`,
            "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.",
            'More info: https://fb.me/react-controlled-components',
          ].join('\n'),
        );
      }
    }, [isControlled, value, state, name, props.controlled]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { current: defaultValue } = useRef(props.default);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (
        !noDefaultStateWarning &&
        !isControlled &&
        defaultValue !== props.default
      ) {
        // eslint-disable-next-line no-console
        console.error(
          [
            `sixui: A component is changing the default ${state} state of an uncontrolled ${name} from "${JSON.stringify(defaultValue)}" to "${JSON.stringify(props.default)}" after being initialized. ` +
              `To suppress this warning opt to use a controlled ${name}.`,
          ].join('\n'),
        );
      }
    }, [
      noDefaultStateWarning,
      isControlled,
      state,
      name,
      defaultValue,
      props.default,
    ]);
  }

  const setValueIfUncontrolled = useCallback(
    (newValue: React.SetStateAction<TValue | undefined>) => {
      if (!isControlled) {
        setValue(newValue);
      }
    },
    [isControlled],
  );

  return [value, setValueIfUncontrolled];
};
