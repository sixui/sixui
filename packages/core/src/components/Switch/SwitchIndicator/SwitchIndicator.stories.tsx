import type { Meta, StoryObj } from '@storybook/react';
import {
  faMinus,
  faMoon,
  faPlus,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ISwitchIndicatorProps } from './SwitchIndicator.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { SwitchIndicator } from './SwitchIndicator';

const meta = {
  component: SwitchIndicator,
} satisfies Meta<typeof SwitchIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ISwitchIndicatorProps>;

const states: Array<IComponentPresentation<ISwitchIndicatorProps>> = [
  { legend: 'Normal' },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const configurationsGroups: Array<
  IComponentPresentation<ISwitchIndicatorProps>
> = [
  {
    legend: 'Basic',
  },
  {
    legend: 'With checked icon',
    props: { checkedIcon: true },
  },
  {
    legend: 'With icons',
    props: {
      checkedIcon: true,
      uncheckedIcon: true,
    },
  },
  {
    legend: 'With custom icons',
    props: {
      uncheckedIcon: <FontAwesomeIcon icon={faMinus} />,
      checkedIcon: <FontAwesomeIcon icon={faPlus} />,
    },
  },
  {
    legend: 'Always on',
    props: {
      uncheckedIcon: <FontAwesomeIcon icon={faMoon} />,
      checkedIcon: <FontAwesomeIcon icon={faSun} />,
      alwaysOn: true,
    },
  },
];

const SwitchIndicatorShowcase = componentShowcaseFactory(SwitchIndicator);

export const Variants: IStory = {
  render: (props) => (
    <SwitchIndicatorShowcase
      props={props}
      cols={[{ props: { checked: false } }, { props: { checked: true } }]}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <SwitchIndicatorShowcase
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
  args: defaultArgs,
};

export const Densities: IStory = {
  render: (props) => (
    <SwitchIndicatorShowcase
      props={props}
      cols={[
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Configurations: IStory = {
  render: (props) => (
    <SwitchIndicatorShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked' },
        { legend: 'Checked', props: { checked: true } },
      ]}
      groups={configurationsGroups}
    />
  ),
  args: defaultArgs,
};

export const ConfigurationsWithError: IStory = {
  render: (props) => (
    <SwitchIndicatorShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Unchecked' },
        { legend: 'Checked', props: { checked: true } },
      ]}
      groups={configurationsGroups}
    />
  ),
  args: {
    ...defaultArgs,
    hasError: true,
  },
};

export default meta;
