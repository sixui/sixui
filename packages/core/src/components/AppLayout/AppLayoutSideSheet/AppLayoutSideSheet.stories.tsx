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

import type { IAppLayoutSideSheetProps } from './AppLayoutSideSheet.types';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Labeled } from '~/components/Labeled';
import { Placeholder } from '~/components/Placeholder';
import { themeTokens } from '~/components/ThemeProvider';
import { useToggle } from '~/hooks/useToggle';
import { px } from '~/utils/css/px';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
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
  const [opened, toggleOpened] = useToggle([true, false]);
  const [isModal, setModal] = useState(false);

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
        <Labeled label="Modal" labelPosition="right">
          <Checkbox
            onChange={(value) => {
              setModal(!!value);
            }}
          >
            {isModal ? 'Close' : 'Open'} modal
          </Checkbox>
        </Labeled>
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
          <AppLayoutSideSheet opened={opened} modal={isModal} {...other} />
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
