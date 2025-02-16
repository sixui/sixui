import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { ISideSheetProps } from './SideSheet.types';
import type { ISideSheetOverlayProps } from './SideSheetOverlay';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { Labeled } from '~/components/Labeled';
import { OverlaysProvider, useOverlays } from '~/components/Overlays';
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
      h="$18"
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
      h="$18"
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
            checked={isDrawer}
            onChange={(value) => {
              setDrawer(!!value);
            }}
          />
        </Labeled>
        <Labeled label="Modal" labelPosition="right" disabled={!isDrawer}>
          <Checkbox
            checked={isModal}
            onChange={(value) => {
              setModal(!!value);
            }}
          />
        </Labeled>
        <Labeled label="Detached" labelPosition="right" disabled={!isDrawer}>
          <Checkbox
            checked={detached}
            onChange={(value) => {
              setDetached(!!value);
            }}
          />
        </Labeled>
      </Flex>

      <ScreenFrame importParentStyles w="100%" h="$96">
        <Flex
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="start"
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
    <OverlaysProvider>
      <AsOverlayDemoShowcase
        props={props}
        cols={[
          { legend: 'From left', props: { side: 'left' } },
          { legend: 'From right', props: { side: 'right' } },
        ]}
        rows={[
          { legend: 'Normal' },
          { legend: 'Modal', props: { modal: true } },
        ]}
      />
    </OverlaysProvider>
  ),
  args: defaultArgs,
};

export default meta;
