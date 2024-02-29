import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope as faEnvelopeSolid,
  faUser as faUserSolid,
  faBookmark as faBookmarkSolid,
  faCalendar as faCalendarSolid,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEnvelope,
  faUser,
  faBookmark,
  faCalendar,
} from '@fortawesome/free-regular-svg-icons';

import { type ITabsProps, Tabs } from './Tabs';
import { Tab } from '../Tab';
import { TabList } from '../TabList';
import { type ITabPanelProps, TabPanel } from '../TabPanel';
import { Typography } from '../Typography';

const meta = {
  component: Tabs,
} satisfies Meta<typeof Tabs>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ITabsProps>;

const styles = stylex.create({
  tabPanel: {
    padding: '16px',
  },
});

const TabPanelDemo: React.FC<ITabPanelProps> = ({ children, ...props }) => (
  <TabPanel {...props}>
    <div {...stylex.props(styles.tabPanel)}>
      <Typography>{children}</Typography>
    </div>
  </TabPanel>
);

const TabsDemo: React.FC<ITabsProps> = (props) => (
  <div style={{ width: '600px' }}>
    <Tabs {...props} defaultAnchor={'tab-2'}>
      <TabList aria-label='Tabs example'>
        <Tab
          label='Item one'
          anchor='tab-1'
          icon={<FontAwesomeIcon icon={faEnvelope} />}
          activeIcon={<FontAwesomeIcon icon={faEnvelopeSolid} />}
        />
        <Tab
          label='Item two'
          anchor='tab-2'
          icon={<FontAwesomeIcon icon={faUser} />}
          activeIcon={<FontAwesomeIcon icon={faUserSolid} />}
        />
        <Tab
          label='Item three'
          anchor='tab-3'
          icon={<FontAwesomeIcon icon={faBookmark} />}
          activeIcon={<FontAwesomeIcon icon={faBookmarkSolid} />}
        />
        <Tab
          label='Item four'
          anchor='tab-4'
          icon={<FontAwesomeIcon icon={faCalendar} />}
          activeIcon={<FontAwesomeIcon icon={faCalendarSolid} />}
          disabled
        />
      </TabList>

      <TabPanelDemo anchor='tab-1'>Content A</TabPanelDemo>
      <TabPanelDemo anchor='tab-2'>Content B</TabPanelDemo>
      <TabPanelDemo anchor='tab-3'>Content C</TabPanelDemo>
      <TabPanelDemo anchor='tab-4'>Content D</TabPanelDemo>
    </Tabs>
  </div>
);

export const Primary: IStory = {
  render: (props) => <TabsDemo {...props} />,
  args: {
    ...defaultArgs,
    variant: 'primary',
  },
};

export const Secondary: IStory = {
  render: (props) => <TabsDemo {...props} />,
  args: {
    ...defaultArgs,
    variant: 'secondary',
  },
};

export default meta;
