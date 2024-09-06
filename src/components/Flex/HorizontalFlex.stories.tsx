import type { Meta, StoryObj } from '@storybook/react';

import type { IFlexProps } from './Flex.types';
import { Placeholder, type IPlaceholderProps } from '../Placeholder';
import { makeComponentShowcase } from '../ComponentShowcase';
import { Flex } from './Flex';
import { Paper } from '../Paper';
import { Divider } from '../Divider';

const meta = {
  component: Flex,
} satisfies Meta<typeof Flex>;

type IStory = StoryObj<typeof meta>;

const BoxDemo: React.FC<IPlaceholderProps> = (props) => (
  <Placeholder miw='$16' corner='$xs' {...props} />
);

const defaultArgs = {
  children: [
    <BoxDemo key={0} label='Item 1' />,
    <BoxDemo key={1} label='Item 2' miw='$24' />,
    <BoxDemo key={2} label='Item 3' miw='$32' />,
  ],
  gap: '$4',
  justify: 'flex-start',
  align: 'flex-start',
  direction: 'row',
  wrap: 'wrap',
  w: '$96',
  h: '$16',
} satisfies Partial<IFlexProps>;

const FlexShowcase = makeComponentShowcase((props: IFlexProps) => (
  <Paper outline='$xs' outlineStyle='solid' p='$2' corner='$xs'>
    <Flex {...props} />
  </Paper>
));

export const Basic: IStory = {
  render: (props) => (
    <FlexShowcase
      props={props}
      rows={[
        { legend: 'Normal' },
        {
          legend: 'With divider',
          props: { divider: <Divider orientation='vertical' /> },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Align: IStory = {
  render: (props) => (
    <FlexShowcase
      props={props}
      rows={[
        {
          legend: 'Start',
          props: { align: 'start' },
        },
        {
          legend: 'Center',
          props: { align: 'center' },
        },
        {
          legend: 'End',
          props: { align: 'end' },
        },
        {
          legend: 'Stretch',
          props: { align: 'stretch' },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Justify: IStory = {
  render: (props) => (
    <FlexShowcase
      props={props}
      rows={[
        {
          legend: 'Start',
          props: { justify: 'start' },
        },
        {
          legend: 'Center',
          props: { justify: 'center' },
        },
        {
          legend: 'End',
          props: { justify: 'end' },
        },
        {
          legend: 'Space Between',
          props: { justify: 'space-between' },
        },
        {
          legend: 'Space Around',
          props: { justify: 'space-around' },
        },
        {
          legend: 'Space Evenly',
          props: { justify: 'space-evenly' },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
