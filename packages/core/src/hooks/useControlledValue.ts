import { useCallback, useEffect, useRef, useState } from 'react';

import { isProduction } from '~/helpers/isProduction';

export type IUseControlledProps<TValue> = {
  /**
   * Holds the component value when it's controlled.
   */
  controlled: TValue | undefined;

  /**
   * The default value when uncontrolled.
   */
  default: TValue;

  /**
   * The component name displayed in warnings.
   */
  name: string;

  /**
   * The name of the state variable displayed in warnings.
   */
  state?: string;

  /**
   * Callback invoked when the component value changes, typically via user
   * interaction in uncontrolled mode.
   */
  onValueChange?: (value: TValue) => void;
};

type IUseControlledValue<TValue> = [
  TValue,
  (newValue: React.SetStateAction<TValue>) => void,
];

// https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/useControlled/useControlled.js
// https://github.com/mui/material-ui/blob/master/packages/mui-utils/src/useControlled/useControlled.d.ts
export const useControlledValue = <TValue>(
  props: IUseControlledProps<TValue>,
): IUseControlledValue<TValue> => {
  const { name, state = 'value', onValueChange, ...other } = props;
  const { current: isControlled } = useRef(other.controlled !== undefined);
  const [valueState, setValue] = useState(other.default);
  const value = other.controlled ?? valueState;

  if (!isProduction()) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (isControlled !== (other.controlled !== undefined)) {
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
    }, [isControlled, value, state, name, other.controlled]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { current: defaultValue } = useRef(other.default);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (
        !isControlled &&
        JSON.stringify(defaultValue) !== JSON.stringify(other.default)
      ) {
        // eslint-disable-next-line no-console
        console.error(
          [
            `sixui: A component is changing the default ${state} state of an uncontrolled ${name} from \`${JSON.stringify(defaultValue)}\` to \`${JSON.stringify(other.default)}\` after being initialized. ` +
              `To suppress this warning opt to use a controlled ${name}.`,
          ].join('\n'),
        );
      }
    }, [isControlled, state, name, defaultValue, other.default]);
  }

  const setValueIfUncontrolled = useCallback(
    (newValue: React.SetStateAction<TValue>) => {
      if (!isControlled) {
        setValue(newValue);
      }

      onValueChange?.(
        typeof newValue === 'function'
          ? (newValue as (prev: TValue) => TValue)(value)
          : newValue,
      );
    },
    [isControlled, onValueChange, value],
  );

  return [value, setValueIfUncontrolled];
};
