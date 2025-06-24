import type { Meta, StoryObj } from '@storybook/react-vite';
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

import type { IAppLayoutNavigationBarProps } from './AppLayoutNavigationBar.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { NavigationBar } from '~/components/NavigationBar';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { useToggle } from '~/hooks/useToggle';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { AppLayoutNavigationBar } from './AppLayoutNavigationBar';

const meta = {
  component: AppLayoutNavigationBar,
  args: {
    children: (
      <>
        <NavigationBar.Destination
          onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
          icon={<FontAwesomeIcon icon={faSquare} />}
          activeIcon={<FontAwesomeIcon icon={fasSquare} />}
          label="Item 1"
          active
        />
        <NavigationBar.Destination
          onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
          icon={<FontAwesomeIcon icon={faCircle} />}
          activeIcon={<FontAwesomeIcon icon={fasCircle} />}
          label="Item 2"
        />
        <NavigationBar.Destination
          onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
          icon={<FontAwesomeIcon icon={faHeart} />}
          activeIcon={<FontAwesomeIcon icon={fasHeart} />}
          label="Item 3"
          disabled
        />
      </>
    ),
  },
} satisfies Meta<typeof AppLayoutNavigationBar>;

type IStory = StoryObj<typeof meta>;

const AppLayoutNavigationBarScreenFrame: React.FC<
  IAppLayoutNavigationBarProps
> = (props) => {
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

      <ScreenFrame defaultWidth={375} defaultHeight={667}>
        <Flex direction="column" align="flex-start" h="100%">
          <Placeholder label="Page" grow={1} expanded diagonals />
          <NavigationBar opened={opened} {...other} />
        </Flex>
      </ScreenFrame>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutNavigationBarScreenFrame {...props} />,
};

export default meta;
