import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faFolderClosed,
  faArrowDown,
} from '@fortawesome/free-solid-svg-icons';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { Switch } from '@/components/atoms/Switch';
import { Disclosure, type IDisclosureProps } from './Disclosure';
import { ElementWithLabel } from '@/components/molecules/ElementWithLabel';

const meta = {
  component: Disclosure,
} satisfies Meta<typeof Disclosure>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    // Only for screenshots:
    // width: 1100,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  panel: {
    // Only for screenshots:
    // position: 'absolute',
    // marginTop: 50,
  },
});

const defaultArgs = {
  children: (
    <>
      <Disclosure.Button>Advanced options</Disclosure.Button>
      <Disclosure.Panel sx={styles.panel}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Disclosure.Panel>
    </>
  ),
} satisfies Partial<IDisclosureProps>;

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Disclosure}
      props={props}
      fullWidth
      rows={[
        {
          legend: 'Basic',
        },
        {
          legend: 'Disabled',
          props: {
            disabled: true,
          },
        },
        {
          legend: 'Loading',
          props: {
            disabled: true,
            loading: true,
          },
        },
        {
          legend: 'Checkable',
          props: {
            checkable: true,
            checked: true,
          },
        },
        {
          legend: 'Switchable',
          props: {
            checkable: true,
            checked: true,
            withSwitch: true,
          },
        },
        {
          legend: 'Expanded',
          props: {
            defaultExpanded: true,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

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

const DynamicDefaultExpandedDemo: React.FC<IDisclosureProps> = (props) => {
  const [defaultExpanded, setDefaultExpanded] = useState(false);

  return (
    <div {...stylex.props(styles.container)}>
      <ElementWithLabel label='Default expanded' orientation='horizontal'>
        <Switch
          checked={defaultExpanded}
          onChange={(_, enabled) => setDefaultExpanded(enabled)}
        />
      </ElementWithLabel>
      <Disclosure {...props} defaultExpanded={defaultExpanded} />
    </div>
  );
};

export const DefaultExpanded: IStory = {
  render: (props) => <DynamicDefaultExpandedDemo {...props} />,
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
        <Disclosure.Button expandIcon={<FontAwesomeIcon icon={faArrowDown} />}>
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
