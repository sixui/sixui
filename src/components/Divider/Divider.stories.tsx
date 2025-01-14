import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IFlexProps } from '../Flex';
import type { IDividerProps } from './Divider.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Flex } from '../Flex';
import { Paper } from '../Paper';
import { Divider } from './Divider';

// https://m3.material.io/components/divider/
// https://material-web.dev/components/divider/
// https://github.com/material-components/material-web/blob/main/divider/demo/stories.ts

const meta = {
  component: Divider,
} satisfies Meta<typeof Divider>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDividerProps>;

const configurations: Array<IComponentPresentation<IDividerProps>> = [
  { legend: 'Normal' },
  { legend: 'Inset', props: { inset: true } },
  { legend: 'Inset start', props: { insetStart: true } },
  { legend: 'Inset end', props: { insetEnd: true } },
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

const ListDemo: React.FC<IDividerProps> = (props) => (
  <Paper outline="$xs" outlineStyle="solid" shape="$xs">
    <Flex
      direction={props.orientation === 'horizontal' ? 'column' : 'row'}
      divider={<Divider {...props} />}
      wrap="wrap"
    >
      <Cell>One</Cell>
      <Cell>Two</Cell>
      <Cell>Three</Cell>
      <Cell>Four</Cell>
    </Flex>
  </Paper>
);

const DividerShowcase = componentShowcaseFactory(Divider);
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
    <DividerShowcase props={props} rows={configurations} fullWidth />
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
    <DividerShowcase
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
