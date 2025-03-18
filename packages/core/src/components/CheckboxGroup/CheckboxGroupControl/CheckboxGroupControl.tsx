import {
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import type { ICheckboxGroupControlContextValue } from './CheckboxGroupControl.context';
import type { ICheckboxGroupControlFactory } from './CheckboxGroupControl.types';
import { Box } from '~/components/Box';
import { Checkbox } from '~/components/Checkbox';
import { CheckboxCard } from '~/components/CheckboxCard';
import { useProps } from '~/components/Theme';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useMergeRefs } from '~/hooks/useMergeRefs';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { executeLazyPromise } from '~/utils/executeLazyPromise';
import { COMPONENT_NAME } from './CheckboxGroupControl.constants';
import { CheckboxGroupControlContextProvider } from './CheckboxGroupControl.context';

export const CheckboxGroupControl =
  polymorphicComponentFactory<ICheckboxGroupControlFactory>(
    (props, forwardedRef) => {
      const {
        children,
        onChange,
        value: valueProp,
        defaultValue,
        disabled,
        readOnly,
        loading: loadingProp,
        hasError,
        ...other
      } = useProps({ componentName: COMPONENT_NAME, props });

      const hostRef = useRef<HTMLInputElement>(null);
      const [handlingChange, setHandlingChange] = useState(false);
      const [changingValues, setChangingValues] = useState<Array<string>>([]);
      const [value, setValue] = useControlledValue({
        controlled: valueProp,
        default: defaultValue,
        name: COMPONENT_NAME,
      });
      const handleRef = useMergeRefs(hostRef, forwardedRef);

      const loading = loadingProp || handlingChange;

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
          nextValue: Array<string>,
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          if (handlingChange) {
            return;
          }

          setChangingValues((prevChangingValues) => [
            ...prevChangingValues,
            event.target.value,
          ]);

          void executeLazyPromise(
            () => onChange?.(nextValue, event) as Promise<void>,
            setHandlingChange,
          ).finally(() => {
            setValue(nextValue);
            setChangingValues((prevChangingValues) =>
              prevChangingValues.filter(
                (value) => value !== event.target.value,
              ),
            );
          });
        },
        [handlingChange, onChange, setValue],
      );

      const contextValue = useMemo(
        () =>
          ({
            onChange: handleChange,
            defaultValue,
            value,
            loading,
            changingValues,
            disabled,
            readOnly,
            hasError,
          }) satisfies ICheckboxGroupControlContextValue,
        [
          handleChange,
          value,
          defaultValue,
          changingValues,
          loading,
          disabled,
          readOnly,
          hasError,
        ],
      );

      return (
        <CheckboxGroupControlContextProvider value={contextValue}>
          <Box ref={handleRef} {...other}>
            {children}
          </Box>
        </CheckboxGroupControlContextProvider>
      );
    },
  );

CheckboxGroupControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
CheckboxGroupControl.Item = Checkbox;
CheckboxGroupControl.Card = CheckboxCard;
