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

import type { INavigationDrawerProps } from './NavigationDrawer.types';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
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

const NavigationDrawerScreenFrame: React.FC<INavigationDrawerProps> = (
  props,
) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);
  const [isDrawer, setDrawer] = useState(false);
  const [isModal, setModal] = useState(false);
  const [detached, setDetached] = useState(false);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$6">
        <Button
          onClick={() => {
            toggleOpened();
          }}
          w="$24"
        >
          {opened ? 'Close' : 'Open'}
        </Button>
        <Checkbox
          label="Drawer"
          checked={isDrawer}
          onChange={(value) => {
            setDrawer(!!value);
          }}
        />
        <Checkbox
          label="Modal"
          checked={isModal}
          onChange={(value) => {
            setModal(!!value);
          }}
          disabled={!isDrawer}
        />
        <Checkbox
          label="Detached"
          checked={detached}
          onChange={(value) => {
            setDetached(!!value);
          }}
          disabled={!isDrawer}
        />
      </Flex>

      <ScreenFrame defaultHeight={350}>
        <Flex
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <NavigationDrawer
            opened={opened}
            drawer={isDrawer}
            modal={isModal}
            detached={detached}
            onClose={() => {
              toggleOpened(false);
            }}
            {...other}
          />
        </Flex>
      </ScreenFrame>
    </Flex>
  );
};

export const Left: IStory = {
  render: (props) => <NavigationDrawerScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const Right: IStory = {
  render: (props) => <NavigationDrawerScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export default meta;
