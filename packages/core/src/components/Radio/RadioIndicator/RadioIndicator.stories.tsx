import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IRadioIndicatorProps } from './RadioIndicator.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { RadioIndicator } from './RadioIndicator';

const meta = {
  component: RadioIndicator,
} satisfies Meta<typeof RadioIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IRadioIndicatorProps>;

const states: Array<IComponentPresentation<IRadioIndicatorProps>> = [
  { legend: 'Normal' },
  { legend: 'Error', props: { hasError: true } },
  { legend: 'Disabled', props: { disabled: true } },
  { legend: 'Loading', props: { loading: true } },
];

const RadioIndicatorShowcase = componentShowcaseFactory(RadioIndicator);

export const Variants: IStory = {
  render: (props) => (
    <RadioIndicatorShowcase
      props={props}
      cols={[{ props: { checked: false } }, { props: { checked: true } }]}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <RadioIndicatorShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    checked: true,
  },
};

export const Densities: IStory = {
  render: (props) => (
    <RadioIndicatorShowcase
      props={props}
      cols={[
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    checked: true,
  },
};

export const Configurations: IStory = {
  render: (props) => (
    <RadioIndicatorShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked', props: { checked: false } },
        { legend: 'Checked', props: { checked: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
