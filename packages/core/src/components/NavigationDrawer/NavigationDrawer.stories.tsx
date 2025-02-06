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

import type { INavigationDrawerProps } from './NavigationDrawer.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Placeholder } from '~/components/Placeholder';
import { useToggle } from '~/hooks/useToggle';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { NavigationDrawer } from './NavigationDrawer';

const meta = {
  component: NavigationDrawer,
} satisfies Meta<typeof NavigationDrawer>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <>
      <NavigationDrawer.Section headline="Section">
        <NavigationDrawer.Destination
          onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
          leadingIcon={<FontAwesomeIcon icon={faSquare} />}
          activeLeadingIcon={<FontAwesomeIcon icon={fasSquare} />}
          active
        >
          Item 1
        </NavigationDrawer.Destination>
        <NavigationDrawer.Destination
          onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
          leadingIcon={<FontAwesomeIcon icon={faCircle} />}
          activeLeadingIcon={<FontAwesomeIcon icon={fasCircle} />}
        >
          Item 2
        </NavigationDrawer.Destination>
        <NavigationDrawer.Destination
          onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
          leadingIcon={<FontAwesomeIcon icon={faHeart} />}
          activeLeadingIcon={<FontAwesomeIcon icon={fasHeart} />}
          disabled
        >
          Item 3
        </NavigationDrawer.Destination>
      </NavigationDrawer.Section>
    </>
  ),
  divider: true,
} satisfies Partial<INavigationDrawerProps>;

const NavigationDrawerFrame: React.FC<INavigationDrawerProps> = (props) => {
  const { ...other } = props;
  const [standardOpened, toggleStandardOpened] = useToggle([true, false]);
  const [modalOpened, toggleModalOpened] = useToggle([false, true]);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$2">
        <Button
          onClick={() => {
            toggleStandardOpened();
          }}
        >
          {standardOpened ? 'Close' : 'Open'} standard
        </Button>
        <Button
          onClick={() => {
            toggleModalOpened();
          }}
        >
          {modalOpened ? 'Close' : 'Open'} modal
        </Button>
      </Flex>

      <Frame importParentStyles w="100%" h="$96">
        <Flex
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <NavigationDrawer
            opened={standardOpened || modalOpened}
            modal={modalOpened}
            {...other}
          />
        </Flex>
      </Frame>
    </Flex>
  );
};

export const Left: IStory = {
  render: (props) => <NavigationDrawerFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const Right: IStory = {
  render: (props) => <NavigationDrawerFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export default meta;
