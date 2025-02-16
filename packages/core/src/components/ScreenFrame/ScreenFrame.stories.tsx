import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IScreenFrameProps } from './ScreenFrame.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { ScreenFrame } from './ScreenFrame';

const meta = {
  component: ScreenFrame,
} satisfies Meta<typeof ScreenFrame>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'ScreenFrame',
} satisfies Partial<IScreenFrameProps>;

const variants: Array<IComponentPresentation<IScreenFrameProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IScreenFrameProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const ScreenFrameShowcase = componentShowcaseFactory(ScreenFrame);

export const Basic: IStory = {
  render: (props) => (
    <ScreenFrameShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
