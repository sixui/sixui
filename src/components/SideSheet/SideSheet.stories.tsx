import type { Meta, StoryObj } from '@storybook/react';
import { createSequence } from '@olivierpascal/helpers';
import stylex from '@stylexjs/stylex';

import type { ISideSheetProps } from './SideSheet.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { Button } from '../Button';
import { ListItem } from '../ListItem';
import { Stack } from '../Stack';
import { SideSheet } from './SideSheet';

// https://m3.material.io/components/sideSheets/overview
// https://material-web.dev/components/sideSheet/
// https://github.com/material-components/material-web/blob/main/sideSheet/demo/stories.ts

const meta = {
  component: SideSheet,
} satisfies Meta<ISideSheetProps>;

type IStory = StoryObj<ISideSheetProps>;

const styles = stylex.create({
  content: {
    minWidth: `calc(300 * ${scaleTokens.scale})`,
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
} satisfies Partial<ISideSheetProps>;

export const Standard: IStory = {
  render: (props) => <SideSheet {...props} />,
  args: defaultArgs,
};

export const Modal: IStory = {
  render: (props) => <SideSheet {...props} />,
  args: {
    ...defaultArgs,
    modal: true,
  },
};

export const Detached: IStory = {
  render: (props) => <SideSheet {...props} />,
  args: {
    ...defaultArgs,
    modal: true,
    variant: 'detached',
  },
};

export default meta;
