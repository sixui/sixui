import { useRef } from 'react';

import type { ICheckboxGroupControlProps } from '../CheckboxGroupControl.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { CheckboxGroupControl } from '../CheckboxGroupControl';

export interface IUncontrolledCheckboxGroupControlDemoProps
  extends ICheckboxGroupControlProps {
  optionsRenderer: () => React.ReactNode;
}

export const UncontrolledCheckboxGroupControlDemo: React.FC<
  IUncontrolledCheckboxGroupControlDemoProps
> = (props) => {
  const { optionsRenderer, ...other } = props;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Flex direction="row" gap="$xl" align="center">
      <CheckboxGroupControl
        {...other}
        as={Flex}
        direction="row"
        gap="$xl"
        defaultValues={['2', '4']}
        ref={ref}
      >
        {optionsRenderer()}
      </CheckboxGroupControl>

      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
    </Flex>
  );
};
