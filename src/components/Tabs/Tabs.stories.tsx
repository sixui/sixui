import type { Meta, StoryObj } from '@storybook/react';
import {
  faBookmark,
  faCalendar,
  faEnvelope,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark as faBookmarkSolid,
  faCalendar as faCalendarSolid,
  faEnvelope as faEnvelopeSolid,
  faUser as faUserSolid,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { ITabsProps } from './Tabs.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Box } from '../Box';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Text } from '../Text';
import { Tabs } from './Tabs';

const meta = {
  component: Tabs,
} satisfies Meta<typeof Tabs>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('onChange', args),
} satisfies Partial<ITabsProps>;

const TabsDemo: React.FC<ITabsProps> = (props) => (
  <Box w="$160">
    <Tabs {...props} defaultAnchor="tab-2">
      <Tabs.TabList aria-label="Tabs example">
        <Tabs.Tab
          label="Item one"
          anchor="tab-1"
          icon={<FontAwesomeIcon icon={faEnvelope} />}
          activeIcon={<FontAwesomeIcon icon={faEnvelopeSolid} />}
        />
        <Tabs.Tab
          label="Item two"
          anchor="tab-2"
          icon={<FontAwesomeIcon icon={faUser} />}
          activeIcon={<FontAwesomeIcon icon={faUserSolid} />}
        />
        <Tabs.Tab
          label="Item three"
          anchor="tab-3"
          icon={<FontAwesomeIcon icon={faBookmark} />}
          activeIcon={<FontAwesomeIcon icon={faBookmarkSolid} />}
        />
        <Tabs.Tab
          label="Item four"
          anchor="tab-4"
          icon={<FontAwesomeIcon icon={faCalendar} />}
          activeIcon={<FontAwesomeIcon icon={faCalendarSolid} />}
          disabled
        />
      </Tabs.TabList>

      <Tabs.TabPanel pt="$2" anchor="tab-1">
        <Text>Content A</Text>
      </Tabs.TabPanel>
      <Tabs.TabPanel pt="$2" anchor="tab-2">
        <Text>Content B</Text>
      </Tabs.TabPanel>
      <Tabs.TabPanel pt="$2" anchor="tab-3">
        <Text>Content C</Text>
      </Tabs.TabPanel>
      <Tabs.TabPanel pt="$2" anchor="tab-4">
        Content D
      </Tabs.TabPanel>
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
