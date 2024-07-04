import type { Meta, StoryObj } from '@storybook/react';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ListItem } from '@/components/atoms/ListItem';
import { fruits } from '@/components/atoms/FilterableList/fruits';
import { Suggest, type ISuggestProps } from './Suggest';

const meta = {
  component: Suggest,
} satisfies Meta<typeof Suggest>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('onChange', args),
  items: fruits,
  matchTargetWidth: true,
} satisfies Partial<ISuggestProps>;

export const Basic: IStory = {
  render: (props) => <Suggest {...props} />,
  args: defaultArgs,
};

export const InitialContent: IStory = {
  render: (props) => <Suggest {...props} />,
  args: {
    ...defaultArgs,
    initialContent: <ListItem disabled>{fruits.length} items loaded.</ListItem>,
  },
};

export const Disabled: IStory = {
  render: (props) => <Suggest {...props} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export default meta;
