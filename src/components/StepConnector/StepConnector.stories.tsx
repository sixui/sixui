import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IFlexProps } from '../Flex';
import type { IStepConnectorProps } from './StepConnector.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Flex } from '../Flex';
import { Paper } from '../Paper';
import { StepConnector } from './StepConnector';

const meta = {
  component: StepConnector,
} satisfies Meta<typeof StepConnector>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IStepConnectorProps>;

const configurations: Array<IComponentPresentation<IStepConnectorProps>> = [
  { legend: 'Normal' },
  { legend: 'Inset', props: { inset: true } },
  { legend: 'Inset start', props: { insetStart: true } },
  { legend: 'Inset end', props: { insetEnd: true } },
  {
    legend: 'Text on top',
    props: { label: 'Text', contentPosition: 'top' },
  },
  {
    legend: 'Text on middle',
    props: { label: 'Text', contentPosition: 'middle' },
  },
  {
    legend: 'Text on bottom',
    props: { label: 'Text', contentPosition: 'bottom' },
  },
];

const Cell: React.FC<IFlexProps> = (props) => (
  <Flex
    align="center"
    justify="center"
    miw="$24"
    mih="$12"
    p="$2"
    ta="center"
    {...props}
  />
);

const ListDemo: React.FC<IStepConnectorProps> = (props) => (
  <Paper outline="$xs" outlineStyle="solid" shape="$xs">
    <Flex
      direction={props.orientation === 'horizontal' ? 'column' : 'row'}
      divider={<StepConnector {...props} />}
      wrap="wrap"
    >
      <Cell>One</Cell>
      <Cell>Two</Cell>
      <Cell>Three</Cell>
      <Cell>Four</Cell>
    </Flex>
  </Paper>
);

const StepConnectorShowcase = componentShowcaseFactory(StepConnector);
const ListDemoShowcase = componentShowcaseFactory(ListDemo);

export const Variants: IStory = {
  render: (props) => (
    <ListDemoShowcase
      props={props}
      cols={[
        {
          legend: 'Horizontal',
          props: {
            orientation: 'horizontal',
          },
        },
        {
          legend: 'Vertical',
          props: {
            orientation: 'vertical',
          },
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    label: 'or',
  },
};

export const Horizontal: IStory = {
  render: (props) => (
    <StepConnectorShowcase props={props} rows={configurations} fullWidth />
  ),
  args: {
    ...defaultArgs,
    orientation: 'horizontal',
    w: '$96',
  },
};

export const HorizontalList: IStory = {
  render: (props) => <ListDemoShowcase props={props} cols={configurations} />,
  args: {
    ...defaultArgs,
    orientation: 'horizontal',
  },
};

export const Vertical: IStory = {
  render: (props) => (
    <StepConnectorShowcase
      props={props}
      cols={configurations}
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
    h: '$96',
  },
};

export const VerticalList: IStory = {
  render: (props) => <ListDemoShowcase props={props} rows={configurations} />,
  args: {
    ...defaultArgs,
    orientation: 'vertical',
  },
};

export default meta;
