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

import type { IAppLayoutSideSheetProps } from './AppLayoutSideSheet.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Placeholder } from '~/components/Placeholder';
import { themeTokens } from '~/components/ThemeProvider';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { AppLayoutNavigationDrawer } from '../AppLayoutNavigationDrawer';
import { AppLayoutSideSheet } from './AppLayoutSideSheet';

const meta = {
  component: AppLayoutSideSheet,
} satisfies Meta<typeof AppLayoutSideSheet>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <>
      <AppLayoutNavigationDrawer.Section headline="Section">
        <AppLayoutNavigationDrawer.Destination
          onClick={(args) => sbHandleEvent('onClick', args, 1000)}
          leadingIcon={<FontAwesomeIcon icon={faSquare} />}
          activeLeadingIcon={<FontAwesomeIcon icon={fasSquare} />}
          active
        >
          Item 1
        </AppLayoutNavigationDrawer.Destination>
        <AppLayoutNavigationDrawer.Destination
          onClick={(args) => sbHandleEvent('onClick', args, 1000)}
          leadingIcon={<FontAwesomeIcon icon={faCircle} />}
          activeLeadingIcon={<FontAwesomeIcon icon={fasCircle} />}
        >
          Item 2
        </AppLayoutNavigationDrawer.Destination>
        <AppLayoutNavigationDrawer.Destination
          onClick={(args) => sbHandleEvent('onClick', args, 1000)}
          leadingIcon={<FontAwesomeIcon icon={faHeart} />}
          activeLeadingIcon={<FontAwesomeIcon icon={fasHeart} />}
          disabled
        >
          Item 3
        </AppLayoutNavigationDrawer.Destination>
      </AppLayoutNavigationDrawer.Section>
    </>
  ),
  divider: true,
} satisfies Partial<IAppLayoutSideSheetProps>;

const AppLayoutSideSheetFrame: React.FC<IAppLayoutSideSheetProps> = (props) => {
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
        <Flex
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <AppLayoutSideSheet
            standardOpened={standardOpened}
            modalOpened={modalOpened}
            {...other}
          />
        </Flex>
      </Frame>
    </Flex>
  );
};

export const Left: IStory = {
  render: (props) => <AppLayoutSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const Right: IStory = {
  render: (props) => <AppLayoutSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export default meta;
