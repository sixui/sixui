import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  faCircle,
  faHeart,
  faSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCircle as faCircleSolid,
  faHeart as faHeartSolid,
  faSquare as faSquareSolid,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import stylex from '@stylexjs/stylex';

import type { INavigationRailProps } from './NavigationRail.types';
import { IOmit } from '~/helpers/types';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { Badge } from '../Badge';
import { ComponentShowcase } from '../ComponentShowcase';
import { Placeholder } from '../Placeholder';
import { NavigationRail } from './NavigationRail';

const meta = {
  component: NavigationRail,
} satisfies Meta<typeof NavigationRail>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    height: `calc(480px * ${scaleTokens.scale})`,
    borderWidth: outlineTokens.width$xs,
    borderColor: colorSchemeTokens.outlineVariant,
    borderStyle: 'dashed',
  },
});

const defaultArgs = {
  sx: styles.host,
  header: <Placeholder label="Leading" corner="none" />,
  footer: <Placeholder label="Trailing" corner="none" />,
} satisfies Partial<INavigationRailProps>;

const NavigationRailDemo: React.FC<IOmit<INavigationRailProps, 'children'>> = (
  props,
) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <NavigationRail {...props}>
      <NavigationRail.Destination
        icon={<FontAwesomeIcon icon={faSquare} />}
        activeIcon={<FontAwesomeIcon icon={faSquareSolid} />}
        label="First"
        onClick={() => setActiveIndex(0)}
        active={activeIndex === 0}
        badge={<Badge value="3" />}
      />
      <NavigationRail.Destination
        icon={<FontAwesomeIcon icon={faCircle} />}
        activeIcon={<FontAwesomeIcon icon={faCircleSolid} />}
        label="Second"
        onClick={() => setActiveIndex(1)}
        active={activeIndex === 1}
        badge={<Badge dot />}
      />
      <NavigationRail.Destination
        icon={<FontAwesomeIcon icon={faHeart} />}
        activeIcon={<FontAwesomeIcon icon={faHeartSolid} />}
        label="Third"
        onClick={() => setActiveIndex(2)}
        active={activeIndex === 2}
      />
    </NavigationRail>
  );
};

export const Configurations: IStory = {
  render: (props) => (
    <ComponentShowcase
      props={props}
      component={NavigationRailDemo}
      cols={[
        { legend: 'Align top', props: { groupAlignment: 'start' } },
        {
          legend: 'Align center (default)',
          props: { groupAlignment: 'center' },
        },
        { legend: 'Align bottom', props: { groupAlignment: 'end' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
