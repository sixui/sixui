import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { ISideSheetProps } from './SideSheet.types';
import type { ISideSheetOverlayProps } from './SideSheetOverlay';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { useOverlays } from '~/components/Overlays';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { useToggle } from '~/hooks/useToggle';
import { SideSheet } from './SideSheet';
import { SideSheetOverlay } from './SideSheetOverlay';

const meta = {
  component: SideSheet,
} satisfies Meta<typeof SideSheet>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  header: (
    <Placeholder
      label="Header"
      surface="$primaryContainer"
      color="$onPrimaryContainer"
      expanded
      diagonals
      h="72px"
    />
  ),
  children: (
    <Placeholder
      label="Content"
      surface="$primaryContainer"
      color="$onPrimaryContainer"
      expanded
      diagonals
    />
  ),
  footer: (
    <Placeholder
      label="Footer"
      surface="$primaryContainer"
      color="$onPrimaryContainer"
      expanded
      diagonals
      h="72px"
    />
  ),
} satisfies Partial<ISideSheetProps>;

const SideSheetScreenFrame: React.FC<ISideSheetProps> = (props) => {
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
          align="flex-start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <SideSheet
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

export const FromLeft: IStory = {
  render: (props) => <SideSheetScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const FromRight: IStory = {
  render: (props) => <SideSheetScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

const AsOverlayDemo: React.FC<ISideSheetOverlayProps> = (props) => {
  const overlays = useOverlays();

  return (
    <Button onClick={() => overlays.open(SideSheetOverlay, props)}>Open</Button>
  );
};

const AsOverlayDemoShowcase = componentShowcaseFactory(AsOverlayDemo);

export const AsOverlay: IStory = {
  render: (props: ISideSheetProps) => (
    <AsOverlayDemoShowcase
      props={props}
      cols={[
        { legend: 'From left', props: { side: 'left' } },
        { legend: 'From right', props: { side: 'right' } },
      ]}
      rows={[{ legend: 'Normal' }, { legend: 'Modal', props: { modal: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    showCloseButton: true,
  },
};

export default meta;
