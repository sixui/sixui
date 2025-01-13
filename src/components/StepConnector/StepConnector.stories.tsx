import type { Meta, StoryObj } from '@storybook/react';

import type { IStepConnectorProps } from './StepConnector.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { StepConnector } from './StepConnector';

// https://m3.material.io/components/divider/
// https://material-web.dev/components/divider/
// https://github.com/material-components/material-web/blob/main/divider/demo/stories.ts

const meta = {
  component: StepConnector,
} satisfies Meta<typeof StepConnector>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IStepConnectorProps>;

const StepConnectorShowcase = componentShowcaseFactory(StepConnector);

export const Horizontal: IStory = {
  render: (props) => (
    <StepConnectorShowcase
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
    <StepConnectorShowcase
      // FIXME: component={(props) => (
      //   <div {...stylex.props(styles.connector)}>
      //     <StepConnector {...props} />
      //   </div>
      // )}
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
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
  },
};

export default meta;
