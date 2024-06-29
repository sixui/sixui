import type { Meta, StoryObj } from '@storybook/react';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ListItem } from '@/components/atoms/ListItem';
import { TOP_100_MOVIES } from '@/components/atoms/FilterableList/movies';
import { SuggestExample, type ISuggestExampleProps } from './SuggestExample';

const meta = {
  component: SuggestExample,
} satisfies Meta<typeof SuggestExample>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('onChange', args),
  onItemsRemove: (...args) => void sbHandleEvent('onItemsRemove', args),
  matchTargetWidth: true,
} satisfies Partial<ISuggestExampleProps>;

export const Basic: IStory = {
  render: (props) => <SuggestExample {...props} />,
  args: defaultArgs,
};

export const CanCreate: IStory = {
  render: (props) => <SuggestExample {...props} />,
  args: {
    ...defaultArgs,
    canCreate: true,
  },
};

export const InitialContent: IStory = {
  render: (props) => <SuggestExample {...props} />,
  args: {
    ...defaultArgs,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <SuggestExample {...props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export default meta;
