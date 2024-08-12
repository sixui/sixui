import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IBottomSheetProps } from './BottomSheet.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Button } from '../Button';
import { BottomSheet } from './BottomSheet';
import { Stack } from '../Stack';
import { createSequence } from '@olivierpascal/helpers';

// https://m3.material.io/components/bottomSheets/overview
// https://material-web.dev/components/bottomSheet/
// https://github.com/material-components/material-web/blob/main/bottomSheet/demo/stories.ts

const meta = {
  component: BottomSheet,
} satisfies Meta<IBottomSheetProps>;

type IStory = StoryObj<IBottomSheetProps>;

const defaultArgs = {
  onOpenChange: (...args) => void sbHandleEvent('openChange', args),
} satisfies Partial<IBottomSheetProps>;

export const Uncontrolled: IStory = {
  render: (props) => <BottomSheet {...props} />,
  args: {
    ...defaultArgs,
    children: (
      <Stack>
        {createSequence(100).map((index) => (
          <div key={index}>Line {index}</div>
        ))}
      </Stack>
    ),
    trigger: ({ setRef, getProps }) => (
      <Button {...getProps()} ref={setRef}>
        Open
      </Button>
    ),
  },
};

const ControlledBottomSheetDemo: React.FC<IBottomSheetProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <BottomSheet {...props} isOpen={isOpen} onOpenChange={setIsOpen}>
        Deleting the selected messages will also remove them from all synced
        devices.
      </BottomSheet>
    </>
  );
};

export const Controlled: IStory = {
  render: (props) => <ControlledBottomSheetDemo {...props} />,
  args: defaultArgs,
};

export default meta;
