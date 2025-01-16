import type { Meta, StoryObj } from '@storybook/react';
import {
  faBookmark,
  faEnvelope,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark as faBookmarkSolid,
  faEnvelope as faEnvelopeSolid,
  faUser as faUserSolid,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ITabProps } from '../Tab';
import type { ITabListProps } from './TabList.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Tab } from '../Tab';
import { TabList } from './TabList';

const meta = {
  component: TabList,
} satisfies Meta<typeof TabList>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'TabList',
} satisfies Partial<ITabListProps>;

type ITabListDemoProps = ITabListProps & {
  tabProps?: Partial<ITabProps>;
  withIcon?: boolean;
  withLabel?: boolean;
};

const TabListDemo: React.FC<ITabListDemoProps> = ({
  tabProps,
  withIcon,
  withLabel,
  ...props
}) => (
  <TabList {...props}>
    <Tab
      label={withLabel && 'Item one'}
      icon={withIcon && <FontAwesomeIcon icon={faEnvelope} />}
      activeIcon={withIcon && <FontAwesomeIcon icon={faEnvelopeSolid} />}
      {...tabProps}
      active
    />
    <Tab
      label={withLabel && 'Item two'}
      icon={withIcon && <FontAwesomeIcon icon={faUser} />}
      activeIcon={withIcon && <FontAwesomeIcon icon={faUserSolid} />}
      {...tabProps}
    />
    <Tab
      label={withLabel && 'Item three'}
      icon={withIcon && <FontAwesomeIcon icon={faBookmark} />}
      activeIcon={withIcon && <FontAwesomeIcon icon={faBookmarkSolid} />}
      {...tabProps}
      disabled
    />
  </TabList>
);

const rows: Array<IComponentPresentation<ITabListDemoProps>> = [
  {
    legend: 'Label',
    props: { withLabel: true },
  },
  {
    legend: 'Icon',
    props: { withIcon: true },
  },
  {
    legend: 'Label and icon',
    props: {
      withLabel: true,
      withIcon: true,
    },
  },
];

const TabListDemoShowcase = componentShowcaseFactory(TabListDemo);

export const Primary: IStory = {
  render: (props) => (
    <TabListDemoShowcase
      props={{
        ...props,
        tabProps: {
          onClick: (...args) => sbHandleEvent('onClick', args, 1000),
          variant: 'primary',
        },
      }}
      rows={rows}
      horizontalAlign="start"
    />
  ),
  args: defaultArgs,
};

export const Secondary: IStory = {
  render: (props) => (
    <TabListDemoShowcase
      props={{
        ...props,
        tabProps: {
          onClick: (...args) => sbHandleEvent('onClick', args, 1000),
          variant: 'secondary',
        },
      }}
      rows={rows}
      horizontalAlign="start"
    />
  ),
  args: defaultArgs,
};

export default meta;
