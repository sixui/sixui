import type { Meta, StoryObj } from '@storybook/react';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { StepConnector, type IStepConnectorProps } from './StepConnector';

const meta = {
  component: StepConnector,
} satisfies Meta<typeof StepConnector>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IStepConnectorProps>;

export const Horizontal: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={StepConnector}
      props={props}
      rows={[
        {
          legend: 'Basic',
        },
        {
          legend: 'With top text',
          props: {
            textPosition: 'top',
            children: 'Lorem ipsum',
          },
        },
        {
          legend: 'With middle text',
          props: { textPosition: 'middle', children: 'Lorem ipsum' },
        },
        {
          legend: 'With bottom text',
          props: { textPosition: 'bottom', children: 'Lorem ipsum' },
        },
      ]}
      fullWidth
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'horizontal',
  },
};

export const Vertical: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={StepConnector}
      props={props}
      cols={[
        {
          legend: 'Basic',
        },
        {
          legend: 'With text',
          props: { textPosition: 'middle', children: 'Lorem ipsum' },
        },
      ]}
      align='center'
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
  },
};

export default meta;
