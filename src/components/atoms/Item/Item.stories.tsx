import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import stylex from '@stylexjs/stylex';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import type { IStyles } from '@/helpers/types';
import type { IItemStyleKey } from './Item.styledefs';
import { Item, type IItemProps } from './Item';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

// https://m3.material.io/components/items/overview
// https://material-web.dev/components/item/
// https://github.com/material-components/material-web/blob/main/labs/item/demo/stories.ts

const meta = {
  component: Item,
} satisfies Meta<typeof Item>;

type IStory = StoryObj<typeof meta>;

const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus condimentum rhoncus est volutpat venenatis.';

const defaultArgs = { children: undefined } satisfies Partial<IItemProps>;

const componentShowCaseStyles = stylex.create({
  host: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap',
  },
});

const itemStyles = stylex.create({
  host: {
    borderRadius: '8px',
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineColor: colorRolesVars.outline,
    width: '200px',
  },
});

export const Slots: IStory = {
  render: (props) => (
    <ComponentShowcase
      styles={componentShowCaseStyles}
      component={Item}
      props={props}
    />
  ),
  args: {
    ...defaultArgs,
    styles: [
      itemStyles,
      stylex.create<IStyles<IItemStyleKey>>({
        host: { width: '400px' },
      }),
    ],
    overline: '[overline]',
    headline: '[headline]',
    start: '[start]',
    children: '[children]',
    end: '[end]',
    supportingText: '[supportingText]',
    trailingSupportingText: '[trailingSupportingText]',
  },
};

export const ShortText: IStory = {
  render: (props) => (
    <ComponentShowcase
      styles={componentShowCaseStyles}
      component={Item}
      props={props}
      colsProps={[
        { children: 'Single line item' },
        { children: 'Two line item', supportingText: 'Supporting text' },
        {
          children: 'Three line item',
          supportingText: (
            <React.Fragment>
              <div>Second line text</div>
              <div>Third line text</div>
            </React.Fragment>
          ),
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    styles: itemStyles,
  },
};

const longTextColProps = [
  {
    children: 'Item with a truncated headline and supporting text.',
    supportingText: `Supporting text. ${LOREM_IPSUM}`,
    styles: [
      itemStyles,
      stylex.create<IStyles<IItemStyleKey>>({
        children: {
          // Prevent lines from wrapping
          whiteSpace: 'nowrap',
        },
      }),
    ],
  },
  {
    children: 'Item with clamped lines',
    supportingText: `Supporting text that wraps up to two lines. ${LOREM_IPSUM}`,
    styles: [
      itemStyles,
      stylex.create<IStyles<IItemStyleKey>>({
        supportingText: {
          // eslint-disable-next-line @stylexjs/valid-styles
          display: '-webkit-box',
          // eslint-disable-next-line @stylexjs/valid-styles
          WebkitBoxOrient: 'vertical',
          // eslint-disable-next-line @stylexjs/valid-styles
          WebkitLineClamp: '2',
        },
      }),
    ],
  },
  {
    children: 'Item that always shows long wrapping text.',
    supportingText: `Supporting text. ${LOREM_IPSUM}`,
  },
];

export const LongText: IStory = {
  render: (props) => (
    <ComponentShowcase
      styles={componentShowCaseStyles}
      component={Item}
      props={props}
      colsProps={longTextColProps}
    />
  ),
  args: {
    ...defaultArgs,
    styles: itemStyles,
  },
};

export default meta;
