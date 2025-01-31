import type { Meta, StoryObj } from '@storybook/react';

import type { IFilterableListBaseDemoProps } from './FilterableListBase.stories/FilterableListBaseDemo';
import { ListItem } from '~/components/List/ListItem';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { FilterableListBaseDemo } from './FilterableListBase.stories/FilterableListBaseDemo';
import { TOP_100_MOVIES } from './FilterableListBase.stories/movies';

const meta = {
  component: FilterableListBaseDemo,
} satisfies Meta<typeof FilterableListBaseDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onItemSelect: (...args) => void sbHandleEvent('onItemSelect', args),
  w: 'max-content',
} satisfies Partial<IFilterableListBaseDemoProps>;

export const Basic: IStory = {
  render: (props) => <FilterableListBaseDemo {...props} />,
  args: defaultArgs,
};

export const CanFilter: IStory = {
  render: (props) => <FilterableListBaseDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <FilterableListBaseDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'king',
  },
};

export const CanCreate: IStory = {
  render: (props) => <FilterableListBaseDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    canCreate: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <FilterableListBaseDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <FilterableListBaseDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <FilterableListBaseDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    disabled: true,
  },
};

export default meta;
