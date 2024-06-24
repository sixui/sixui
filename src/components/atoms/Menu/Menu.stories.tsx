import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronUp,
  faChevronDown,
  faEllipsisVertical,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

import { Menu, type IMenuProps } from './Menu';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { commonStyles } from '@/helpers/commonStyles';

const meta = {
  component: Menu,
} satisfies Meta<typeof Menu>;

type IStory = StoryObj<typeof meta>;

const items = (
  <>
    <Menu.Item>Apple</Menu.Item>
    <Menu.Item>Banana</Menu.Item>
    <Menu.Item disabled>Dragonfruit</Menu.Item>
  </>
);

const nestedItems = (
  <>
    {items}
    <Menu.Divider />
    <Menu button={<Menu.NestedItem>Other fruits</Menu.NestedItem>}>
      {items}
      <Menu.Divider />
      <Menu button={<Menu.NestedItem>Some fruits again</Menu.NestedItem>}>
        {items}
        <Menu.Divider />
        <Menu button={<Menu.NestedItem>Even more fruits</Menu.NestedItem>}>
          {items}
        </Menu>
      </Menu>
    </Menu>
  </>
);

const defaultArgs = {
  children: nestedItems,
} satisfies Partial<IMenuProps>;

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
    button: <IconButton icon={<FontAwesomeIcon icon={faEllipsisVertical} />} />,
    placement: 'bottom-end',
  },
};

export default meta;
