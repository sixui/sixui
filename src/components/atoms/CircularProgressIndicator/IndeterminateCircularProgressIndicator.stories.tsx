import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import {
  IndeterminateCircularProgressIndicator,
  type IIndeterminateCircularProgressIndicatorProps,
} from './IndeterminateCircularProgressIndicator';
import { circularProgressIndicatorSizes } from '../CircularProgressIndicator';

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
      colsProps={circularProgressIndicatorSizes.map((size) => ({ size }))}
    />
  ),
  args: defaultArgs,
};

export default meta;
