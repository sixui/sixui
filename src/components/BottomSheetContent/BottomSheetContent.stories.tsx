import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IBottomSheetContentProps } from './BottomSheetContent.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { BottomSheetContent } from './BottomSheetContent';
import { bottomSheetContentVariants } from './BottomSheetContent.types';

const meta = {
  component: BottomSheetContent,
} satisfies Meta<typeof BottomSheetContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  showCloseButton: true,
  onClose: (...args) => sbHandleEvent('onClick', args, 1000),
} satisfies Partial<IBottomSheetContentProps>;

const BottomSheetContentShowcase = componentShowcaseFactory(BottomSheetContent);

export const Variants: IStory = {
  render: (props) => (
    <BottomSheetContentShowcase
      props={props}
      cols={bottomSheetContentVariants.map((variant) => ({
        props: {
          variant,
        },
        legend: capitalizeFirstLetter(variant),
      }))}
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
