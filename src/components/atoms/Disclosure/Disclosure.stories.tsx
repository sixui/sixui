import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faFolderClosed,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';

import { Disclosure, type IDisclosureProps } from './Disclosure';

const meta = {
  component: Disclosure,
} satisfies Meta<typeof Disclosure>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDisclosureProps>;

export const Basic: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    children: (
      <>
        <Disclosure.Button>Advanced options</Disclosure.Button>
        <Disclosure.Panel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Disclosure.Panel>
      </>
    ),
  },
};

export const DefaultOpen: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    defaultOpen: true,
    children: (
      <>
        <Disclosure.Button>Advanced options</Disclosure.Button>
        <Disclosure.Panel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Disclosure.Panel>
      </>
    ),
  },
};

export const TrailingIcon: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    children: (
      <>
        <Disclosure.Button trailing>Advanced options</Disclosure.Button>
        <Disclosure.Panel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Disclosure.Panel>
      </>
    ),
  },
};

export const CustomExpandIcon: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    children: (
      <>
        <Disclosure.Button
          expandIcon={<FontAwesomeIcon icon={faArrowDown} fixedWidth />}
        >
          Advanced options
        </Disclosure.Button>
        <Disclosure.Panel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Disclosure.Panel>
      </>
    ),
  },
};

export const CustomIcons: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    children: (
      <>
        <Disclosure.Button
          expandIcon={<FontAwesomeIcon icon={faFolderClosed} fixedWidth />}
          collapseIcon={<FontAwesomeIcon icon={faFolderOpen} fixedWidth />}
        >
          Advanced options
        </Disclosure.Button>
        <Disclosure.Panel>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Disclosure.Panel>
      </>
    ),
  },
};

export default meta;
