import type { Meta, StoryObj } from '@storybook/react';
import { delay } from '@olivierpascal/helpers';

import type { IItem } from './Sortable.stories/SortableItemDemo';
import type { ISortableProps } from './Sortable.types';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Sortable } from './Sortable';
import { SortableGridDemo } from './Sortable.stories/SortableGridDemo';
import { SortableItemDemo } from './Sortable.stories/SortableItemDemo';
import { SortableListDemo } from './Sortable.stories/SortableListDemo';

const meta = {
  component: Sortable,
} satisfies Meta<ISortableProps<IItem>>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  value: ['1', '2', '3', '4'],
  onReorder: (...args) => sbHandleEvent('onReorder', args),
  onDelete: (...args) => sbHandleEvent('onDelete', args),
  onChange: (...args) => sbHandleEvent('onChange', args),
} satisfies Partial<ISortableProps<IItem>>;

export const Horizontal: IStory = {
  render: (props) => <SortableListDemo {...props} />,
  args: {
    ...defaultArgs,
    axis: 'horizontal',
    children: ({ sortableItems }) =>
      sortableItems.map((sortableItem) => (
        <SortableItemDemo key={sortableItem.id} {...sortableItem} />
      )),
  },
};

export const Vertical: IStory = {
  render: (props) => <SortableListDemo {...props} />,
  args: {
    ...defaultArgs,
    axis: 'vertical',
    children: ({ sortableItems }) =>
      sortableItems.map((sortableItem) => (
        <SortableItemDemo key={sortableItem.id} {...sortableItem} />
      )),
  },
};

export const Grid: IStory = {
  render: (props) => <SortableGridDemo {...props} />,
  args: {
    ...defaultArgs,
    children: ({ sortableItems }) =>
      sortableItems.map((sortableItem) => (
        <SortableItemDemo key={sortableItem.id} {...sortableItem} expanded />
      )),
  },
};

export const OptimisticWithSuccess: IStory = {
  render: (props) => <SortableListDemo {...props} />,
  args: {
    ...defaultArgs,
    children: ({ sortableItems }) =>
      sortableItems.map((sortableItem) => (
        <SortableItemDemo key={sortableItem.id} {...sortableItem} />
      )),
    onChange: () => delay(2000),
  },
};

export const OptimisticWithFailure: IStory = {
  render: (props) => <SortableListDemo {...props} />,
  args: {
    ...defaultArgs,
    children: ({ sortableItems }) =>
      sortableItems.map((sortableItem) => (
        <SortableItemDemo key={sortableItem.id} {...sortableItem} />
      )),
    onChange: async () => {
      await delay(2000);
      throw new Error('Failed');
    },
  },
};

export const MinChangeDuration: IStory = {
  render: (props) => <SortableListDemo {...props} />,
  args: {
    ...defaultArgs,
    children: ({ sortableItems }) =>
      sortableItems.map((sortableItem) => (
        <SortableItemDemo key={sortableItem.id} {...sortableItem} />
      )),
    minChangeDuration: 330,
  },
};

export default meta;
