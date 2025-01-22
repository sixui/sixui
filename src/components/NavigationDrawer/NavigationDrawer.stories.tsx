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
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { AppLayoutSideSheet } from '../AppLayoutSideSheet';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { themeTokens } from '../ThemeProvider';
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
          onClick={(args) => sbHandleEvent('onClick', args, 1000)}
          leadingIcon={<FontAwesomeIcon icon={faSquare} />}
          activeLeadingIcon={<FontAwesomeIcon icon={fasSquare} />}
          active
        >
          Item 1
        </NavigationDrawer.Destination>
        <NavigationDrawer.Destination
          onClick={(args) => sbHandleEvent('onClick', args, 1000)}
          leadingIcon={<FontAwesomeIcon icon={faCircle} />}
          activeLeadingIcon={<FontAwesomeIcon icon={fasCircle} />}
        >
          Item 2
        </NavigationDrawer.Destination>
        <NavigationDrawer.Destination
          onClick={(args) => sbHandleEvent('onClick', args, 1000)}
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
  const [standardOpened, toggleStandardOpened] = useToggle([true, false]);
  const [modalOpened, toggleModalOpened] = useToggle([false, true]);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$2">
        <Button onClick={() => toggleStandardOpened()}>
          {standardOpened ? 'Close' : 'Open'} standard
        </Button>
        <Button onClick={() => toggleModalOpened()}>
          {modalOpened ? 'Close' : 'Open'} modal
        </Button>
      </Flex>
      <Frame
        importParentStyles
        w="100%"
        h="$96"
        style={{
          borderWidth: px(1),
          borderStyle: 'dashed',
          borderColor: themeTokens.colorScheme.outlineVariant,
        }}
      >
        <AppLayoutSideSheet side="right">
          <NavigationDrawer
            standardOpened={standardOpened}
            modalOpened={modalOpened}
            onClose={() => toggleModalOpened(false)}
            {...props}
          />
        </AppLayoutSideSheet>
      </Frame>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <NavigationDrawerFrame {...props} />,
  args: defaultArgs,
};

export default meta;
