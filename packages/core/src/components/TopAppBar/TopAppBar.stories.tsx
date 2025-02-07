import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { ITopAppBarProps } from './TopAppBar.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { themeTokens } from '~/components/Theme';
import { TopAppBar } from './TopAppBar';
import { topAppBarVariants } from './TopAppBar.types';

const meta = {
  component: TopAppBar,
} satisfies Meta<typeof TopAppBar>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'TopAppBar',
  w: '$112',
  style: {
    borderWidth: themeTokens.outline.width.xs,
    borderColor: themeTokens.colorScheme.outlineVariant,
    borderStyle: 'dashed',
  },
} satisfies Partial<ITopAppBarProps>;

const TopAppBarShowcase = componentShowcaseFactory(TopAppBar);

export const Variants: IStory = {
  render: (props) => (
    <TopAppBarShowcase
      props={props}
      rows={topAppBarVariants.map((variant) => ({
        legend: capitalizeFirstLetter(variant),
        props: {
          variant,
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export default meta;
