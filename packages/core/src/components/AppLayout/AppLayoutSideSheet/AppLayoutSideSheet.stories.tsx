import type { Meta, StoryObj } from '@storybook/react-vite';
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
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { useToggle } from '~/hooks/useToggle';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { AppLayoutNavigationDrawer } from '../AppLayoutNavigationDrawer';
import { AppLayoutSideSheet } from './AppLayoutSideSheet';

const meta = {
  component: AppLayoutSideSheet,
  args: {
    children: (
      <>
        <AppLayoutNavigationDrawer.Section headline="Section">
          <AppLayoutNavigationDrawer.Destination
            onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
            leadingIcon={<FontAwesomeIcon icon={faSquare} />}
            activeLeadingIcon={<FontAwesomeIcon icon={fasSquare} />}
            active
          >
            Item 1
          </AppLayoutNavigationDrawer.Destination>
          <AppLayoutNavigationDrawer.Destination
            onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
            leadingIcon={<FontAwesomeIcon icon={faCircle} />}
            activeLeadingIcon={<FontAwesomeIcon icon={fasCircle} />}
          >
            Item 2
          </AppLayoutNavigationDrawer.Destination>
          <AppLayoutNavigationDrawer.Destination
            onClick={(...args) => sbHandleEvent('onClick', args, 1000)}
            leadingIcon={<FontAwesomeIcon icon={faHeart} />}
            activeLeadingIcon={<FontAwesomeIcon icon={fasHeart} />}
            disabled
          >
            Item 3
          </AppLayoutNavigationDrawer.Destination>
        </AppLayoutNavigationDrawer.Section>
      </>
    ),
  },
} satisfies Meta<typeof AppLayoutSideSheet>;

type IStory = StoryObj<typeof meta>;

const AppLayoutSideSheetScreenFrame: React.FC<IAppLayoutSideSheetProps> = (
  props,
) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);
  const [isDrawer, setDrawer] = useState(false);
  const [isModal, setModal] = useState(false);
  const [detached, setDetached] = useState(false);

  return (
    <Flex direction="column" gap="$sm">
      <Flex direction="row" gap="$xl">
        <Button
          onClick={() => {
            toggleOpened();
          }}
          w="96px"
        >
          {opened ? 'Close' : 'Open'}
        </Button>
        <Checkbox
          label="Drawer"
          checked={isDrawer}
          onChange={(value) => {
            setDrawer(value);
          }}
        />
        <Checkbox
          label="Modal"
          checked={isModal}
          onChange={(value) => {
            setModal(value);
          }}
          disabled={!isDrawer}
        />
        <Checkbox
          label="Detached"
          checked={detached}
          onChange={(value) => {
            setDetached(value);
          }}
          disabled={!isDrawer}
        />
      </Flex>

      <ScreenFrame defaultHeight={350}>
        <Flex
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="flex-start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <AppLayoutSideSheet
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
  render: (props) => <AppLayoutSideSheetScreenFrame {...props} />,
  args: {
    side: 'left',
  },
};

export const Right: IStory = {
  render: (props) => <AppLayoutSideSheetScreenFrame {...props} />,
  args: {
    side: 'right',
  },
};

export default meta;
