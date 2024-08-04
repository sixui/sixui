import type { Meta, StoryObj } from '@storybook/react';

import type { IStepConnectorProps } from './StepConnector.types';
import { ComponentShowcase } from '../ComponentShowcase';
import { StepConnector } from './StepConnector';

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
          props: {
            textPosition: 'middle',
            children: 'Lorem ipsum',
          },
        },
        {
          legend: 'With bottom text',
          props: {
            textPosition: 'bottom',
            children: 'Lorem ipsum',
          },
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
      component={(props) => (
        <div style={{ display: 'flex', minWidth: 64, minHeight: 128 }}>
          <StepConnector {...props} />
        </div>
      )}
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
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
  },
};

export default meta;
