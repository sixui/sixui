import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  faCircle,
  faHeart,
  faSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCircle as fasCircle,
  faHeart as fasHeart,
  faSquare as fasSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IOmit } from '~/helpers/types';
import type { INavigationRailProps } from './NavigationRail.types';
import { Badge } from '../Badge';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Placeholder } from '../Placeholder';
import { NavigationRail } from './NavigationRail';

const meta = {
  component: NavigationRail,
} satisfies Meta<typeof NavigationRail>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  header: <Placeholder label="Leading" />,
  footer: <Placeholder label="Trailing" />,
  divider: true,
  h: '$128',
} satisfies Partial<INavigationRailProps>;

const NavigationRailDemo: React.FC<IOmit<INavigationRailProps, 'children'>> = (
  props,
) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <NavigationRail {...props}>
      <NavigationRail.Destination
        icon={<FontAwesomeIcon icon={faSquare} />}
        activeIcon={<FontAwesomeIcon icon={fasSquare} />}
        label="First"
        onClick={() => setActiveIndex(0)}
        active={activeIndex === 0}
        badge={<Badge value="3" />}
      />
      <NavigationRail.Destination
        icon={<FontAwesomeIcon icon={faCircle} />}
        activeIcon={<FontAwesomeIcon icon={fasCircle} />}
        label="Second"
        onClick={() => setActiveIndex(1)}
        active={activeIndex === 1}
        badge={<Badge dot />}
      />
      <NavigationRail.Destination
        icon={<FontAwesomeIcon icon={faHeart} />}
        activeIcon={<FontAwesomeIcon icon={fasHeart} />}
        label="Third"
        onClick={() => setActiveIndex(2)}
        active={activeIndex === 2}
      />
    </NavigationRail>
  );
};

const NavigationRailDemoShowcase = componentShowcaseFactory(NavigationRailDemo);

export const Configurations: IStory = {
  render: (props) => (
    <NavigationRailDemoShowcase
      props={props}
      cols={[
        { legend: 'Justify start', props: { justify: 'start' } },
        {
          legend: 'Justify center (default)',
          props: { justify: 'center' },
        },
        { legend: 'Justify end', props: { justify: 'end' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
