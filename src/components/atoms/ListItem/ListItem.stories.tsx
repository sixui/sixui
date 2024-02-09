import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import stylex from '@stylexjs/stylex';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { ListItem, type IListItemProps } from './ListItem';

// https://m3.material.io/components/items/overview
// https://material-web.dev/components/item/
// https://github.com/material-components/material-web/blob/main/labs/item/demo/stories.ts

const meta = {
  component: ListItem,
} satisfies Meta<typeof ListItem>;

type IStory = StoryObj<typeof meta>;

const listItemStyles = stylex.create({
  host: {
    width: '180px',
  },
});

const defaultArgs = {
  children: undefined,
  styles: listItemStyles,
} satisfies Partial<IListItemProps>;

const statesProps: IComponentPropsWithLegend<IListItemProps> = [
  { $legend: 'Enabled', children: 'Enabled' },
  { $legend: 'Focused', children: 'Focused', visualState: { focused: true } },
  { $legend: 'Hovered', children: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Pressed', children: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Selected', children: 'Selected', selected: true },
  { $legend: 'Disabled', children: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<IListItemProps> = [
  { $legend: 'Text' },
  { $legend: 'Button', type: 'button' },
  { $legend: 'Link', type: 'link' },
  {
    $legend: 'Link with Icons',
    type: 'link',
    start: <CalendarDaysIcon style={{ width: 24, height: 24 }} aria-hidden />,
    end: <ChevronRightIcon style={{ width: 20, height: 20 }} aria-hidden />,
  },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ListItem}
      props={props}
      colsProps={[
        {
          children: 'One line item',
        },
        {
          children: 'With Icons',
          start: (
            <CalendarDaysIcon style={{ width: 24, height: 24 }} aria-hidden />
          ),
          end: (
            <ChevronRightIcon style={{ width: 20, height: 20 }} aria-hidden />
          ),
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    type: 'link',
  },
};

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ListItem}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: defaultArgs as IListItemProps,
};

export default meta;
