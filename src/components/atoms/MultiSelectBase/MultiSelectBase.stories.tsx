import type { Meta, StoryObj } from '@storybook/react';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ListItem } from '@/components/atoms/ListItem';
import { TOP_100_MOVIES } from '@/components/atoms/FilterableListBase/movies';
import {
  MultiSelectBaseExample,
  type IMultiSelectBaseExampleProps,
} from './MultiSelectBaseExample';

const meta = {
  component: MultiSelectBaseExample,
} satisfies Meta<typeof MultiSelectBaseExample>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onItemsChange: (...args) => void sbHandleEvent('onChange', args),
  matchTargetWidth: true,
} satisfies Partial<IMultiSelectBaseExampleProps>;

export const Basic: IStory = {
  render: (props) => <MultiSelectBaseExample {...props} />,
  args: defaultArgs,
};

export const DefaultValue: IStory = {
  render: (props) => <MultiSelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    defaultItems: [TOP_100_MOVIES[2], TOP_100_MOVIES[5]],
  },
};

export const Clearable: IStory = {
  render: (props) => <MultiSelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    defaultItems: [TOP_100_MOVIES[2], TOP_100_MOVIES[5]],
    clearable: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <MultiSelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    defaultQuery: 'king',
  },
};

export const CanCreate: IStory = {
  render: (props) => <MultiSelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canCreate: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <MultiSelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <MultiSelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <MultiSelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export default meta;
