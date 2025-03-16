import { useRef, useState } from 'react';

import type { IRadioGroupControlProps } from '../RadioGroupControl.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { RadioGroupControl } from '../RadioGroupControl';

export interface IControlledRadioGroupControlDemoProps
  extends IRadioGroupControlProps {
  optionsRenderer: () => React.ReactNode;
}

export const ControlledRadioGroupControlDemo: React.FC<
  IControlledRadioGroupControlDemoProps
> = (props) => {
  const { optionsRenderer, onChange, ...other } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState('2');

  return (
    <Flex direction="row" gap="$xl" align="center">
      <RadioGroupControl
        {...other}
        as={Flex}
        direction="row"
        gap="$xl"
        value={value}
        onChange={async (value, event) => {
          await onChange?.(value, event);
          setValue(value ?? '');
        }}
        ref={ref}
      >
        {optionsRenderer()}
      </RadioGroupControl>

      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
    </Flex>
  );
};
