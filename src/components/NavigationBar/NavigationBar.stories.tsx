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

import type { INavigationBarProps } from './NavigationBar.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Placeholder } from '~/components/Placeholder';
import { themeTokens } from '~/components/ThemeProvider';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { NavigationBar } from './NavigationBar';

const meta = {
  component: NavigationBar,
} satisfies Meta<typeof NavigationBar>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <>
      <NavigationBar.Destination
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
        icon={<FontAwesomeIcon icon={faSquare} />}
        activeIcon={<FontAwesomeIcon icon={fasSquare} />}
        label="Item 1"
        active
      />
      <NavigationBar.Destination
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
        icon={<FontAwesomeIcon icon={faCircle} />}
        activeIcon={<FontAwesomeIcon icon={fasCircle} />}
        label="Item 2"
      />
      <NavigationBar.Destination
        onClick={(args) => sbHandleEvent('onClick', args, 1000)}
        icon={<FontAwesomeIcon icon={faHeart} />}
        activeIcon={<FontAwesomeIcon icon={fasHeart} />}
        label="Item 3"
        disabled
      />
    </>
  ),
} satisfies Partial<INavigationBarProps>;

const NavigationBarFrame: React.FC<INavigationBarProps> = (props) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$2">
        <Button onClick={() => toggleOpened()}>
          {opened ? 'Close' : 'Open'}
        </Button>
      </Flex>

      <Frame
        importParentStyles
        w="$72"
        h="$96"
        style={{
          borderWidth: px(1),
          borderStyle: 'dashed',
          borderColor: themeTokens.colorScheme.outlineVariant,
        }}
      >
        <Flex direction="column" align="start" h="100%">
          <Placeholder label="Page" grow={1} expanded diagonals />
          <NavigationBar opened={opened} {...other} />
        </Flex>
      </Frame>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <NavigationBarFrame {...props} />,
  args: defaultArgs,
};

export default meta;
