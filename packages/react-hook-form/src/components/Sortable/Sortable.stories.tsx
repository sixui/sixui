import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import type { ISortableListDemoProps } from './Sortable.stories/SortableListDemo';
import { SortableItemDemo } from './Sortable.stories/SortableItemDemo';
import { SortableListDemo } from './Sortable.stories/SortableListDemo';

const FIELD_NAME = 'fieldName';

const meta = {
  component: SortableListDemo,
} satisfies Meta<ISortableListDemoProps>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  name: FIELD_NAME,
  children: ({ sortableItems }) =>
    sortableItems.map((sortableItem) => (
      <SortableItemDemo key={sortableItem.id} {...sortableItem} />
    )),
  onReorder: (...args) => {
    action('onReorder')(args);
  },
  onDelete: (...args) => {
    action('onDelete')(args);
  },
  onChange: (...args) => {
    action('onChange')(args);
  },
} satisfies Partial<ISortableListDemoProps>;

export const Basic: IStory = {
  args: {
    ...defaultArgs,
    axis: 'horizontal',
  },
  parameters: {
    form: {
      defaultValues: {
        [FIELD_NAME]: ['A', 'B', 'C'],
      },
    },
  },
};

export const Required: IStory = {
  args: {
    ...defaultArgs,
    required: true,
  },
  parameters: {
    form: {
      defaultValues: {
        [FIELD_NAME]: ['A', 'B', 'C'],
      },
    },
  },
};

export default meta;
