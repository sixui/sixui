import type { Meta, StoryObj } from '@storybook/react';

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
  args: defaultArgs,
};

export const Horizontal: IStory = {
  render: (props) => (
    <ListDemoShowcase
      props={props}
      cols={[
        { legend: 'Normal' },
        { legend: 'Inset', props: { inset: true } },
        { legend: 'Inset start', props: { insetStart: true } },
        { legend: 'Inset end', props: { insetEnd: true } },
        { legend: 'Text', props: { children: 'Text' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'horizontal',
  },
};

export const Vertical: IStory = {
  render: (props) => (
    <ListDemoShowcase
      props={props}
      rows={[
        { legend: 'Normal' },
        { legend: 'Inset', props: { inset: true } },
        { legend: 'Text', props: { children: 'Text' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    orientation: 'vertical',
  },
};

export default meta;
