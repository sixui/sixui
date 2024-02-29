import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';

import type { IAny } from '@/helpers/types';
import { useForkRef } from '@/hooks/useForkRef';
import { useId } from '@/hooks/useId';
import { useControlled } from '@/hooks/useControlled';
import {
  type IRadioGroupContext,
  RadioGroupContext,
} from './RadioGroupContext';

export type IRadioGroupProps = IRadioGroupContext & {
  actions?: React.RefObject<unknown>;
  children?: React.ReactNode;
  defaultValue?: string;
};

// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/RadioGroup/RadioGroup.js
// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/RadioGroup/RadioGroup.d.ts
export const RadioGroup = forwardRef(function RadioGroup(
  { actions, children, onChange, ...props }: IRadioGroupProps,
  ref: React.ForwardedRef<IAny> | null,
): React.ReactNode {
  const hostRef = useRef<HTMLElement>(null);
  const [value, setValue] = useControlled({
    controlled: props.value,
    default: props.defaultValue,
    name: 'RadioGroup',
  });

  useImperativeHandle(
    actions,
    () => ({
      focus: () => {
        let input = hostRef.current?.querySelector(
          'input:not(:disabled):checked',
        );

        if (!input) {
          input = hostRef.current?.querySelector('input:not(:disabled)');
        }

        if (input) {
          (input as HTMLInputElement).focus();
        }
      },
    }),
    [],
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleRef = useForkRef(ref, hostRef);
  const name = useId();

  const contextValue = useMemo(
    () =>
      ({
        name,
        onChange(value: string | undefined) {
          setValue(value);
          onChange?.(value);
        },
        value,
      }) satisfies IRadioGroupContext,
    [name, onChange, value, setValue],
  );

  return (
    <RadioGroupContext.Provider value={contextValue}>
      {/* TODO: <FormGroup ref={handleRef} role='radiogroup'> */}
      {children}
      {/* TODO: </FormGroup> */}
    </RadioGroupContext.Provider>
  );
});
