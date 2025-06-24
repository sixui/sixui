import type { Meta, StoryObj } from '@storybook/react-vite';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { BottomSheetContent } from './BottomSheetContent';
import { bottomSheetContentVariants } from './BottomSheetContent.types';

const meta = {
  component: BottomSheetContent,
  args: {
    showCloseButton: true,
    onClose: (...args) => sbHandleEvent('onClose', args, 1000),
  },
} satisfies Meta<typeof BottomSheetContent>;

type IStory = StoryObj<typeof meta>;

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
    w: '384px',
    h: '288px',
  },
};

export default meta;
