import {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { IRadioGroupContextValue } from './RadioGroup.context';
import type { IRadioGroupFactory } from './RadioGroup.types';
import { Box } from '~/components/Box';
import { useProps } from '~/components/Theme';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useId } from '~/hooks/useId';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { executeLazyPromise } from '~/utils/executeLazyPromise';
import { COMPONENT_NAME } from './RadioGroup.constants';
import { RadioGroupContextProvider } from './RadioGroup.context';

export const RadioGroup = polymorphicComponentFactory<IRadioGroupFactory>(
  (props, forwardedRef) => {
    const {
      children,
      onChange,
      value: valueProp,
      defaultValue,
      name: nameProp,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const hostRef = useRef<HTMLInputElement>(null);
    const [handlingChange, setHandlingChange] = useState(false);
    const [value, setValue] = useControlledValue({
      controlled: valueProp,
      default: defaultValue,
      name: COMPONENT_NAME,
    });
    const [changingValue, setChangingValue] = useState<string>();
    const name = useId(nameProp);
    const handleRef = useMergeRefs(hostRef, forwardedRef);

    useImperativeHandle(
      forwardedRef,
      () =>
        ({
          focus: () => {
            const input =
              hostRef.current?.querySelector(
                `[role="radio"][data-checked]:not([data-disabled])`,
              ) ??
              hostRef.current?.querySelector(
                `input[type="radio"]:not(:disabled):checked`,
              ) ??
              hostRef.current?.querySelector(
                `[role="radio"]:not([data-disabled])`,
              ) ??
              hostRef.current?.querySelector(
                `input[type="radio"]:not(:disabled)`,
              ) ??
              undefined;

            if (input) {
              (input as HTMLInputElement).focus();
            }
          },
        }) as HTMLDivElement,
      [],
    );

    const handleChange = useCallback(
      (
        nextValue: string | undefined,
        event: React.ChangeEvent<HTMLInputElement>,
      ) => {
        if (handlingChange) {
          return;
        }

        setChangingValue(value);

        void executeLazyPromise(
          () => onChange?.(nextValue, event) as Promise<void>,
          setHandlingChange,
        ).finally(() => {
          setValue(nextValue);
        });
      },
      [handlingChange, onChange, setValue, value],
    );

    const contextValue = useMemo(
      () =>
        ({
          name,
          loading: handlingChange,
          onChange: handleChange,
          value,
          changingValue,
        }) satisfies IRadioGroupContextValue,
      [name, handleChange, value, changingValue, handlingChange],
    );

    return (
      <RadioGroupContextProvider value={contextValue}>
        <Box role="radiogroup" ref={handleRef} {...other}>
          {children}
        </Box>
      </RadioGroupContextProvider>
    );
  },
);

RadioGroup.displayName = `@sixui/core/${COMPONENT_NAME}`;
