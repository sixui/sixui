import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { MenuList, type IMenuListProps } from './MenuList';
import { Menu } from '@/components/atoms/Menu';

const meta = {
  component: MenuList,
} satisfies Meta<typeof MenuList>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host$fixedWidth: {
    width: 192,
  },
});

const defaultArgs = {
  children: (
    <>
      <Menu.Item onClick={(...args) => sbHandleEvent('click', args)}>
        Apple
      </Menu.Item>
      <Menu.Item onClick={(...args) => sbHandleEvent('click', args)}>
        Banana
      </Menu.Item>
      <Menu.Item onClick={(...args) => sbHandleEvent('click', args)}>
        Cumcumber
      </Menu.Item>
      <Menu.Item onClick={(...args) => sbHandleEvent('click', args)}>
        This is a very long and unexpected item
      </Menu.Item>
      <MenuList.Divider />
      <Menu.Item
        onClick={(...args) => sbHandleEvent('click', args)}
        maxLines={1}
      >
        This item will never wrap
      </Menu.Item>
    </>
  ),
} satisfies Partial<IMenuListProps>;

export const AutoWidth: IStory = {
  render: (props) => <MenuList {...props} />,
  args: defaultArgs,
};

export const FixedWidth: IStory = {
  render: (props) => <MenuList sx={styles.host$fixedWidth} {...props} />,
  args: defaultArgs,
};

export default meta;
