import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faEllipsisVertical,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { commonStyles } from '@/helpers/commonStyles';
import { MenuItem } from '@/components/atoms/MenuItem';
import { MenuDivider } from '@/components/atoms/MenuDivider';
import { Menu, type IMenuProps } from './Menu';

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
    <div {...stylex.props(commonStyles.horizontalLayout)}>
      <div {...stylex.props(fromIconButtonStyles.label)}>
        Look right <FontAwesomeIcon icon={faArrowRight} />
      </div>
      <Menu sx={fromIconButtonStyles.menu} {...props} />
    </div>
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
