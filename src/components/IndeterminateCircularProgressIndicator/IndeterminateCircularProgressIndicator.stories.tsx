import type { Meta, StoryObj } from '@storybook/react';

import type { ICircularProgressIndicatorSize } from '@/components/CircularProgressIndicator';
import type { IIndeterminateCircularProgressIndicatorProps } from './IndeterminateCircularProgressIndicator.types';
import { ComponentShowcase } from '@/components/ComponentShowcase';
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

export const Sizes: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={IndeterminateCircularProgressIndicator}
      props={props}
      cols={(['md', 'lg'] as Array<ICircularProgressIndicatorSize>).map(
        (size) => ({ props: { size } }),
      )}
    />
  ),
  args: defaultArgs,
};

export default meta;
