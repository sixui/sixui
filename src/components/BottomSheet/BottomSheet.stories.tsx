import type { Meta, StoryObj } from '@storybook/react';

import type { IBottomSheetProps } from './BottomSheet.types';
import { useDisclosure } from '~/hooks/useDisclosure';
import { Button } from '../Button';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { BottomSheet } from './BottomSheet';

const meta = {
  component: BottomSheet,
} satisfies Meta<IBottomSheetProps>;

type IStory = StoryObj<IBottomSheetProps>;

const defaultArgs = {} satisfies Partial<IBottomSheetProps>;

const BottomSheetDemo: React.FC<IBottomSheetProps> = (props) => {
  const [opened, { close, toggle }] = useDisclosure(false);

  return (
    <>
      <Button onClick={() => toggle()}>{opened ? 'Close' : 'Open'}</Button>
      <BottomSheet {...props} opened={opened} onClose={close}>
        <Button onClick={() => close()}>Close</Button>
      </BottomSheet>
    </>
  );
};

const BottomSheetDemoShowcase = componentShowcaseFactory(BottomSheetDemo);

export const Standard: IStory = {
  render: (props) => <BottomSheetDemoShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
