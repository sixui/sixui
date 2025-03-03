import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ISuggestBaseDemoProps } from './SuggestBase.stories/SuggestBaseDemo';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { TOP_100_MOVIES } from '~/components/FilterableListBase/FilterableListBase.stories/movies';
import { ListItem } from '~/components/List/ListItem';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { SuggestBaseDemo } from './SuggestBase.stories/SuggestBaseDemo';

const meta = {
  component: SuggestBaseDemo,
} satisfies Meta<typeof SuggestBaseDemo>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '384px',
  label: 'Movie',
  keepMounted: true,
  onItemChange: (...args) => void sbHandleEvent('itemChange', args),
} satisfies Partial<ISuggestBaseDemoProps>;

const rows: Array<IComponentPresentation<ISuggestBaseDemoProps>> = [
  { legend: 'Filled' },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const SuggestBaseDemoShowcase = componentShowcaseFactory(SuggestBaseDemo);

export const Basic: IStory = {
  render: (props) => <SuggestBaseDemoShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export const DefaultValue: IStory = {
  render: (props) => <SuggestBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultItem: TOP_100_MOVIES[2],
  },
};

export const Clearable: IStory = {
  render: (props) => <SuggestBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    defaultItem: TOP_100_MOVIES[2],
    clearable: true,
  },
};

export const CanCreate: IStory = {
  render: (props) => <SuggestBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    canCreate: true,
  },
};

export const InitialContent: IStory = {
  render: (props) => <SuggestBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    initialContent: (
      <ListItem disabled>{TOP_100_MOVIES.length} items loaded.</ListItem>
    ),
  },
};

export const Disabled: IStory = {
  render: (props) => <SuggestBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    disabled: true,
  },
};

export const WithErrorText: IStory = {
  render: (props) => <SuggestBaseDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    hasError: true,
    errorText: 'Error text',
  },
};

export default meta;
