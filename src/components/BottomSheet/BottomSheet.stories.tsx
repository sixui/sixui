import type { Meta, StoryObj } from '@storybook/react';
import { createSequence } from '@olivierpascal/helpers';
import stylex from '@stylexjs/stylex';

import type { IBottomSheetProps } from './BottomSheet.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { Button } from '../Button';
import { ListItem } from '../ListItem';
import { Stack } from '../Stack';
import { BottomSheet } from './BottomSheet';

// https://m3.material.io/components/bottomSheets/overview
// https://material-web.dev/components/bottomSheet/
// https://github.com/material-components/material-web/blob/main/bottomSheet/demo/stories.ts

const meta = {
  component: BottomSheet,
} satisfies Meta<IBottomSheetProps>;

type IStory = StoryObj<IBottomSheetProps>;

const styles = stylex.create({
  content: {
    padding: spacingTokens.padding$4,
  },
});

const defaultArgs = {
  onOpenChange: (...args) => void sbHandleEvent('openChange', args),
  trigger: ({ setRef, getProps }) => (
    <Button {...getProps()} ref={setRef}>
      Open
    </Button>
  ),
  children: ({ close }) => (
    <Stack sx={styles.content}>
      {createSequence(5).map((index) => (
        <ListItem key={index} onClick={close}>
          Item {index + 1}
        </ListItem>
      ))}
    </Stack>
  ),
} satisfies Partial<IBottomSheetProps>;

export const Standard: IStory = {
  render: (props) => <BottomSheet {...props} />,
  args: defaultArgs,
};

export const Modal: IStory = {
  render: (props) => <BottomSheet {...props} />,
  args: {
    ...defaultArgs,
    modal: true,
  },
};

export const Minimized: IStory = {
  render: (props) => <BottomSheet {...props} />,
  args: {
    ...defaultArgs,
    minimized: true,
  },
};

export default meta;
