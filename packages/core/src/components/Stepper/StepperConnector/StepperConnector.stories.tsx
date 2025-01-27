import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IFlexProps } from '~/components/Flex';
import type { IStepperConnectorProps } from './StepperConnector.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { Paper } from '~/components/Paper';
import { StepperConnector } from './StepperConnector';

const meta = {
  component: StepperConnector,
} satisfies Meta<typeof StepperConnector>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IStepperConnectorProps>;

const configurations: Array<IComponentPresentation<IStepperConnectorProps>> = [
  { legend: 'Normal' },
  { legend: 'Inset', props: { indent: true } },
  { legend: 'Inset start', props: { indentStart: true } },
  { legend: 'Inset end', props: { indentEnd: true } },
  {
    legend: 'Text on top',
    props: { label: 'Text', labelPosition: 'top' },
  },
  {
    legend: 'Text on middle',
    props: { label: 'Text', labelPosition: 'middle' },
  },
  {
    legend: 'Text on bottom',
    props: { label: 'Text', labelPosition: 'bottom' },
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

const ListDemo: React.FC<IStepperConnectorProps> = (props) => (
  <Paper outline="$xs" outlineStyle="solid" shape="$xs">
    <Flex
      direction={props.orientation === 'horizontal' ? 'column' : 'row'}
      divider={<StepperConnector {...props} />}
      wrap="wrap"
    >
      <Cell>One</Cell>
      <Cell>Two</Cell>
      <Cell>Three</Cell>
      <Cell>Four</Cell>
    </Flex>
  </Paper>
);

const StepperConnectorShowcase = componentShowcaseFactory(StepperConnector);
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
    <StepperConnectorShowcase props={props} rows={configurations} fullWidth />
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
    <StepperConnectorShowcase
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
