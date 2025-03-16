import { useRef } from 'react';

import type { IRadioGroupControlProps } from '../RadioGroupControl.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { RadioGroupControl } from '../RadioGroupControl';

export interface IUncontrolledRadioGroupControlDemoProps
  extends IRadioGroupControlProps {
  optionsRenderer: () => React.ReactNode;
}

export const UncontrolledRadioGroupControlDemo: React.FC<
  IUncontrolledRadioGroupControlDemoProps
> = (props) => {
  const { optionsRenderer, ...other } = props;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Flex direction="row" gap="$xl" align="center">
      <RadioGroupControl
        {...other}
        as={Flex}
        direction="row"
        gap="$xl"
        defaultValue="2"
        ref={ref}
      >
        {optionsRenderer()}
      </RadioGroupControl>

      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
    </Flex>
  );
};
