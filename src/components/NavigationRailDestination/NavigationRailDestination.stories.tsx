import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

import type { INavigationRailDestinationProps } from './NavigationRailDestination.types';
import { ComponentShowcase } from '../ComponentShowcase';
import { NavigationRailDestination } from './NavigationRailDestination';
import { Anchored } from '../Anchored';
import { Badge } from '../Badge';

const meta = {
  component: NavigationRailDestination,
} satisfies Meta<typeof NavigationRailDestination>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<INavigationRailDestinationProps>;

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      props={props}
      component={NavigationRailDestination}
      cols={[
        { props: { active: false, label: 'Inactive' } },
        { props: { active: true, label: 'Active' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faStar} />,
    activeIcon: <FontAwesomeIcon icon={faStarSolid} />,
  },
};

export const Configurations: IStory = {
  render: (props) => (
    <ComponentShowcase
      props={props}
      component={NavigationRailDestination}
      cols={[
        { legend: 'Inactive', props: { active: false, label: 'Inactive' } },
        { legend: 'Active', props: { active: true, label: 'Active' } },
      ]}
      rows={[
        { legend: 'No Label', props: { label: undefined } },
        { legend: 'With Label', props: {} },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    icon: (
      <Anchored content={<Badge value={3} />}>
        <FontAwesomeIcon icon={faStar} />
      </Anchored>
    ),
    activeIcon: <FontAwesomeIcon icon={faStarSolid} />,
  },
};

export default meta;
