import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as stylex from '@stylexjs/stylex';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/molecules/ComponentShowcase';
import { componentVars as vars } from '@/themes/base/Item/Item.stylex';
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
  { $legend: 'Hovered', children: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', children: 'Focused', visualState: { focused: true } },
  { $legend: 'Pressed', children: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Disabled', children: 'Disabled', disabled: true },
];

const itemStyles = stylex.create({
  host: {
    borderRadius: '8px',
    width: '200px',
    // eslint-disable-next-line @stylexjs/valid-styles
    [vars.containerShape]: '8px',
  },
});

export const Standard: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ListItem}
      props={props}
      colsProps={statesProps}
      rowsProps={[
        { $legend: 'Text' },
        { $legend: 'Button', type: 'button' },
        { $legend: 'Link', type: 'link' },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    styles: itemStyles,
  },
};

export default meta;
