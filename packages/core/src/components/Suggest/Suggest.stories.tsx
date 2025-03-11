import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ISuggestProps } from './Suggest.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { fruits } from '~/components/FilterableList/FilterableList.stories/fruits';
import { px } from '~/utils/css';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Suggest } from './Suggest';

const meta = {
  component: Suggest,
} satisfies Meta<typeof Suggest>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => void sbHandleEvent('change', args),
  items: fruits,
  keepMounted: true,
  label: 'Label',
  supportingText: 'Supporting text',
  w: px(384),
} satisfies Partial<ISuggestProps>;

const cols: Array<IComponentPresentation<ISuggestProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'Error',
    props: {
      hasError: true,
      errorText: 'Error text',
    },
  },
  {
    legend: 'Loading',
    props: {
      loading: true,
    },
  },
  {
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const rows: Array<IComponentPresentation<ISuggestProps>> = [
  {
    legend: 'Filled',
    props: {
      variant: 'filled',
    },
  },
  {
    legend: 'Outlined',
    props: {
      variant: 'outlined',
    },
  },
];

const SuggestShowcase = componentShowcaseFactory(Suggest);

export const Basic: IStory = {
  render: (props) => (
    <SuggestShowcase
      props={props}
      cols={cols}
      rows={rows}
      verticalAlign="start"
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <SuggestShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

export const Densities: IStory = {
  render: (props) => (
    <SuggestShowcase
      props={props}
      cols={[
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

export default meta;
