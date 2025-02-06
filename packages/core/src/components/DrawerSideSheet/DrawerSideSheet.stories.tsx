import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IDrawerSideSheetProps } from './DrawerSideSheet.types';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Labeled } from '~/components/Labeled';
import { OverlaysProvider, useOverlays } from '~/components/Overlays';
import { Placeholder } from '~/components/Placeholder';
import { themeTokens } from '~/components/Theme';
import { useToggle } from '~/hooks/useToggle';
import { px } from '~/utils/css/px';
import { DrawerSideSheet } from './DrawerSideSheet';
import { DrawerSideSheetOverlay } from './DrawerSideSheetOverlay';

const meta = {
  component: DrawerSideSheet,
} satisfies Meta<typeof DrawerSideSheet>;

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
} satisfies Partial<IDrawerSideSheetProps>;

const DrawerSideSheetFrame: React.FC<IDrawerSideSheetProps> = (props) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);
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
        <Labeled label="Modal" labelPosition="right">
          <Checkbox
            onChange={(value) => {
              setModal(!!value);
            }}
          />
        </Labeled>
        <Labeled label="Detached" labelPosition="right">
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
          <DrawerSideSheet
            opened={opened}
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

export const FromLeft: IStory = {
  render: (props) => <DrawerSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const FromRight: IStory = {
  render: (props) => <DrawerSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

const AsOverlayDemo: React.FC<IDrawerSideSheetProps> = (props) => {
  const overlays = useOverlays();

  return (
    <Button onClick={() => overlays.open(DrawerSideSheetOverlay, props)}>
      Open
    </Button>
  );
};

const AsOverlayDemoShowcase = componentShowcaseFactory(AsOverlayDemo);

export const AsOverlay: IStory = {
  render: (props: IDrawerSideSheetProps) => (
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
