import {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { IRadioGroupControlContextValue } from './RadioGroupControl.context';
import type { IRadioGroupControlFactory } from './RadioGroupControl.types';
import { Box } from '~/components/Box';
import { Radio } from '~/components/Radio';
import { RadioCard } from '~/components/RadioCard';
import { useProps } from '~/components/Theme';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useId } from '~/hooks/useId';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { executeLazyPromise } from '~/utils/executeLazyPromise';
import { COMPONENT_NAME } from './RadioGroupControl.constants';
import { RadioGroupControlContextProvider } from './RadioGroupControl.context';

export const RadioGroupControl =
  polymorphicComponentFactory<IRadioGroupControlFactory>(
    (props, forwardedRef) => {
      const {
        children,
        onChange,
        value: valueProp,
        defaultValue,
        name: nameProp,
        loading: loadingProp,
        hasError,
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

      const loading = loadingProp || handlingChange;

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
            loading,
            onChange: handleChange,
            value,
            changingValue,
            hasError,
          }) satisfies IRadioGroupControlContextValue,
        [name, handleChange, value, changingValue, loading, hasError],
      );

      return (
        <RadioGroupControlContextProvider value={contextValue}>
          <Box role="radiogroup" ref={handleRef} {...other}>
            {children}
          </Box>
        </RadioGroupControlContextProvider>
      );
    },
  );

RadioGroupControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
RadioGroupControl.Item = Radio;
RadioGroupControl.Card = RadioCard;
