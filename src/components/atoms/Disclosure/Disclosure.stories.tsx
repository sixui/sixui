import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faFolderClosed,
} from '@fortawesome/free-solid-svg-icons';

import { Disclosure, type IDisclosureProps } from './Disclosure';

const meta = {
  component: Disclosure,
} satisfies Meta<typeof Disclosure>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  label: 'Advanced options',
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
} satisfies Partial<IDisclosureProps>;

export const Basic: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: defaultArgs,
};

export const DefaultOpen: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    defaultOpen: true,
  },
};

export const CustomIcons: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    disclosedIcon: <FontAwesomeIcon icon={faFolderOpen} fixedWidth />,
    concealedIcon: <FontAwesomeIcon icon={faFolderClosed} fixedWidth />,
  },
};

export default meta;
