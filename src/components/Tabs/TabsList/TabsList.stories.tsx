import type { Meta, StoryObj } from '@storybook/react';
import {
  faBookmark,
  faEnvelope,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark as fasBookmark,
  faEnvelope as fasEnvelope,
  faUser as fasUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ITabsTabProps } from '../TabsTab';
import type { ITabsListProps } from './TabsList.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { TabsTab } from '../TabsTab';
import { TabsList } from './TabsList';

const meta = {
  component: TabsList,
} satisfies Meta<typeof TabsList>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'TabsList',
} satisfies Partial<ITabsListProps>;

type ITabsListDemoProps = ITabsListProps & {
  tabProps?: Partial<ITabsTabProps>;
  withIcon?: boolean;
  withLabel?: boolean;
};

const TabsListDemo: React.FC<ITabsListDemoProps> = ({
  tabProps,
  withIcon,
  withLabel,
  ...props
}) => (
  <TabsList {...props}>
    <TabsTab
      label={withLabel && 'Item one'}
      icon={withIcon && <FontAwesomeIcon icon={faEnvelope} />}
      activeIcon={withIcon && <FontAwesomeIcon icon={fasEnvelope} />}
      {...tabProps}
      active
    />
    <TabsTab
      label={withLabel && 'Item two'}
      icon={withIcon && <FontAwesomeIcon icon={faUser} />}
      activeIcon={withIcon && <FontAwesomeIcon icon={fasUser} />}
      {...tabProps}
    />
    <TabsTab
      label={withLabel && 'Item three'}
      icon={withIcon && <FontAwesomeIcon icon={faBookmark} />}
      activeIcon={withIcon && <FontAwesomeIcon icon={fasBookmark} />}
      {...tabProps}
      disabled
    />
  </TabsList>
);

const rows: Array<IComponentPresentation<ITabsListDemoProps>> = [
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

const TabsListDemoShowcase = componentShowcaseFactory(TabsListDemo);

export const Primary: IStory = {
  render: (props) => (
    <TabsListDemoShowcase
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
    <TabsListDemoShowcase
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
