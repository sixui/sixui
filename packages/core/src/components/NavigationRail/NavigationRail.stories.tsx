import type { Meta, StoryObj } from '@storybook/react';
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

import type { INavigationRailProps } from './NavigationRail.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { useToggle } from '~/hooks/useToggle';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { NavigationRail } from './NavigationRail';

const meta = {
  component: NavigationRail,
} satisfies Meta<typeof NavigationRail>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <>
      <NavigationRail.Destination
        onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
        icon={<FontAwesomeIcon icon={faSquare} />}
        activeIcon={<FontAwesomeIcon icon={fasSquare} />}
        label="Item 1"
        active
      />
      <NavigationRail.Destination
        onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
        icon={<FontAwesomeIcon icon={faCircle} />}
        activeIcon={<FontAwesomeIcon icon={fasCircle} />}
        label="Item 2"
      />
      <NavigationRail.Destination
        onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
        icon={<FontAwesomeIcon icon={faHeart} />}
        activeIcon={<FontAwesomeIcon icon={fasHeart} />}
        label="Item 3"
        disabled
      />
    </>
  ),
} satisfies Partial<INavigationRailProps>;

const NavigationRailScreenFrame: React.FC<INavigationRailProps> = (props) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);

  return (
    <Flex direction="column" gap="$sm">
      <Flex direction="row" gap="$sm">
        <Button
          onClick={() => {
            toggleOpened();
          }}
          w="96px"
        >
          {opened ? 'Close' : 'Open'}
        </Button>
      </Flex>

      <ScreenFrame defaultHeight={350}>
        <Flex
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="flex-start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <NavigationRail opened={opened} {...other} />
        </Flex>
      </ScreenFrame>
    </Flex>
  );
};

export const FromLeft: IStory = {
  render: (props) => <NavigationRailScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const FromRight: IStory = {
  render: (props) => <NavigationRailScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export default meta;
