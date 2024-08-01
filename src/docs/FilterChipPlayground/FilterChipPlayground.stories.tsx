import type { Meta, StoryObj } from '@storybook/react';

import { FilterChipPlayground } from './FilterChipPlayground';

const meta = {
  component: FilterChipPlayground,
} satisfies Meta<typeof FilterChipPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <FilterChipPlayground {...props} />,
};

export default meta;
