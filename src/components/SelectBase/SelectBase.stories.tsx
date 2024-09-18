import type { Meta, StoryObj } from '@storybook/react';

import type { ISelectBaseExampleProps } from './SelectBaseExample';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { TOP_100_MOVIES } from '../FilterableListBase/movies';
import { ListItem } from '../ListItem';
import { SelectBaseExample } from './SelectBaseExample';

const meta = {
  component: SelectBaseExample,
} satisfies Meta<typeof SelectBaseExample>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onItemChange: (...args) => void sbHandleEvent('itemChange', args),
  matchTargetWidth: true,
} satisfies Partial<ISelectBaseExampleProps>;

export const Basic: IStory = {
  render: (props) => <SelectBaseExample {...props} />,
  args: defaultArgs,
};

export const DefaultValue: IStory = {
  render: (props) => <SelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    defaultItem: TOP_100_MOVIES[2],
  },
};

export const Clearable: IStory = {
  render: (props) => <SelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    defaultItem: TOP_100_MOVIES[2],
    clearable: true,
  },
};

export const CanFilter: IStory = {
  render: (props) => <SelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <SelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'king',
  },
};

export const CanCreate: IStory = {
  render: (props) => <SelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    canCreate: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <SelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <SelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <SelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    disabled: true,
  },
};

export const WithErrorText: IStory = {
  render: (props) => <SelectBaseExample {...props} />,
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export default meta;
