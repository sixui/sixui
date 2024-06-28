import type { Meta, StoryObj } from '@storybook/react';

import {
  FilteredListExample,
  type IFilteredListExampleProps,
} from './FilteredListExample';

const meta = {
  component: FilteredListExample,
} satisfies Meta<typeof FilteredListExample>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IFilteredListExampleProps>;

export const Basic: IStory = {
  render: (props) => <FilteredListExample {...props} />,
  args: {
    ...defaultArgs,
  },
};

export default meta;
