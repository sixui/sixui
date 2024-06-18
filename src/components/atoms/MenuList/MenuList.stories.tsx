import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { MenuList, type IMenuListProps } from './MenuList';
import { ListItem } from '../ListItem';

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
      <ListItem onClick={(...args) => sbHandleEvent('click', args)}>
        Apple
      </ListItem>
      <ListItem onClick={(...args) => sbHandleEvent('click', args)}>
        Banana
      </ListItem>
      <ListItem onClick={(...args) => sbHandleEvent('click', args)}>
        Cumcumber
      </ListItem>
      <ListItem onClick={(...args) => sbHandleEvent('click', args)}>
        This is a very long and unexpected item
      </ListItem>
      <MenuList.Divider />
      <ListItem onClick={(...args) => sbHandleEvent('click', args)} noWrap>
        This item will never wrap
      </ListItem>
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
