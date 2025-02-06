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

import type { IAppLayoutNavigationBarProps } from './AppLayoutNavigationBar.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { NavigationBar } from '~/components/NavigationBar';
import { Placeholder } from '~/components/Placeholder';
import { useToggle } from '~/hooks/useToggle';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { AppLayoutNavigationBar } from './AppLayoutNavigationBar';

const meta = {
  component: AppLayoutNavigationBar,
} satisfies Meta<typeof AppLayoutNavigationBar>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
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
} satisfies Partial<IAppLayoutNavigationBarProps>;

const AppLayoutNavigationBarFrame: React.FC<IAppLayoutNavigationBarProps> = (
  props,
) => {
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

      <Frame importParentStyles w="$72" h="$96">
        <Flex direction="column" align="start" h="100%">
          <Placeholder label="Page" grow={1} expanded diagonals />
          <NavigationBar opened={opened} {...other} />
        </Flex>
      </Frame>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutNavigationBarFrame {...props} />,
  args: defaultArgs,
};

export default meta;
