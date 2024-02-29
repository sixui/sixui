import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope as faEnvelopeSolid,
  faUser as faUserSolid,
  faBookmark as faBookmarkSolid,
} from '@fortawesome/free-solid-svg-icons';
import {
  faEnvelope,
  faUser,
  faBookmark,
} from '@fortawesome/free-regular-svg-icons';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { TabList, type ITabListProps } from './TabList';
import { PrimaryTab, SecondaryTab } from '../Tab';

const meta = {
  component: TabList,
} satisfies Meta<typeof TabList>;

type IStory = StoryObj<typeof meta>;

type IExtendedTabListProps = ITabListProps & {
  hasIcon?: boolean;
  hasLabel?: boolean;
  tab: typeof PrimaryTab | typeof SecondaryTab;
};

const defaultArgs = {} satisfies Partial<ITabListProps>;

const rowsProps: IComponentPropsWithLegend<IExtendedTabListProps> = [
  {
    $legend: 'Label',
    hasLabel: true,
  },
  {
    $legend: 'Icon',
    hasIcon: true,
  },
  {
    $legend: 'Label and icon',
    hasLabel: true,
    hasIcon: true,
  },
];

const TabListDemo: React.FC<IExtendedTabListProps> = ({
  hasIcon,
  hasLabel,
  tab: Tab,
  ...props
}) => (
  <TabList {...props}>
    <Tab
      label={hasLabel ? 'Item one' : undefined}
      icon={hasIcon ? <FontAwesomeIcon icon={faEnvelope} /> : undefined}
      activeIcon={
        hasIcon ? <FontAwesomeIcon icon={faEnvelopeSolid} /> : undefined
      }
      active
    />
    <Tab
      label={hasLabel ? 'Item two' : undefined}
      icon={hasIcon ? <FontAwesomeIcon icon={faUser} /> : undefined}
      activeIcon={hasIcon ? <FontAwesomeIcon icon={faUserSolid} /> : undefined}
    />
    <Tab
      label={hasLabel ? 'Item three' : undefined}
      icon={hasIcon ? <FontAwesomeIcon icon={faBookmark} /> : undefined}
      activeIcon={
        hasIcon ? <FontAwesomeIcon icon={faBookmarkSolid} /> : undefined
      }
      disabled
    />
  </TabList>
);

export const Primary: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <TabListDemo tab={PrimaryTab} {...props} />}
      props={props}
      rowsProps={rowsProps}
      align='start'
    />
  ),
  args: defaultArgs,
};

export const Secondary: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <TabListDemo tab={SecondaryTab} {...props} />}
      props={props}
      rowsProps={rowsProps}
      align='start'
    />
  ),
  args: defaultArgs,
};

export default meta;
