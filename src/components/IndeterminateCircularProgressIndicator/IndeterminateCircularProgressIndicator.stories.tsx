import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IIndeterminateCircularProgressIndicatorProps } from './IndeterminateCircularProgressIndicator.types';
import { makeComponentShowcase } from '../ComponentShowcase';
import { IndeterminateCircularProgressIndicator } from './IndeterminateCircularProgressIndicator';

// https://m3.material.io/components/progress-indicators/overview
// https://material-web.dev/components/progress/
// https://github.com/material-components/material-web/blob/main/progress/demo/stories.ts

const meta = {
  component: IndeterminateCircularProgressIndicator,
} satisfies Meta<typeof IndeterminateCircularProgressIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs =
  {} satisfies Partial<IIndeterminateCircularProgressIndicatorProps>;

const rows: Array<
  IComponentPresentation<IIndeterminateCircularProgressIndicatorProps>
> = [{ legend: 'Normal' }, { legend: 'Disabled', props: { disabled: true } }];

const IndeterminateCircularProgressIndicatorShowcase = makeComponentShowcase(
  IndeterminateCircularProgressIndicator,
);

export const Basic: IStory = {
  render: (props) => (
    <IndeterminateCircularProgressIndicatorShowcase props={props} rows={rows} />
  ),
  args: defaultArgs,
};

export default meta;
