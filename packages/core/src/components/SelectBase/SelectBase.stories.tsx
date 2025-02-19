import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ISelectBaseDemoProps } from './SelectBase.stories/SelectBaseDemo';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { TOP_100_MOVIES } from '~/components/FilterableListBase/FilterableListBase.stories/movies';
import { ListItem } from '~/components/List/ListItem';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { SelectBaseDemo } from './SelectBase.stories/SelectBaseDemo';

const meta = {
  component: SelectBaseDemo,
} satisfies Meta<typeof SelectBaseDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$96',
  label: 'Movie',
  keepMounted: true,
  onItemChange: (...args) => void sbHandleEvent('onItemChange', args),
} satisfies Partial<ISelectBaseDemoProps>;

const rows: Array<IComponentPresentation<ISelectBaseDemoProps>> = [
  { legend: 'Filled' },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const SelectBaseDemoShowcase = componentShowcaseFactory(SelectBaseDemo);

export const Basic: IStory = {
  render: (props) => <SelectBaseDemoShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export const DefaultValue: IStory = {
  render: (props) => <SelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultItem: TOP_100_MOVIES[2],
  },
};

export const Clearable: IStory = {
  render: (props) => <SelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultItem: TOP_100_MOVIES[2],
    clearable: true,
  },
};

export const CanFilter: IStory = {
  render: (props) => <SelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
  },
};

export const DefaultQuery: IStory = {
  render: (props) => <SelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'king',
  },
};

export const CanCreate: IStory = {
  render: (props) => <SelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    canCreate: true,
    defaultQuery: 'king',
  },
};

export const NoResults: IStory = {
  render: (props) => <SelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    defaultQuery: 'My great movie',
  },
};

export const InitialContent: IStory = {
  render: (props) => <SelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <SelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canFilter: true,
    disabled: true,
  },
};

export const WithErrorText: IStory = {
  render: (props) => <SelectBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export default meta;
