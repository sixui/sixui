import type { Meta, StoryObj } from '@storybook/react';

import type { ICircularProgressIndicatorProps } from './CircularProgressIndicator.types';
import { makeComponentShowcase } from '../ComponentShowcase';
import { CircularProgressIndicator } from './CircularProgressIndicator';

// https://m3.material.io/components/progress-indicators/overview
// https://material-web.dev/components/progress/
// https://github.com/material-components/material-web/blob/main/progress/demo/stories.ts

const meta = {
  component: CircularProgressIndicator,
} satisfies Meta<typeof CircularProgressIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ICircularProgressIndicatorProps>;

const CircularProgressIndicatorShowcase = makeComponentShowcase(
  CircularProgressIndicator,
);

export const Variants: IStory = {
  render: (props) => (
    <CircularProgressIndicatorShowcase
      props={props}
      cols={[{ props: { value: undefined } }, { props: { value: 0.75 } }]}
      rows={[{}, { props: { disabled: true } }]}
    />
  ),
  args: defaultArgs,
};

export default meta;
