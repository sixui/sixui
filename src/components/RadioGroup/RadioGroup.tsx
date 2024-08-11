import stylex from '@stylexjs/stylex';
import { useImperativeHandle, useMemo, useRef, forwardRef } from 'react';
import { useMergeRefs } from '@floating-ui/react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '~/helpers/react/polymorphicComponentTypes';
import { useId } from '~/hooks/useId';
import { useControlledValue } from '~/hooks/useControlledValue';
import {
  RadioGroupContext,
  type IRadioGroupContextValue,
} from './RadioGroup.context';
import {
  RADIO_GROUP_DEFAULT_TAG,
  type IRadioGroupOwnProps,
  type IRadioGroupProps,
} from './RadioGroup.types';

// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/RadioGroup/RadioGroup.js
// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/RadioGroup/RadioGroup.d.ts

type IRadioGroup = <
  TRoot extends React.ElementType = typeof RADIO_GROUP_DEFAULT_TAG,
>(
  props: IRadioGroupProps<TRoot>,
) => React.ReactNode;

export const RadioGroup: IRadioGroup = forwardRef(function RadioGroup<
  TRoot extends React.ElementType = typeof RADIO_GROUP_DEFAULT_TAG,
>(props: IRadioGroupProps<TRoot>, forwardedRef?: IPolymorphicRef<TRoot>) {
  const {
    as,
    sx,
    children,
    onChange,
    value: valueProp,
    defaultValue,
    name: nameProp,
    ...other
  } = props as IWithAsProp<IRadioGroupOwnProps>;

  const hostRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useControlledValue({
    controlled: valueProp,
    default: defaultValue,
    name: 'RadioGroup',
  });

  useImperativeHandle(
    forwardedRef,
    () => ({
      focus: () => {
        const input =
          hostRef.current?.querySelector('input:not(:disabled):checked') ??
          hostRef.current?.querySelector('input:not(:disabled)') ??
          undefined;

        if (input) {
          (input as HTMLInputElement).focus();
        }
      },
    }),
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

  const Component = as ?? RADIO_GROUP_DEFAULT_TAG;

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <Component
        sx={sx}
        role='radiogroup'
        data-cy='radioGroup'
        {...other}
        {...stylex.props(sx)}
        ref={handleRef}
      >
        {children}
      </Component>
    </RadioGroupContext.Provider>
  );
});
