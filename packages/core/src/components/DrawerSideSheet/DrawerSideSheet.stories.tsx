import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { IDrawerSideSheetProps } from './DrawerSideSheet.types';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { useToggle } from '~/hooks/useToggle';
import { DrawerSideSheet } from './DrawerSideSheet';

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
} satisfies Partial<IDrawerSideSheetProps>;

const DrawerSideSheetScreenFrame: React.FC<IDrawerSideSheetProps> = (props) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);
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
          label="Modal"
          checked={isModal}
          onChange={(value) => {
            setModal(!!value);
          }}
        />
        <Checkbox
          label="Detached"
          checked={detached}
          onChange={(value) => {
            setDetached(!!value);
          }}
        />
      </Flex>

      <ScreenFrame defaultHeight={350}>
        <Flex
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="flex-start"
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
      </ScreenFrame>
    </Flex>
  );
};

export const FromLeft: IStory = {
  render: (props) => <DrawerSideSheetScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const FromRight: IStory = {
  render: (props) => <DrawerSideSheetScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export default meta;
