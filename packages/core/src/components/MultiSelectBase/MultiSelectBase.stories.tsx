import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IMultiSelectBaseDemoProps } from './MultiSelectBase.stories/MultiSelectBaseDemo';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { TOP_100_MOVIES } from '~/components/FilterableListBase/FilterableListBase.stories/movies';
import { ListItem } from '~/components/List/ListItem';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { MultiSelectBaseDemo } from './MultiSelectBase.stories/MultiSelectBaseDemo';

const meta = {
  component: MultiSelectBaseDemo,
} satisfies Meta<typeof MultiSelectBaseDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$128',
  label: 'Movie',
  keepMounted: true,
  onItemsChange: (...args) => void sbHandleEvent('itemsChange', args),
  matchTargetWidth: true,
} satisfies Partial<IMultiSelectBaseDemoProps>;

const rows: Array<IComponentPresentation<IMultiSelectBaseDemoProps>> = [
  { legend: 'Filled' },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const MultiSelectBaseDemoShowcase =
  componentShowcaseFactory(MultiSelectBaseDemo);

export const Basic: IStory = {
  render: (props) => <MultiSelectBaseDemoShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export const DefaultValue: IStory = {
  render: (props) => <MultiSelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultItems: [TOP_100_MOVIES[2], TOP_100_MOVIES[5]],
  },
};

export const Clearable: IStory = {
  render: (props) => <MultiSelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultItems: [TOP_100_MOVIES[2], TOP_100_MOVIES[5]],
    clearable: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <MultiSelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultQuery: 'king',
  },
};

export const CanCreate: IStory = {
  render: (props) => <MultiSelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canCreate: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <MultiSelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <MultiSelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <MultiSelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const WithErrorText: IStory = {
  render: (props) => <MultiSelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export default meta;
