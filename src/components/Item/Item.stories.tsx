import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IItemProps } from './Item.types';
import { ComponentShowcase } from '~/components/ComponentShowcase';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
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

const styles = stylex.create({
  host: {
    outlineWidth: '1px',
    outlineStyle: 'dashed',
    outlineColor: colorSchemeTokens.outlineVariant,
  },
  host$fixedWidth$sm: {
    width: 320,
  },
  host$fixedWidth$xs: {
    width: 160,
  },
  slot: {
    display: 'flex',
    flexGrow: 1,
  },
  slot$start: {
    backgroundColor: colorSchemeTokens.surfaceContainer,
  },
  slot$overline: {
    backgroundColor: colorSchemeTokens.surfaceContainer,
  },
  slot$headline: {
    backgroundColor: colorSchemeTokens.primaryContainer,
    color: colorSchemeTokens.onPrimaryContainer,
  },
  slot$supportingText: {
    backgroundColor: colorSchemeTokens.surfaceContainer,
  },
  slot$trailingSupportingText: {
    backgroundColor: colorSchemeTokens.surfaceContainer,
  },
  slot$end: {
    backgroundColor: colorSchemeTokens.surfaceContainer,
  },
});

const defaultArgs = { sx: styles.host } satisfies Partial<IItemProps>;

export const Slots: IStory = {
  render: (props) => <ComponentShowcase component={Item} props={props} />,
  args: {
    ...defaultArgs,
    start: <div {...stylex.props(styles.slot, styles.slot$start)}>Start</div>,
    overline: (
      <div {...stylex.props(styles.slot, styles.slot$overline)}>Overline</div>
    ),
    children: (
      <div {...stylex.props(styles.slot, styles.slot$headline)}>Headline</div>
    ),
    supportingText: (
      <div {...stylex.props(styles.slot, styles.slot$supportingText)}>
        Supporting text
      </div>
    ),
    trailingSupportingText: (
      <div {...stylex.props(styles.slot, styles.slot$trailingSupportingText)}>
        Trailing supporting text
      </div>
    ),
    end: <div {...stylex.props(styles.slot, styles.slot$end)}>End</div>,
  },
};

export const Lengths: IStory = {
  render: (props) => (
    <ComponentShowcase
      horizontalAlign='start'
      component={Item}
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
            sx: [styles.host, styles.host$fixedWidth$sm],
          },
        },
        {
          legend: 'Fixed width, one line max',
          props: {
            children: LOREM$SM,
            sx: [styles.host, styles.host$fixedWidth$xs],
            maxLines: 1,
          },
        },
        {
          legend: 'Fixed width, two lines max',
          props: {
            children: LOREM$SM,
            sx: [styles.host, styles.host$fixedWidth$xs],
            maxLines: 2,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
