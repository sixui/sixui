import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import stylex from '@stylexjs/stylex';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { componentVars as vars } from '@/themes/base/ListItem/ListItem.stylex';
import { ListItem, type IListItemProps } from './ListItem';

// https://m3.material.io/components/items/overview
// https://material-web.dev/components/item/
// https://github.com/material-components/material-web/blob/main/labs/item/demo/stories.ts

const meta = {
  component: ListItem,
} satisfies Meta<typeof ListItem>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = { children: undefined } satisfies Partial<IListItemProps>;

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

const itemStyles = stylex.create({
  host: {
    borderRadius: '8px',
    width: '200px',
    // eslint-disable-next-line @stylexjs/valid-styles
    [vars.containerShape]: '8px',
  },
});

// TODO: variants

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ListItem}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    styles: itemStyles,
  },
};

export default meta;
