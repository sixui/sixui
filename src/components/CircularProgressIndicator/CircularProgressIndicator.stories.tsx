import type { Meta, StoryObj } from '@storybook/react';

import type { ICircularProgressIndicatorProps } from './CircularProgressIndicator.types';
import { ComponentShowcase } from '../ComponentShowcase';
import { Text } from '../Text';
import { CircularProgressIndicator } from './CircularProgressIndicator';

// https://m3.material.io/components/progress-indicators/overview
// https://material-web.dev/components/progress/
// https://github.com/material-components/material-web/blob/main/progress/demo/stories.ts

const meta = {
  component: CircularProgressIndicator,
} satisfies Meta<typeof CircularProgressIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ICircularProgressIndicatorProps>;

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <Text>
          <CircularProgressIndicator {...props} />
        </Text>
      )}
      props={props}
      cols={[{ props: { value: undefined } }, { props: { value: 0.75 } }]}
      rows={[{}, { props: { disabled: true } }]}
    />
  ),
  args: defaultArgs,
};

export default meta;
