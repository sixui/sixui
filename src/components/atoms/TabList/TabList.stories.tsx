import type { Meta, StoryObj } from '@storybook/react';
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
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { TabList, type ITabListProps } from './TabList';
import { Tab } from '../Tab';

const meta = {
  component: TabList,
} satisfies Meta<typeof TabList>;

type IStory = StoryObj<typeof meta>;

type ITabListDemoProps = ITabListProps & {
  variant?: 'primary' | 'secondary';
  hasIcon?: boolean;
  hasLabel?: boolean;
  tab: typeof Tab;
};

const defaultArgs = {} satisfies Partial<ITabListProps>;

const rows: Array<IComponentPresentation<ITabListDemoProps>> = [
  {
    legend: 'Label',
    props: { hasLabel: true },
  },
  {
    legend: 'Icon',
    props: { hasIcon: true },
  },
  {
    legend: 'Label and icon',
    props: {
      hasLabel: true,
      hasIcon: true,
    },
  },
];

const TabListDemo: React.FC<ITabListDemoProps> = ({
  variant,
  hasIcon,
  hasLabel,
  tab: Tab,
  ...props
}) => (
  <TabList {...props}>
    <Tab
      variant={variant}
      label={hasLabel ? 'Item one' : undefined}
      icon={hasIcon ? <FontAwesomeIcon icon={faEnvelope} /> : undefined}
      activeIcon={
        hasIcon ? <FontAwesomeIcon icon={faEnvelopeSolid} /> : undefined
      }
      active
    />
    <Tab
      variant={variant}
      label={hasLabel ? 'Item two' : undefined}
      icon={hasIcon ? <FontAwesomeIcon icon={faUser} /> : undefined}
      activeIcon={hasIcon ? <FontAwesomeIcon icon={faUserSolid} /> : undefined}
    />
    <Tab
      variant={variant}
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
      component={(props) => <TabListDemo {...props} />}
      props={{ ...props, tab: Tab }}
      rows={rows}
      align='start'
    />
  ),
  args: defaultArgs,
};

export const Secondary: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <TabListDemo {...props} />}
      props={{ ...props, tab: Tab, variant: 'secondary' }}
      rows={rows}
      align='start'
    />
  ),
  args: defaultArgs,
};

export default meta;
