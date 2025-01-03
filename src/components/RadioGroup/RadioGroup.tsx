import {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { IRadioGroupContextValue } from './RadioGroup.context';
import type { IRadioGroupFactory } from './RadioGroup.types';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useId } from '~/hooks/useId';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { Box } from '../Box';
import { RadioGroupContextProvider } from './RadioGroup.context';

const COMPONENT_NAME = 'RadioGroup';

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
    const [nextValue, setNextValue] = useState(value);
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
        event: React.ChangeEvent<HTMLInputElement>,
        nextValue: React.InputHTMLAttributes<HTMLInputElement>['value'],
      ) => {
        if (handlingChange) {
          return;
        }

        setHandlingChange(true);
        setNextValue(nextValue);

        void executeLazyPromise(
          () => onChange?.(event, nextValue) as Promise<void>,
          setHandlingChange,
        ).finally(() => {
          {
            setValue(nextValue);
            setNextValue(undefined);
            setHandlingChange(false);
          }
        });
      },
      [handlingChange, onChange, setValue],
    );

    const contextValue = useMemo(() => {
      return {
        name,
        loading: handlingChange,
        onChange: handleChange,
        value,
        nextValue,
      } satisfies IRadioGroupContextValue;
    }, [name, handleChange, value, nextValue, handlingChange]);

    return (
      <RadioGroupContextProvider value={contextValue}>
        <Box role="radiogroup" ref={handleRef} {...other}>
          {children}
        </Box>
      </RadioGroupContextProvider>
    );
  },
);

RadioGroup.displayName = `@sixui/${COMPONENT_NAME}`;
