import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { Menu, type IMenuProps } from './Menu';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';

const meta = {
  component: Menu,
} satisfies Meta<typeof Menu>;

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

const defaultArgs = {} satisfies Partial<IMenuProps>;

const items = [
  <Menu.Item
    key={0}
    onClick={(...args) => sbHandleEvent('click', args)}
    disabled
  >
    Apple
  </Menu.Item>,
  <Menu.Divider key={1} />,
  <Menu.Item key={2} onClick={(...args) => sbHandleEvent('click', args)}>
    Banana
  </Menu.Item>,
  <Menu.Item key={3} onClick={(...args) => sbHandleEvent('click', args)}>
    Cumcumber
  </Menu.Item>,
];

export const FromButton: IStory = {
  render: (props) => <Menu {...props} />,
  args: {
    ...defaultArgs,
    action: ({ open }) => (
      <Button
        icon={
          <FontAwesomeIcon
            icon={open ? faChevronUp : faChevronDown}
            size='xs'
          />
        }
        trailingIcon
        sx={styles.action}
      >
        Open
      </Button>
    ),
    children: items,
  },
};

export const Contained: IStory = {
  render: (props) => (
    <div {...stylex.props(styles.clipper)}>
      <Menu {...props} />
    </div>
  ),
  args: {
    ...defaultArgs,
    action: ({ open }) => (
      <Button
        icon={
          <FontAwesomeIcon
            icon={open ? faChevronUp : faChevronDown}
            size='xs'
          />
        }
        trailingIcon
        sx={styles.action}
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
    paddingLeft: '20ch',
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
    action: <IconButton icon={<FontAwesomeIcon icon={faEllipsisVertical} />} />,
    children: items,
    placement: 'bottom-end',
  },
};

export default meta;
