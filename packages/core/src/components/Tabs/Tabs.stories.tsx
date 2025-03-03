import type { Meta, StoryObj } from '@storybook/react';
import {
  faBookmark,
  faCalendar,
  faEnvelope,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark as fasBookmark,
  faCalendar as fasCalendar,
  faEnvelope as fasEnvelope,
  faUser as fasUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { ITabsProps } from './Tabs.types';
import { Box } from '~/components/Box';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Text } from '~/components/Text';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Tabs } from './Tabs';

const meta = {
  component: Tabs,
} satisfies Meta<typeof Tabs>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('onChange', args),
} satisfies Partial<ITabsProps>;

const TabsDemo: React.FC<ITabsProps> = (props) => (
  <Box w="640px">
    <Tabs {...props} defaultAnchor="tab-2">
      <Tabs.List aria-label="Tabs example">
        <Tabs.Tab
          label="Item one"
          anchor="tab-1"
          icon={<FontAwesomeIcon icon={faEnvelope} />}
          activeIcon={<FontAwesomeIcon icon={fasEnvelope} />}
          onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
        />
        <Tabs.Tab
          label="Item two"
          anchor="tab-2"
          icon={<FontAwesomeIcon icon={faUser} />}
          activeIcon={<FontAwesomeIcon icon={fasUser} />}
          onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
        />
        <Tabs.Tab
          label="Item three"
          anchor="tab-3"
          icon={<FontAwesomeIcon icon={faBookmark} />}
          activeIcon={<FontAwesomeIcon icon={fasBookmark} />}
          onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
        />
        <Tabs.Tab
          label="Item four"
          anchor="tab-4"
          icon={<FontAwesomeIcon icon={faCalendar} />}
          activeIcon={<FontAwesomeIcon icon={fasCalendar} />}
          onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
          disabled
        />
      </Tabs.List>

      <Tabs.Panel pt="$2" anchor="tab-1">
        <Text>Content A</Text>
      </Tabs.Panel>
      <Tabs.Panel pt="$2" anchor="tab-2">
        <Text>Content B</Text>
      </Tabs.Panel>
      <Tabs.Panel pt="$2" anchor="tab-3">
        <Text>Content C</Text>
      </Tabs.Panel>
      <Tabs.Panel pt="$2" anchor="tab-4">
        Content D
      </Tabs.Panel>
    </Tabs>
  </Box>
);

const TabsDemoShowcase = componentShowcaseFactory(TabsDemo);

export const Primary: IStory = {
  render: (props) => <TabsDemoShowcase props={props} />,
  args: {
    ...defaultArgs,
    variant: 'primary',
  },
};

export const PrimaryDisabled: IStory = {
  render: (props) => <TabsDemoShowcase props={props} />,
  args: {
    ...defaultArgs,
    variant: 'primary',
    disabled: true,
  },
};

export const Secondary: IStory = {
  render: (props) => <TabsDemoShowcase props={props} />,
  args: {
    ...defaultArgs,
    variant: 'secondary',
  },
};

export const SecondaryDisabled: IStory = {
  render: (props) => <TabsDemoShowcase props={props} />,
  args: {
    ...defaultArgs,
    variant: 'secondary',
    disabled: true,
  },
};

export default meta;
