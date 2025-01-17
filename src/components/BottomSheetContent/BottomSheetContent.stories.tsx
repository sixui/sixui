import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IBottomSheetContentVariant } from '../BottomSheetContent_OLD';
import type { IBottomSheetContentProps } from './BottomSheetContent.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { BottomSheetContent } from './BottomSheetContent';

const meta = {
  component: BottomSheetContent,
} satisfies Meta<typeof BottomSheetContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IBottomSheetContentProps>;

const BottomSheetContentShowcase = componentShowcaseFactory(BottomSheetContent);

export const Variants: IStory = {
  render: (props) => (
    <BottomSheetContentShowcase
      props={props}
      cols={(
        ['standard', 'minimized', 'modal'] as Array<IBottomSheetContentVariant>
      ).map((variant) => ({
        props: {
          variant,
        },
        legend: capitalizeFirstLetter(variant),
      }))}
      fullWidth
    />
  ),
  args: {
    ...defaultArgs,
    onClose: (args) => void sbHandleEvent('onClose', args),
    w: '$96',
    h: '$72',
  },
};

export default meta;
