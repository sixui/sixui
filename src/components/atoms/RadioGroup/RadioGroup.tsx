import stylex from '@stylexjs/stylex';
import { useImperativeHandle, useMemo, useRef, forwardRef } from 'react';

import type { IContainerProps, IOmit } from '@/helpers/types';
import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import { useForkRef } from '@/hooks/useForkRef';
import { useId } from '@/hooks/useId';
import { useControlledValue } from '@/hooks/useControlledValue';
import {
  RadioGroupContext,
  type IRadioGroupContextValue,
} from './RadioGroupContext';

// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/RadioGroup/RadioGroup.js
// https://github.com/mui/material-ui/blob/master/packages/mui-material/src/RadioGroup/RadioGroup.d.ts

const DEFAULT_TAG = 'div';

export type IRadioGroupOwnProps = IOmit<IContainerProps, 'styles'> &
  IRadioGroupContextValue & {
    actions?: React.RefObject<unknown>;
    children?: React.ReactNode;
    defaultValue?: string;
  };

export type IRadioGroupProps<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IRadioGroupOwnProps>;

type IRadioGroup = <TRoot extends React.ElementType = typeof DEFAULT_TAG>(
  props: IRadioGroupProps<TRoot>,
) => React.ReactNode;

export const RadioGroup: IRadioGroup = forwardRef(function RadioGroup<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IRadioGroupProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
  const {
    as,
    sx,
    actions,
    children,
    onChange,
    value: valueProp,
    defaultValue,
    name: nameProp,
    disabled,
    'data-cy': dataCy = 'radioGroup',
    ...other
  } = props as IWithAsProp<IRadioGroupOwnProps>;

  const hostRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useControlledValue({
    controlled: valueProp,
    default: defaultValue,
    name: 'RadioGroup',
  });

  useImperativeHandle(
    actions,
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

  const handleRef = useForkRef(ref, hostRef);
  const name = useId(nameProp);

  const contextValue = useMemo(
    () =>
      ({
        name,
        onChange(event, value: string | undefined) {
          setValue(value);
          onChange?.(event, value);
        },
        value,
        disabled,
      }) satisfies IRadioGroupContextValue,
    [name, onChange, value, setValue, disabled],
  );

  const Component = as ?? DEFAULT_TAG;

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <Component
        {...stylex.props(sx)}
        sx={sx}
        ref={handleRef}
        role='radiogroup'
        data-cy={dataCy}
        {...other}
      >
        {children}
      </Component>
    </RadioGroupContext.Provider>
  );
});
