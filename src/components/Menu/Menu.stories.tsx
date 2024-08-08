import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faEllipsisVertical,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import type { IMenuProps } from './Menu.types';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { MenuItem } from '../MenuItem';
import { MenuDivider } from '../MenuDivider';
import { Stack } from '../Stack';
import { Menu } from './Menu';

const meta = {
  component: Menu,
} satisfies Meta<typeof Menu>;

type IStory = StoryObj<typeof meta>;

const items = (
  <>
    <MenuItem label='Apple' />
    <MenuItem label='Banana' />
    <MenuItem label='Dragonfruit' disabled />
  </>
);

const nestedItems = (
  <>
    {items}
    <MenuDivider />
    <MenuItem label='Other fruits'>
      {items}
      <MenuDivider />
      <MenuItem label='Some fruits again'>
        {items}
        <MenuDivider />
        <MenuItem label='Even more fruits'>
          {items}
          <MenuDivider />
          <MenuItem label='Too many fruits'>{items}</MenuItem>
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
    trigger: ({ isOpen, getProps }) => (
      <Button
        icon={
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            size='xs'
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

const fromIconButtonStyles = stylex.create({
  label: {
    flexGrow: 1,
  },
  menu: {
    flexGrow: 0,
  },
});

export const FromIconButton: IStory = {
  render: (props) => (
    <Stack horizontal gap={4}>
      <div {...stylex.props(fromIconButtonStyles.label)}>
        Look right <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <Menu sx={fromIconButtonStyles.menu} {...props} />
    </Stack>
  ),
  args: {
    ...defaultArgs,
    trigger: ({ getProps }) => (
      <IconButton
        icon={<FontAwesomeIcon icon={faEllipsisVertical} />}
        {...getProps()}
      />
    ),
    placement: 'bottom-end',
  },
};

export default meta;
