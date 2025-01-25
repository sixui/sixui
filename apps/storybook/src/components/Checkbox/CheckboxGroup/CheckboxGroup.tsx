import {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { ICheckboxGroupContextValue } from './CheckboxGroup.context';
import type { ICheckboxGroupFactory } from './CheckboxGroup.types';
import { Box } from '~/components/Box';
import { executeLazyPromise } from '~/helpers/executeLazyPromise';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { CheckboxGroupContextProvider } from './CheckboxGroup.context';

const COMPONENT_NAME = 'CheckboxGroup';

export const CheckboxGroup = polymorphicComponentFactory<ICheckboxGroupFactory>(
  (props, forwardedRef) => {
    const {
      children,
      onChange,
      values: valuesProp,
      defaultValues,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const hostRef = useRef<HTMLInputElement>(null);
    const [handlingChange, setHandlingChange] = useState(false);
    const [changingValues, setChangingValues] = useState<Array<string>>([]);
    const [values, setValues] = useControlledValue({
      controlled: valuesProp,
      default: defaultValues,
      name: COMPONENT_NAME,
    });
    const handleRef = useMergeRefs(hostRef, forwardedRef);

    useImperativeHandle(
      forwardedRef,
      () =>
        ({
          focus: () => {
            const input =
              hostRef.current?.querySelector(
                `[role="checkbox"]:not([data-disabled])`,
              ) ??
              hostRef.current?.querySelector(
                `input[type="checkbox"]:not(:disabled)`,
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
        nextValues: Array<string>,
      ) => {
        if (handlingChange) {
          return;
        }

        setChangingValues([event.target.value]);

        void executeLazyPromise(
          () => onChange?.(event, nextValues) as Promise<void>,
          setHandlingChange,
        ).finally(() => setValues(nextValues));
      },
      [handlingChange, onChange, setValues],
    );

    const contextValue = useMemo(
      () =>
        ({
          onChange: handleChange,
          defaultValues,
          values,
          loading: handlingChange,
          changingValues,
        }) satisfies ICheckboxGroupContextValue,
      [handleChange, handlingChange, values, defaultValues, changingValues],
    );

    return (
      <CheckboxGroupContextProvider value={contextValue}>
        <Box ref={handleRef} {...other}>
          {children}
        </Box>
      </CheckboxGroupContextProvider>
    );
  },
);

CheckboxGroup.displayName = `@sixui/${COMPONENT_NAME}`;
