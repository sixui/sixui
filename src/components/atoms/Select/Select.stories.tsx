import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import {
  ComponentShowcase,
  type IComponentPropsWithLegend,
} from '@/components/utils/ComponentShowcase';
import { Select, type ISelectProps } from './Select';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 200,
  },
});

const defaultArgs = {
  sx: styles.host,
  disabled: true,
} satisfies Partial<ISelectProps>;

const statesProps: IComponentPropsWithLegend<ISelectProps> = [
  { $legend: 'Enabled', children: 'Enabled' },
  { $legend: 'Hovered', children: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', children: 'Focused', visualState: { focused: true } },
];

const rowsProps: IComponentPropsWithLegend<ISelectProps> = [
  { $legend: 'Basic' },
  // { $legend: 'With Leading Icon', icon: <FontAwesomeIcon icon={faPlus} /> },
  // {
  //   $legend: 'With Leading and Trailing Icons',
  //   icon: <FontAwesomeIcon icon={faPlus} />,
  //   trailingIcon: true,
  // },
];

const options = [
  <Select.Option key={0} type='link' disabled>
    Apple
  </Select.Option>,
  <MenuListDivider key={1} />,
  <Select.Option key={2} type='link'>
    Banana
  </Select.Option>,
  <Select.Option key={3} type='link'>
    Cumcumber
  </Select.Option>,
];

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Select}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    children: options,
  },
};
export default meta;
