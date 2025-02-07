import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  faCircle,
  faHeart,
  faSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faDiamondTurnRight,
  faCircle as fasCircle,
  faHeart as fasHeart,
  faSquare as fasSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IOmit } from '~/utils/types';
import type { INavigationRailContentProps } from './NavigationRailContent.types';
import { Badge } from '~/components/Badge';
import { Burger } from '~/components/Burger';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Fab } from '~/components/Fab';
import { NavigationRailContent } from './NavigationRailContent';

const meta = {
  component: NavigationRailContent,
} satisfies Meta<typeof NavigationRailContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  divider: true,
  h: '$160',
  menuIcon: <Burger />,
  fab: (
    <Fab
      variant="primary"
      icon={<FontAwesomeIcon icon={faDiamondTurnRight} />}
      flat
    />
  ),
} satisfies Partial<INavigationRailContentProps>;

const NavigationRailContentDemo: React.FC<
  IOmit<INavigationRailContentProps, 'children'>
> = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <NavigationRailContent {...props}>
      <NavigationRailContent.Destination
        icon={<FontAwesomeIcon icon={faSquare} />}
        activeIcon={<FontAwesomeIcon icon={fasSquare} />}
        label="First"
        onClick={() => {
          setActiveIndex(0);
        }}
        active={activeIndex === 0}
        badge={<Badge value="3" />}
      />
      <NavigationRailContent.Destination
        icon={<FontAwesomeIcon icon={faCircle} />}
        activeIcon={<FontAwesomeIcon icon={fasCircle} />}
        label="Second"
        onClick={() => {
          setActiveIndex(1);
        }}
        active={activeIndex === 1}
        badge={<Badge dot />}
      />
      <NavigationRailContent.Destination
        icon={<FontAwesomeIcon icon={faHeart} />}
        activeIcon={<FontAwesomeIcon icon={fasHeart} />}
        label="Third"
        onClick={() => {
          setActiveIndex(2);
        }}
        active={activeIndex === 2}
      />
    </NavigationRailContent>
  );
};

const NavigationRailContentDemoShowcase = componentShowcaseFactory(
  NavigationRailContentDemo,
);

export const Configurations: IStory = {
  render: (props) => (
    <NavigationRailContentDemoShowcase
      props={props}
      cols={[
        { legend: 'Justify top', props: { justify: 'top' } },
        {
          legend: 'Justify center (default)',
          props: { justify: 'center' },
        },
        { legend: 'Justify bottom', props: { justify: 'bottom' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
