import type { Meta, StoryObj } from '@storybook/react';
import {
  faArrowRight,
  faChevronDown,
  faChevronUp,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IMenuProps } from './Menu.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { IconButton } from '../IconButton';
import { MenuDivider } from '../MenuDivider';
import { MenuItem } from '../MenuItem';
import { Menu } from './Menu';

const meta = {
  component: Menu,
} satisfies Meta<typeof Menu>;

type IStory = StoryObj<typeof meta>;

const items = (
  <>
    <MenuItem label="Apple" onClick={() => sbHandleEvent('onClick', 'Apple')} />
    <MenuItem
      label="Banana"
      onClick={() => sbHandleEvent('onClick', 'Banana')}
    />
    <MenuItem
      label="Dragonfruit"
      onClick={() => sbHandleEvent('onClick', 'Dragonfruit')}
      disabled
    />
  </>
);

const nestedItems = (
  <>
    {items}
    <MenuDivider />
    <MenuItem label="Other fruits">
      {items}
      <MenuDivider />
      <MenuItem label="Some fruits again">
        {items}
        <MenuDivider />
        <MenuItem label="Even more fruits">
          {items}
          <MenuDivider />
          <MenuItem label="Too many fruits">{items}</MenuItem>
        </MenuItem>
      </MenuItem>
    </MenuItem>
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
        icon={
          <FontAwesomeIcon
            icon={opened ? faChevronUp : faChevronDown}
            size="xs"
          />
        }
        trailingIcon
        {...getProps()}
      >
        Open
      </Button>
    ),
  },
};

// const fromIconButtonStyles = stylex.create({
//   label: {
//     flexGrow: 1,
//   },
//   menu: {
//     flexGrow: 0,
//   },
// });

export const FromIconButton: IStory = {
  render: (props) => (
    <Flex gap="$2" align="center">
      <Flex align="center" gap="$2" grow>
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

export default meta;
