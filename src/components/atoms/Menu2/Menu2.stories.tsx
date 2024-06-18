import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { Menu2, type IMenu2Props } from './Menu2';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { MenuDemo } from '../Menu/MenuDemo';

const meta = {
  component: Menu2,
} satisfies Meta<typeof Menu2>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  action: {
    // Only for screenshots:
    marginBottom: 180,
  },
  clipper: {
    position: 'relative',
    overflow: 'hidden',
  },
});

const defaultArgs = {} satisfies Partial<IMenu2Props>;

const items = [
  <Menu2.Item
    key={0}
    onClick={(...args) => sbHandleEvent('click', args)}
    disabled
  >
    Apple
  </Menu2.Item>,
  <Menu2.Divider key={1} />,
  <Menu2.Item key={2} onClick={(...args) => sbHandleEvent('click', args)}>
    Banana
  </Menu2.Item>,
  <Menu2.Item key={3} onClick={(...args) => sbHandleEvent('click', args)}>
    Cumcumber
  </Menu2.Item>,
];

export const FromButton: IStory = {
  render: (props) => (
    <Menu2 {...props}>
      <Menu2.Item>Item 1.1</Menu2.Item>
      <Menu2.Item>Item 1.2 and a very long text</Menu2.Item>
      <Menu2.Item>Item 1.3</Menu2.Item>
      <Menu2>
        <Menu2.Item>Item 2.1</Menu2.Item>
        <Menu2.Item>Item 2.2</Menu2.Item>
        <Menu2.Item>Item 2.3</Menu2.Item>
        <Menu2>
          <Menu2.Item>Item 2.1</Menu2.Item>
          <Menu2.Item>Item 2.2</Menu2.Item>
          <Menu2.Item>Item 2.3</Menu2.Item>
          <Menu2>
            <Menu2.Item>Item 2.1</Menu2.Item>
            <Menu2.Item>Item 2.2</Menu2.Item>
            <Menu2.Item>Item 2.3</Menu2.Item>
          </Menu2>
        </Menu2>
      </Menu2>
    </Menu2>
  ),
};

export const Demo: IStory = {
  render: () => <MenuDemo />,
};

export default meta;
