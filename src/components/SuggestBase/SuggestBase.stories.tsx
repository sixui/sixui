import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ISuggestBaseExampleProps } from './SuggestBaseExample';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { TOP_100_MOVIES } from '~/components/FilterableListBase/movies';
import { ListItem } from '~/components/List/ListItem';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { SuggestBaseExample } from './SuggestBaseExample';

const meta = {
  component: SuggestBaseExample,
} satisfies Meta<typeof SuggestBaseExample>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$96',
  label: 'Movie',
  keepMounted: true,
  onItemChange: (...args) => void sbHandleEvent('itemChange', args),
} satisfies Partial<ISuggestBaseExampleProps>;

const rows: Array<IComponentPresentation<ISuggestBaseExampleProps>> = [
  { legend: 'Filled' },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const SuggestBaseExampleShowcase = componentShowcaseFactory(SuggestBaseExample);

export const Basic: IStory = {
  render: (props) => <SuggestBaseExampleShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export const DefaultValue: IStory = {
  render: (props) => <SuggestBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultItem: TOP_100_MOVIES[2],
  },
};

export const Clearable: IStory = {
  render: (props) => <SuggestBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultItem: TOP_100_MOVIES[2],
    clearable: true,
  },
};

export const CanCreate: IStory = {
  render: (props) => <SuggestBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canCreate: true,
  },
};

export const InitialContent: IStory = {
  render: (props) => <SuggestBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <SuggestBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const WithErrorText: IStory = {
  render: (props) => <SuggestBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export default meta;
