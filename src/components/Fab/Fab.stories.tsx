import type { Meta, StoryObj } from '@storybook/react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IFabProps } from './Fab.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Fab } from './Fab';

// https://m3.material.io/components/floating-action-button/overview
// https://material-web.dev/components/fab/
// https://github.com/material-components/material-web/blob/main/fab/demo/stories.ts

const meta = {
  component: Fab,
} satisfies Meta<typeof Fab>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onPress: (...args) => sbHandleEvent('onPsres', args, 1000),
  icon: <FontAwesomeIcon icon={faPaperPlane} />,
} satisfies Partial<IFabProps>;

const svgColorIcon = (
  <svg viewBox="0 0 36 36">
    <path fill="#4285F4" d="M30 16H20l-4 4h14z" />
    <path fill="#FBBC05" d="M6 16v4h10l4-4z" />
    <path fill="#34A853" d="M16 16v14h4V20z" />
    <path fill="#EA4335" d="M20 16V6h-4v14z" />
    <path fill="none" d="M0 0h36v36H0z" />
  </svg>
);

const states: Array<IComponentPresentation<IFabProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { interactions: { focused: true } } },
  { legend: 'Hovered', props: { interactions: { hovered: true } } },
  { legend: 'Pressed', props: { interactions: { pressed: true } } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const FabShowcase = componentShowcaseFactory(Fab);

export const Variants: IStory = {
  render: (props) => (
    <FabShowcase
      props={props}
      cols={[
        { legend: 'Surface', props: { variant: 'surface' } },
        { legend: 'Primary', props: { variant: 'primary' } },
        { legend: 'Secondary', props: { variant: 'secondary' } },
        { legend: 'Tertiary', props: { variant: 'tertiary' } },
        {
          legend: 'Branded',
          props: {
            variant: 'branded',
            icon: svgColorIcon,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <FabShowcase
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
    variant: 'surface',
    icon: <FontAwesomeIcon icon={faPaperPlane} />,
  },
};

export const Surface: IStory = {
  render: (props) => (
    <FabShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Basic' },
        { legend: 'With label', props: { children: 'Label' } },
        { legend: 'Label only', props: { children: 'Label', icon: undefined } },
      ]}
      groups={[{}, { legend: 'Lowered', props: { lowered: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'surface',
  },
};

export const Primary: IStory = {
  render: (props) => (
    <FabShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Basic' },
        { legend: 'With label', props: { children: 'Label' } },
        { legend: 'Label only', props: { children: 'Label', icon: undefined } },
      ]}
      groups={[{}, { legend: 'Lowered', props: { lowered: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'primary',
  },
};

export const Secondary: IStory = {
  render: (props) => (
    <FabShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Basic' },
        { legend: 'With label', props: { children: 'Label' } },
        { legend: 'Label only', props: { children: 'Label', icon: undefined } },
      ]}
      groups={[{}, { legend: 'Lowered', props: { lowered: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'secondary',
  },
};

export const Tertiary: IStory = {
  render: (props) => (
    <FabShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Basic' },
        { legend: 'With label', props: { children: 'Label' } },
        { legend: 'Label only', props: { children: 'Label', icon: undefined } },
      ]}
      groups={[{}, { legend: 'Lowered', props: { lowered: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'tertiary',
  },
};

export const Branded: IStory = {
  render: (props) => (
    <FabShowcase
      props={props}
      cols={states}
      rows={[
        { legend: 'Basic' },
        { legend: 'With label', props: { children: 'Label' } },
      ]}
      groups={[{}, { legend: 'Lowered', props: { lowered: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'branded',
    icon: svgColorIcon,
  },
};

export default meta;
