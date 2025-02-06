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

import type { IAppLayoutNavigationDrawerProps } from './AppLayoutNavigationDrawer.types';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Labeled } from '~/components/Labeled';
import { Placeholder } from '~/components/Placeholder';
import { themeTokens } from '~/components/Theme';
import { useToggle } from '~/hooks/useToggle';
import { px } from '~/utils/css/px';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { AppLayoutNavigationDrawer } from './AppLayoutNavigationDrawer';

const meta = {
  component: AppLayoutNavigationDrawer,
} satisfies Meta<typeof AppLayoutNavigationDrawer>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
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
} satisfies Partial<IAppLayoutNavigationDrawerProps>;

const AppLayoutNavigationDrawerFrame: React.FC<
  IAppLayoutNavigationDrawerProps
> = (props) => {
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
        <Labeled label="Drawer" labelPosition="right">
          <Checkbox
            onChange={(value) => {
              setDrawer(!!value);
            }}
          />
        </Labeled>
        <Labeled label="Modal" labelPosition="right" disabled={!isDrawer}>
          <Checkbox
            onChange={(value) => {
              setModal(!!value);
            }}
          />
        </Labeled>
        <Labeled label="Detached" labelPosition="right" disabled={!isDrawer}>
          <Checkbox
            onChange={(value) => {
              setDetached(!!value);
            }}
          />
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
          <AppLayoutNavigationDrawer
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
      </Frame>
    </Flex>
  );
};

export const Left: IStory = {
  render: (props) => <AppLayoutNavigationDrawerFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const Right: IStory = {
  render: (props) => <AppLayoutNavigationDrawerFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export default meta;
