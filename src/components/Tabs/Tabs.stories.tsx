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

import type { ITabsProps } from './Tabs.types';
import { Tab } from '../Tab';
import { TabList } from '../TabList';
import { TabPanel } from '../TabPanel';
import { Tabs } from './Tabs';

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

const TabsDemo: React.FC<ITabsProps> = (props) => (
  <div style={{ width: '600px' }}>
    <Tabs {...props} defaultAnchor='tab-2'>
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

      <TabPanel sx={styles.tabPanel} anchor='tab-1'>
        Content A
      </TabPanel>
      <TabPanel sx={styles.tabPanel} anchor='tab-2'>
        Content B
      </TabPanel>
      <TabPanel sx={styles.tabPanel} anchor='tab-3'>
        Content C
      </TabPanel>
      <TabPanel sx={styles.tabPanel} anchor='tab-4'>
        Content D
      </TabPanel>
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

export const PrimaryDisabled: IStory = {
  render: (props) => <TabsDemo {...props} />,
  args: {
    ...defaultArgs,
    variant: 'primary',
    disabled: true,
  },
};

export const Secondary: IStory = {
  render: (props) => <TabsDemo {...props} />,
  args: {
    ...defaultArgs,
    variant: 'secondary',
  },
};

export const SecondaryDisabled: IStory = {
  render: (props) => <TabsDemo {...props} />,
  args: {
    ...defaultArgs,
    variant: 'secondary',
    disabled: true,
  },
};

export default meta;
