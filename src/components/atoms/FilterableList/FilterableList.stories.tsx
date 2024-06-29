import type { Meta, StoryObj } from '@storybook/react';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ListItem } from '@/components/atoms/ListItem';
import {
  FilterableListExample,
  type IFilterableListExampleProps,
} from './FilterableListExample';
import { TOP_100_MOVIES } from './movies';

const meta = {
  component: FilterableListExample,
} satisfies Meta<typeof FilterableListExample>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  afterItemSelect: (...args) => void sbHandleEvent('onItemsRemove', args),
} satisfies Partial<IFilterableListExampleProps>;

export const Basic: IStory = {
  render: (props) => <FilterableListExample {...props} />,
  args: defaultArgs,
};

export const CanFilter: IStory = {
  render: (props) => <FilterableListExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <FilterableListExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'king',
  },
};

export const CanCreate: IStory = {
  render: (props) => <FilterableListExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    canCreate: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <FilterableListExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <FilterableListExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <FilterableListExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    disabled: true,
  },
};

export default meta;
