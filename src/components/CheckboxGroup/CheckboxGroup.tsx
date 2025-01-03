import { useCallback, useImperativeHandle, useMemo, useRef } from 'react';

import type { ICheckboxGroupContextValue } from './CheckboxGroup.context';
import type { ICheckboxGroupFactory } from './CheckboxGroup.types';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { Box } from '../Box';
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
        nextValues: Array<React.InputHTMLAttributes<HTMLInputElement>['value']>,
      ) => {
        setValues(nextValues);

        onChange?.(event, nextValues);
      },
      [onChange, setValues],
    );

    const contextValue = useMemo(() => {
      return {
        onChange: handleChange,
        values,
      } satisfies ICheckboxGroupContextValue;
    }, [handleChange, values]);

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
