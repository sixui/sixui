import type { Meta, StoryObj } from '@storybook/react';



import type { IComponentPresentation } from '../ComponentShowcase';
import type { IColorTagProps } from './ColorTag.types';
import { iconCheckmark } from '~/assets/icons';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { SvgIcon } from '../SvgIcon';
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
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IColorTagProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'With label',
    props: {
      children: '#abcdef',
    },
  },
  {
    legend: 'With icon',
    props: {
      leadingIcon: <SvgIcon icon={iconCheckmark} />,
    },
  },
  {
    legend: 'With label and icon',
    props: {
      children: '#abcdef',
      leadingIcon: <SvgIcon icon={iconCheckmark} />,
    },
  },
  {
    legend: 'Empty',
    props: {
      color: undefined,
    },
  },
  {
    legend: 'With invalid color',
    props: {
      backgroundColor: 'invalid',
    },
  },
];

const groups: Array<IComponentPresentation<IColorTagProps>> = [
  { legend: 'Normal' },
  { legend: 'Outlined', props: { outlined: true } },
];

export const DarkColor: IStory = {
  render: (props) => (
    <ColorTagShowcase props={props} cols={states} rows={rows} groups={groups} />
  ),
  args: {
    ...defaultArgs,
    backgroundColor: '#000000',
  },
};

export const LightColor: IStory = {
  render: (props) => (
    <ColorTagShowcase props={props} cols={states} rows={rows} groups={groups} />
  ),
  args: {
    ...defaultArgs,
    backgroundColor: '#ffffff',
  },
};

export default meta;