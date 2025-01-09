import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IColorTagProps } from './ColorTag.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { ColorTag } from './ColorTag';

const meta = {
  component: ColorTag,
} satisfies Meta<typeof ColorTag>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('onClick', args, 1000),
} satisfies Partial<IColorTagProps>;

const ColorTagShowcase = componentShowcaseFactory(ColorTag);

const states: Array<IComponentPresentation<IColorTagProps>> = [
  { legend: 'Non-interactive', props: { nonInteractive: true } },
  {
    legend: 'Normal',
  },
  {
    legend: 'Focused',
    props: { interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { interactions: { pressed: true } },
  },
  { legend: 'Loading', props: { loading: true } },
  {
    legend: 'Loading text',
    props: {
      loading: true,
      loadingText: '…',
    },
  },
  { legend: 'Disabled', props: { children: 'Disabled', disabled: true } },
];

const rows: Array<IComponentPresentation<IColorTagProps>> = [
  {
    legend: 'Empty',
  },
  {
    legend: 'With color',
    props: {
      backgroundColor: '#6750a4',
    },
  },
  {
    legend: 'With label',
    props: {
      backgroundColor: '#6750a4',
      children: '#6750a4',
    },
  },
  {
    legend: 'Selected',
    props: {
      backgroundColor: '#6750a4',
      selected: true,
    },
  },
  {
    legend: 'With invalid color',
    props: {
      backgroundColor: 'invalid',
    },
  },
];

export const Configurations: IStory = {
  render: (props) => (
    <ColorTagShowcase props={props} cols={states} rows={rows} />
  ),
  args: defaultArgs,
};

export default meta;
