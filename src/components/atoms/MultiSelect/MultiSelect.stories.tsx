import type { Meta, StoryObj } from '@storybook/react';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ListItem } from '@/components/atoms/ListItem';
import { fruits } from '@/components/atoms/FilterableList/fruits';
import { MultiSelect, type IMultiSelectProps } from './MultiSelect';

const meta = {
  component: MultiSelect,
} satisfies Meta<typeof MultiSelect>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('onChange', args),
  items: fruits,
  matchTargetWidth: true,
} satisfies Partial<IMultiSelectProps>;

export const Basic: IStory = {
  render: (props) => <MultiSelect {...props} />,
  args: defaultArgs,
};

export const DefaultQuery: IStory = {
  render: (props) => <MultiSelect {...props} />,
  args: {
    ...defaultArgs,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <MultiSelect {...props} />,
  args: {
    ...defaultArgs,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <MultiSelect {...props} />,
  args: {
    ...defaultArgs,
    initialContent: <ListItem disabled>{fruits.length} items loaded.</ListItem>,
  },
};

export const Disabled: IStory = {
  render: (props) => <MultiSelect {...props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export default meta;
