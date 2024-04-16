import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faFolderClosed,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { Disclosure, type IDisclosureProps } from './Disclosure';

const meta = {
  component: Disclosure,
} satisfies Meta<typeof Disclosure>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <>
      <Disclosure.Button>Advanced options</Disclosure.Button>
      <Disclosure.Panel>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Disclosure.Panel>
    </>
  ),
} satisfies Partial<IDisclosureProps>;

export const Basic: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: defaultArgs,
};

export const Disabled: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const Loading: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    loading: true,
  },
};

export const DefaultExpanded: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    defaultExpanded: true,
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

export const Checkable: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    checkable: true,
    onChange: (...args) => sbHandleEvent('change', args),
  },
};

export const CheckableLoading: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    checkable: true,
    loading: true,
    onChange: (...args) => sbHandleEvent('change', args),
  },
};

export const DefaultChecked: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    checkable: true,
    defaultChecked: true,
    onChange: (...args) => sbHandleEvent('change', args),
  },
};

export const CheckableDisabled: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    checkable: true,
    onChange: (...args) => sbHandleEvent('change', args),
    disabled: true,
  },
};

export const Switchable: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    checkable: true,
    withSwitch: true,
    onChange: (...args) => sbHandleEvent('change', args),
  },
};

export const SwitchableLoading: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    checkable: true,
    withSwitch: true,
    loading: true,
    onChange: (...args) => sbHandleEvent('change', args),
  },
};

export const DefaultSwitched: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    checkable: true,
    withSwitch: true,
    defaultChecked: true,
    onChange: (...args) => sbHandleEvent('change', args),
  },
};

export const SwitchableDisabled: IStory = {
  render: (props) => <Disclosure {...props} />,
  args: {
    ...defaultArgs,
    checkable: true,
    withSwitch: true,
    onChange: (...args) => sbHandleEvent('change', args),
    disabled: true,
  },
};

export default meta;
