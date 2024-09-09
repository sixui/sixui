import type { Meta, StoryObj } from '@storybook/react';

import type { IItemProps } from './Item.types';
import { makeComponentShowcase } from '../ComponentShowcase';
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

// const styles = stylex.create({
//   host: {
//     outlineWidth: outlineTokens.width$xs,
//     outlineStyle: 'dashed',
//     outlineColor: colorSchemeTokens.outlineVariant,
//   },
//   host$fixedWidth$sm: {
//     width: `calc(320px * ${scaleTokens.scale})`,
//   },
//   host$fixedWidth$xs: {
//     width: `calc(160px * ${scaleTokens.scale})`,
//   },
//   slot: {
//     display: 'flex',
//     flexGrow: 1,
//   },
//   slot$start: {
//     backgroundColor: colorSchemeTokens.surfaceContainer,
//   },
//   slot$overline: {
//     backgroundColor: colorSchemeTokens.surfaceContainer,
//   },
//   slot$headline: {
//     backgroundColor: colorSchemeTokens.primaryContainer,
//     color: colorSchemeTokens.onPrimaryContainer,
//   },
//   slot$supportingText: {
//     backgroundColor: colorSchemeTokens.surfaceContainer,
//   },
//   slot$trailingSupportingText: {
//     backgroundColor: colorSchemeTokens.surfaceContainer,
//   },
//   slot$end: {
//     backgroundColor: colorSchemeTokens.surfaceContainer,
//   },
// });

const defaultArgs = {
  outlineStyle: 'dashed',
} satisfies Partial<IItemProps>;

const ItemShowcase = makeComponentShowcase(Item);

export const Slots: IStory = {
  render: (props) => <ItemShowcase props={props} />,
  args: {
    ...defaultArgs,
    start: (
      <Paper surface='$surfaceContainer' c='$onSurface'>
        Start
      </Paper>
    ),
    overline: (
      <Paper surface='$surfaceContainer' c='$onSurface'>
        Overline
      </Paper>
    ),
    children: (
      <Paper surface='$primaryContainer' c='$onPrimaryContainer'>
        Headline
      </Paper>
    ),
    supportingText: (
      <Paper surface='$surfaceContainer' c='$onSurface'>
        Supporting Text
      </Paper>
    ),
    trailingSupportingText: (
      <Paper surface='$surfaceContainer' c='$onSurface'>
        Trailing Supporting Text
      </Paper>
    ),
    end: (
      <Paper surface='$surfaceContainer' c='$onSurface'>
        End
      </Paper>
    ),
  },
};

export const Lengths: IStory = {
  render: (props) => (
    <ItemShowcase
      horizontalAlign='start'
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
