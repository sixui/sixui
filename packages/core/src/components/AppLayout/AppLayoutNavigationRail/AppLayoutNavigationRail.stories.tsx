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

import type { IAppLayoutNavigationRailProps } from './AppLayoutNavigationRail.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { NavigationRail } from '~/components/NavigationRail';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { useToggle } from '~/hooks/useToggle';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { AppLayoutNavigationRail } from './AppLayoutNavigationRail';

const meta = {
  component: AppLayoutNavigationRail,
} satisfies Meta<typeof AppLayoutNavigationRail>;

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
  divider: true,
} satisfies Partial<IAppLayoutNavigationRailProps>;

const AppLayoutNavigationRailScreenFrame: React.FC<
  IAppLayoutNavigationRailProps
> = (props) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$2">
        <Button
          onClick={() => {
            toggleOpened();
          }}
          w="$24"
        >
          {opened ? 'Close' : 'Open'}
        </Button>
      </Flex>

      <ScreenFrame defaultHeight={350}>
        <Flex
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <AppLayoutNavigationRail opened={opened} {...other} />
        </Flex>
      </ScreenFrame>
    </Flex>
  );
};

export const Left: IStory = {
  render: (props) => <AppLayoutNavigationRailScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const Right: IStory = {
  render: (props) => <AppLayoutNavigationRailScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export default meta;
