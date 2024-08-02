import type { Meta, StoryObj } from '@storybook/react';

import { SuggestionChipPlayground } from './SuggestionChipPlayground';

const meta = {
  component: SuggestionChipPlayground,
} satisfies Meta<typeof SuggestionChipPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <SuggestionChipPlayground {...props} />,
};

export default meta;
