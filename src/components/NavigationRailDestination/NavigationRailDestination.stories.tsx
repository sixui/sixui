import type { Meta, StoryObj } from '@storybook/react';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { INavigationRailDestinationProps } from './NavigationRailDestination.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Badge } from '../Badge';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { NavigationRailDestination } from './NavigationRailDestination';

const meta = {
  component: NavigationRailDestination,
} satisfies Meta<typeof NavigationRailDestination>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('onClick', args, 1000),
} satisfies Partial<INavigationRailDestinationProps>;

export const Variants: IStory = {
  render: (props) => (
    <NavigationRailDestinationShowcase
      props={props}
      cols={[
        { props: { active: false, label: 'Inactive' } },
        { props: { active: true, label: 'Active' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faStar} />,
    activeIcon: <FontAwesomeIcon icon={fasStar} />,
  },
};

const states: Array<IComponentPresentation<INavigationRailDestinationProps>> = [
  { legend: 'Inactive', props: { active: false, label: 'Inactive' } },
  { legend: 'Active', props: { active: true, label: 'Active' } },
  {
    legend: 'Focused',
    props: { label: 'Focused', interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { label: 'Hovered', interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { label: 'Pressed', interactions: { pressed: true } },
  },
  { legend: 'Loading', props: { label: 'Loading', loading: true } },
  { legend: 'Disabled', props: { label: 'Disabled', disabled: true } },
];

const NavigationRailDestinationShowcase = componentShowcaseFactory(
  NavigationRailDestination,
);

export const Configurations: IStory = {
  render: (props) => (
    <NavigationRailDestinationShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'No label', props: { label: undefined } },
        { legend: 'With label' },
        {
          legend: 'With badge',
          props: {
            badge: <Badge value={3} />,
          },
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    icon: <FontAwesomeIcon icon={faStar} />,
    activeIcon: <FontAwesomeIcon icon={fasStar} />,
  },
};

export default meta;
