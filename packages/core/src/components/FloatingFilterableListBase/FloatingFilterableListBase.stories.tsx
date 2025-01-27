import type { Meta, StoryObj } from '@storybook/react';

import type { IFloatingFilterableListBaseDemoProps } from './FloatingFilterableListBase.stories/FloatingFilterableListBaseDemo';
import { TOP_100_MOVIES } from '~/components/FilterableListBase/FilterableListBase.stories/movies';
import { ListItem } from '~/components/List/ListItem';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { FloatingFilterableListBaseDemo } from './FloatingFilterableListBase.stories/FloatingFilterableListBaseDemo';

const meta = {
  component: FloatingFilterableListBaseDemo,
} satisfies Meta<typeof FloatingFilterableListBaseDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$96',
  onItemChange: (...args) => void sbHandleEvent('onItemChange', args),
} satisfies Partial<IFloatingFilterableListBaseDemoProps>;

export const Basic: IStory = {
  render: (props) => <FloatingFilterableListBaseDemo {...props} />,
  args: defaultArgs,
};

export const CanFilter: IStory = {
  render: (props) => <FloatingFilterableListBaseDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <FloatingFilterableListBaseDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'king',
  },
};

export const CanCreate: IStory = {
  render: (props) => <FloatingFilterableListBaseDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    canCreate: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <FloatingFilterableListBaseDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <FloatingFilterableListBaseDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <FloatingFilterableListBaseDemo {...props} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    disabled: true,
  },
};

export default meta;
