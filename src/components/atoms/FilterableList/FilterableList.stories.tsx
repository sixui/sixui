import type { Meta, StoryObj } from '@storybook/react';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ListItem } from '@/components/atoms/ListItem';
import { fruits } from './fruits';
import { FilterableList, type IFilterableListProps } from './FilterableList';

const meta = {
  component: FilterableList,
} satisfies Meta<typeof FilterableList>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onItemSelect: (...args) => void sbHandleEvent('onItemSelect', args),
  items: fruits,
} satisfies Partial<IFilterableListProps>;

export const Basic: IStory = {
  render: (props) => <FilterableList {...props} />,
  args: defaultArgs,
};

export const CanFilter: IStory = {
  render: (props) => <FilterableList {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <FilterableList {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'le',
  },
};

export const NoResults: IStory = {
  render: (props) => <FilterableList {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'My favorite fruit',
  },
};

export const InitialContent: IStory = {
  render: (props) => <FilterableList {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    initialContent: <ListItem disabled>{fruits.length} items loaded.</ListItem>,
  },
};

export const Disabled: IStory = {
  render: (props) => <FilterableList {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    disabled: true,
  },
};

export default meta;
