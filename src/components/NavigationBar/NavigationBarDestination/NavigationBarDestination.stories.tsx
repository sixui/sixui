import type { Meta, StoryObj } from '@storybook/react';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { INavigationBarDestinationProps } from './NavigationBarDestination.types';
import { Badge } from '~/components/Badge';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { NavigationBarDestination } from './NavigationBarDestination';

const meta = {
  component: NavigationBarDestination,
} satisfies Meta<typeof NavigationBarDestination>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('onClick', args, 1000),
} satisfies Partial<INavigationBarDestinationProps>;

export const Variants: IStory = {
  render: (props) => (
    <NavigationBarDestinationShowcase
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

const states: Array<IComponentPresentation<INavigationBarDestinationProps>> = [
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

const NavigationBarDestinationShowcase = componentShowcaseFactory(
  NavigationBarDestination,
);

export const Configurations: IStory = {
  render: (props) => (
    <NavigationBarDestinationShowcase
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
