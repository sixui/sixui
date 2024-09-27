import type { Meta, StoryObj } from '@storybook/react';

import type { IItemProps } from './Item.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Paper } from '../Paper';
import { Item } from './Item';

// https://m3.material.io/components/items/overview
// https://material-web.dev/components/item/
// https://github.com/material-components/material-web/blob/main/labs/item/demo/stories.ts

const meta = {
  component: Item,
} satisfies Meta<typeof Item>;

type IStory = StoryObj<typeof meta>;

const LOREM$XS = 'Lorem ipsum dolor sit amet.';
const LOREM$SM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

const defaultArgs = {
  w: '$96',
} satisfies Partial<IItemProps>;

type ISlotDemoProps = {
  label: string;
  primary?: boolean;
};

const SlotDemo = ({ label, primary }: ISlotDemoProps): React.ReactNode => (
  <Paper
    surface={primary ? '$primaryContainer' : '$surfaceContainer'}
    c={primary ? '$onPrimaryContainer' : '$onSurface'}
  >
    {label}
  </Paper>
);

const ItemShowcase = componentShowcaseFactory(Item);

export const Configurations: IStory = {
  render: (props) => (
    <ItemShowcase
      props={props}
      rows={[
        {
          props: {
            start: <SlotDemo label="Start" />,
            overline: <SlotDemo label="Overline" />,
            children: <SlotDemo label="Headline" primary />,
            supportingText: <SlotDemo label="Supporting Text" />,
            trailingSupportingText: (
              <SlotDemo label="Trailing Supporting Text" />
            ),
            end: <SlotDemo label="End" />,
          },
        },
        {
          props: {
            overline: <SlotDemo label="Overline" />,
            children: <SlotDemo label="Headline" primary />,
            supportingText: <SlotDemo label="Supporting Text" />,
          },
        },
        {
          props: {
            start: <SlotDemo label="Start" />,
            children: <SlotDemo label="Headline" primary />,
            end: <SlotDemo label="End" />,
          },
        },
        {
          props: {
            children: <SlotDemo label="Headline" primary />,
            supportingText: <SlotDemo label="Supporting Text" />,
            trailingSupportingText: (
              <SlotDemo label="Trailing Supporting Text" />
            ),
          },
        },
        {
          props: {
            children: <SlotDemo label="Headline" primary />,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Lengths: IStory = {
  render: (props) => (
    <ItemShowcase
      horizontalAlign="start"
      props={props}
      rows={[
        { legend: 'Basic', props: { children: LOREM$XS } },
        {
          legend: 'Long text',
          props: {
            children: LOREM$SM,
          },
        },
        {
          legend: 'Fixed width',
          props: {
            children: LOREM$SM,
            w: '$48',
          },
        },
        {
          legend: 'Fixed width, two lines max',
          props: {
            children: LOREM$SM,
            w: '$48',
            lineClamp: 2,
          },
        },
        {
          legend: 'Fixed width, one line max',
          props: {
            children: LOREM$SM,
            w: '$48',
            lineClamp: 1,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
