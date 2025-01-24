import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ISelectBaseExampleProps } from './SelectBaseExample';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { TOP_100_MOVIES } from '~/components/FilterableListBase/movies';
import { ListItem } from '~/components/List/ListItem';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { SelectBaseExample } from './SelectBaseExample';

const meta = {
  component: SelectBaseExample,
} satisfies Meta<typeof SelectBaseExample>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$96',
  label: 'Movie',
  keepMounted: true,
  onItemChange: (...args) => void sbHandleEvent('onItemChange', args),
} satisfies Partial<ISelectBaseExampleProps>;

const rows: Array<IComponentPresentation<ISelectBaseExampleProps>> = [
  { legend: 'Filled' },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const SelectBaseExampleShowcase = componentShowcaseFactory(SelectBaseExample);

export const Basic: IStory = {
  render: (props) => <SelectBaseExampleShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export const DefaultValue: IStory = {
  render: (props) => <SelectBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultItem: TOP_100_MOVIES[2],
  },
};

export const Clearable: IStory = {
  render: (props) => <SelectBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultItem: TOP_100_MOVIES[2],
    clearable: true,
  },
};

export const CanFilter: IStory = {
  render: (props) => <SelectBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <SelectBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'king',
  },
};

export const CanCreate: IStory = {
  render: (props) => <SelectBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    canCreate: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <SelectBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <SelectBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <SelectBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    disabled: true,
  },
};

export const WithErrorText: IStory = {
  render: (props) => <SelectBaseExampleShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export default meta;
