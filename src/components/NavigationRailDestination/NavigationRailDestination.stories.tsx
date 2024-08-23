import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';

import type { INavigationRailDestinationProps } from './NavigationRailDestination.types';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { Badge } from '../Badge';
import { useToggle } from '~/hooks/useToggle';
import { NavigationRailDestination } from './NavigationRailDestination';

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

const states: Array<IComponentPresentation<INavigationRailDestinationProps>> = [
  { legend: 'Inactive', props: { active: false, label: 'Inactive' } },
  { legend: 'Active', props: { active: true, label: 'Active' } },
  {
    legend: 'Focused',
    props: { label: 'Focused', visualState: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { label: 'Hovered', visualState: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { label: 'Pressed', visualState: { pressed: true } },
  },
  { legend: 'Disabled', props: { label: 'Disabled', disabled: true } },
];

const NavigationRailDestinationDemo: React.FC<
  INavigationRailDestinationProps
> = (props) => {
  const [hasBadge, toggle] = useToggle(
    props.badge ? [true, false] : [false, true],
  );

  return (
    <NavigationRailDestination
      {...props}
      badge={<Badge value={hasBadge ? 3 : undefined} />}
      onClick={toggle}
    />
  );
};

export const Configurations: IStory = {
  render: (props) => (
    <ComponentShowcase
      props={props}
      component={NavigationRailDestinationDemo}
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
    activeIcon: <FontAwesomeIcon icon={faStarSolid} />,
  },
};

export default meta;
