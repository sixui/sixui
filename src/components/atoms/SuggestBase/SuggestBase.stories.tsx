import type { Meta, StoryObj } from '@storybook/react';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ListItem } from '@/components/atoms/ListItem';
import { TOP_100_MOVIES } from '@/components/atoms/FilterableListBase/movies';
import {
  SuggestBaseExample,
  type ISuggestBaseExampleProps,
} from './SuggestBaseExample';

const meta = {
  component: SuggestBaseExample,
} satisfies Meta<typeof SuggestBaseExample>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('onChange', args),
  matchTargetWidth: true,
} satisfies Partial<ISuggestBaseExampleProps>;

export const Basic: IStory = {
  render: (props) => <SuggestBaseExample {...props} />,
  args: defaultArgs,
};

export const DefaultValue: IStory = {
  render: (props) => <SuggestBaseExample {...props} />,
  args: {
    ...defaultArgs,
    defaultValue: TOP_100_MOVIES[2],
  },
};

export const CanCreate: IStory = {
  render: (props) => <SuggestBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canCreate: true,
  },
};

export const InitialContent: IStory = {
  render: (props) => <SuggestBaseExample {...props} />,
  args: {
    ...defaultArgs,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <SuggestBaseExample {...props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export default meta;
