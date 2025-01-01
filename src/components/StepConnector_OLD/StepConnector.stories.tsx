import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IStepConnectorProps } from './StepConnector.types';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { ComponentShowcase } from '../ComponentShowcase';
import { StepConnector } from './StepConnector';

const meta = {
  component: StepConnector,
} satisfies Meta<typeof StepConnector>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  connector: {
    display: 'flex',
    minWidth: `calc(64px * ${scaleTokens.scale})`,
    minHeight: `calc(128px * ${scaleTokens.scale})`,
  },
});

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
        <div {...stylex.props(styles.connector)}>
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
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
  },
};

export default meta;
