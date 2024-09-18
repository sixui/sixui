import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type { IRadioGroupContextValue } from './RadioGroup.context';
import type { IRadioGroupProps } from './RadioGroup.types';
import { useControlledValue } from '~/hooks/useControlledValue';
import { useId } from '~/hooks/useId';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { Base } from '../Base';
import { RadioGroupContext } from './RadioGroup.context';

// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/RadioGroup/RadioGroup.js
// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/RadioGroup/RadioGroup.d.ts

export const RadioGroup = createPolymorphicComponent<'div', IRadioGroupProps>(
  forwardRef<HTMLDivElement, IRadioGroupProps>(
    function RadioGroup(props, forwardedRef) {
      const {
        sx,
        children,
        onChange,
        value: valueProp,
        defaultValue,
        name: nameProp,
        ...other
      } = props;

      const hostRef = useRef<HTMLInputElement>(null);
      const [value, setValue] = useControlledValue({
        controlled: valueProp,
        default: defaultValue,
        name: 'RadioGroup',
      });

      useImperativeHandle(
        forwardedRef,
        () =>
          ({
            focus: () => {
              const input =
                hostRef.current?.querySelector(
                  'input:not(:disabled):checked',
                ) ??
                hostRef.current?.querySelector('input:not(:disabled)') ??
                undefined;

              if (input) {
                (input as HTMLInputElement).focus();
              }
            },
          }) as HTMLDivElement,
        [],
      );

      const handleRef = useMergeRefs([forwardedRef, hostRef]);
      const name = useId(nameProp);

      const contextValue = useMemo(() => {
        return {
          name,
          onChange: (event, value) => {
            setValue(value);
            onChange?.(event, value);
          },
          value,
        } satisfies IRadioGroupContextValue;
      }, [name, onChange, value, setValue]);

      return (
        <RadioGroupContext.Provider value={contextValue}>
          <Base
            sx={sx}
            role="radiogroup"
            data-cy="radioGroup"
            {...other}
            ref={handleRef}
          >
            {children}
          </Base>
        </RadioGroupContext.Provider>
      );
    },
  ),
);
