import type { ICheckboxGroupProps } from '../CheckboxGroup.types';
import { Flex } from '~/components/Flex';
import { CheckboxGroup } from '../CheckboxGroup';
import { CheckboxGroupControl } from '../CheckboxGroupControl';

const ITEMS = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

export type ICheckboxGroupDemoProps = ICheckboxGroupProps;

export const CheckboxGroupDemo: React.FC<ICheckboxGroupDemoProps> = (props) => (
  <CheckboxGroup {...props}>
    <Flex direction="column" mt="$sm" gap="$md">
      {ITEMS.map((item, itemIndex) => (
        <CheckboxGroupControl.Item key={itemIndex} {...item} />
      ))}
    </Flex>
  </CheckboxGroup>
);
