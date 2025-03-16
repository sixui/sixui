import { useRef, useState } from 'react';

import type { ICheckboxGroupControlProps } from '../CheckboxGroupControl.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { CheckboxGroupControl } from '../CheckboxGroupControl';

export interface IControlledCheckboxGroupControlDemoProps
  extends ICheckboxGroupControlProps {
  optionsRenderer: () => React.ReactNode;
}

export const ControlledCheckboxGroupControlDemo: React.FC<
  IControlledCheckboxGroupControlDemoProps
> = (props) => {
  const { optionsRenderer, onChange, ...other } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState<Array<string>>(['2', '4']);

  return (
    <Flex direction="row" gap="$xl" align="center">
      <CheckboxGroupControl
        {...other}
        as={Flex}
        direction="row"
        gap="$xl"
        values={values}
        onChange={async (values, event) => {
          await onChange?.(values, event);
          setValues(values);
        }}
        ref={ref}
      >
        {optionsRenderer()}
      </CheckboxGroupControl>

      <Button onClick={() => ref.current?.focus()}>Click to focus</Button>
    </Flex>
  );
};
