import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IIndicatorProps } from './Indicator.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Indicator } from './Indicator';

const meta = {
  component: Indicator,
} satisfies Meta<typeof Indicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IIndicatorProps>;

const rows: Array<IComponentPresentation<IIndicatorProps>> = [
  { legend: 'Normal' },
  { legend: 'Processing', props: { processing: true } },
];

const IndicatorShowcase = componentShowcaseFactory(Indicator);

export const Variants: IStory = {
  render: (props) => <IndicatorShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export default meta;
