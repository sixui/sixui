import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

import { Menu, type IMenuProps } from './Menu';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';

const meta = {
  component: Menu,
} satisfies Meta<typeof Menu>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IMenuProps>;

const items = (
  <>
    <Menu.Item>Item 1.1</Menu.Item>
    <Menu.Item>Item 1.2 and a very long text</Menu.Item>
    <Menu button={<Menu.ItemWithChildren>Item 2</Menu.ItemWithChildren>}>
      <Menu.Item>Item 2.1</Menu.Item>
      <Menu.Item>Item 2.2</Menu.Item>
      <Menu button={<Menu.ItemWithChildren>Item 3</Menu.ItemWithChildren>}>
        <Menu.Item>Item 3.1</Menu.Item>
        <Menu.Item>Item 3.2</Menu.Item>
        <Menu button={<Menu.ItemWithChildren>Item 4</Menu.ItemWithChildren>}>
          <Menu.Item>Item 4.1</Menu.Item>
          <Menu.Item>Item 4.2</Menu.Item>
          <Menu.Item>Item 4.3</Menu.Item>
        </Menu>
      </Menu>
    </Menu>
  </>
);

export const FromButton: IStory = {
  render: (props) => <Menu {...props} />,
  args: {
    ...defaultArgs,
    button: ({ open }) => (
      <Button
        icon={
          <FontAwesomeIcon
            icon={open ? faChevronUp : faChevronDown}
            size='xs'
          />
        }
        trailingIcon
      >
        Open
      </Button>
    ),
    children: items,
  },
};

const fromIconButtonStyles = stylex.create({
  host: {
    display: 'flex',
    justifyContent: 'end',
  },
});

export const FromIconButton: IStory = {
  render: (props) => (
    <div {...stylex.props(fromIconButtonStyles.host)}>
      <Menu {...props} />
    </div>
  ),
  args: {
    ...defaultArgs,
    button: <IconButton icon={<FontAwesomeIcon icon={faEllipsisVertical} />} />,
    children: items,
    placement: 'bottom-end',
  },
};

export default meta;
