import type { IRadioGroupProps } from '../RadioGroup.types';
import { Flex } from '~/components/Flex';
import { RadioGroup } from '../RadioGroup';
import { RadioGroupControl } from '../RadioGroupControl';

const ITEMS = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

export type IRadioGroupDemoProps = IRadioGroupProps;

export const RadioGroupDemo: React.FC<IRadioGroupDemoProps> = (props) => (
  <RadioGroup {...props}>
    <Flex direction="column" mt="$sm" gap="$md">
      {ITEMS.map((item, itemIndex) => (
        <RadioGroupControl.Item key={itemIndex} {...item} />
      ))}
    </Flex>
  </RadioGroup>
);
