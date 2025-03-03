import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { ISideSheetContentProps } from './SideSheetContent.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Placeholder } from '~/components/Placeholder';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { SideSheetContent } from './SideSheetContent';
import { sideSheetContentVariants } from './SideSheetContent.types';

const meta = {
  component: SideSheetContent,
} satisfies Meta<typeof SideSheetContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ISideSheetContentProps>;

const SideSheetContentShowcase = componentShowcaseFactory(SideSheetContent);

export const Variants: IStory = {
  render: (props) => (
    <SideSheetContentShowcase
      props={props}
      cols={sideSheetContentVariants.map((variant) => ({
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
    divider: true,
    w: '288px',
    h: '384px',
    onClose: (...args) => void sbHandleEvent('onClose', args),
    headline: 'Headline',
    showCloseButton: true,
    header: <Placeholder expanded label="Header" />,
    children: <Placeholder expanded label="Children" />,
    footer: <Placeholder expanded label="Footer" />,
  },
};

export default meta;
