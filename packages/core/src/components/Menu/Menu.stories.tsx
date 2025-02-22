import type { Meta, StoryObj } from '@storybook/react';
import {
  faArrowRight,
  faChevronDown,
  faChevronUp,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IMenuProps } from './Menu.types';
import { Button } from '~/components/Button';
import { InputChip } from '~/components/Chip';
import { Flex } from '~/components/Flex';
import { IconButton } from '~/components/IconButton';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Menu } from './Menu';

const meta = {
  component: Menu,
} satisfies Meta<typeof Menu>;

type IStory = StoryObj<typeof meta>;

const items = (
  <>
    <Menu.Item
      label="Apple"
      onClick={() => sbHandleEvent('onClick', 'Apple')}
    />
    <Menu.Item
      label="Banana"
      onClick={() => sbHandleEvent('onClick', 'Banana')}
    />
    <Menu.Item
      label="Dragonfruit"
      onClick={() => sbHandleEvent('onClick', 'Dragonfruit')}
      disabled
    />
  </>
);

const nestedItems = (
  <>
    {items}
    <Menu.Divider />
    <Menu.Item label="Other fruits">
      {items}
      <Menu.Divider />
      <Menu.Item label="Some fruits again">
        {items}
        <Menu.Divider />
        <Menu.Item label="Even more fruits">
          {items}
          <Menu.Divider />
          <Menu.Item label="Too many fruits">{items}</Menu.Item>
        </Menu.Item>
      </Menu.Item>
    </Menu.Item>
  </>
);

const defaultArgs = {
  children: nestedItems,
} satisfies Partial<IMenuProps>;

export const FromButton: IStory = {
  render: (props) => <Menu {...props} />,
  args: {
    ...defaultArgs,
    trigger: ({ opened, getProps }) => (
      <Button
        onClick={(...args) => sbHandleEvent('onClick', args)}
        trailingIcon={
          <FontAwesomeIcon
            icon={opened ? faChevronUp : faChevronDown}
            size="xs"
          />
        }
        {...getProps()}
      >
        Open
      </Button>
    ),
  },
};

export const FromIconButton: IStory = {
  render: (props) => (
    <Flex gap="$2" align="center">
      <Flex align="center" gap="$2" grow={1}>
        Look right <FontAwesomeIcon icon={faArrowRight} />
      </Flex>
      <Menu {...props} />
    </Flex>
  ),
  args: {
    ...defaultArgs,
    trigger: ({ getProps }) => (
      <IconButton
        icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
        {...getProps()}
      />
    ),
    placement: {
      side: 'bottom',
      alignment: 'end',
    },
  },
};

export const FromChip: IStory = {
  render: (props) => <Menu {...props} />,
  args: {
    ...defaultArgs,
    trigger: ({ opened, getProps }) => (
      <InputChip
        trailingIcon={
          <FontAwesomeIcon
            icon={opened ? faChevronUp : faChevronDown}
            size="xs"
          />
        }
        {...getProps()}
      >
        Open
      </InputChip>
    ),
  },
};

export default meta;
