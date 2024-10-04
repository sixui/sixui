import type { Meta, StoryObj } from '@storybook/react';

import type { IFloatingFilterableListBaseExampleProps } from './FloatingFilterableListBaseExample';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { TOP_100_MOVIES } from '../FilterableListBase/movies';
import { ListItem } from '../ListItem';
import { FloatingFilterableListBaseExample } from './FloatingFilterableListBaseExample';

const meta = {
  component: FloatingFilterableListBaseExample,
} satisfies Meta<typeof FloatingFilterableListBaseExample>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '480px',
  variant: 'outlined', // FIXME:
} satisfies Partial<IFloatingFilterableListBaseExampleProps>;

export const Basic: IStory = {
  render: (props) => <FloatingFilterableListBaseExample {...props} />,
  args: defaultArgs,
};

export const CanFilter: IStory = {
  render: (props) => <FloatingFilterableListBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <FloatingFilterableListBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'king',
  },
};

export const CanCreate: IStory = {
  render: (props) => <FloatingFilterableListBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    canCreate: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <FloatingFilterableListBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <FloatingFilterableListBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <FloatingFilterableListBaseExample {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    disabled: true,
  },
};

export default meta;
