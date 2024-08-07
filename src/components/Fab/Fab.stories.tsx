import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import type { IFabProps } from './Fab.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '../ComponentShowcase';
import { Fab } from './Fab';

// https://m3.material.io/components/floating-action-button/overview
// https://material-web.dev/components/fab/
// https://github.com/material-components/material-web/blob/main/fab/demo/stories.ts

const meta = {
  component: Fab,
} satisfies Meta<typeof Fab>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('click', args, 1000),
} satisfies Partial<IFabProps>;

const svgColorIcon = (
  <svg viewBox='0 0 36 36'>
    <path fill='#4285F4' d='M30 16H20l-4 4h14z'></path>
    <path fill='#FBBC05' d='M6 16v4h10l4-4z'></path>
    <path fill='#34A853' d='M16 16v14h4V20z'></path>
    <path fill='#EA4335' d='M20 16V6h-4v14z'></path>
    <path fill='none' d='M0 0h36v36H0z'></path>
  </svg>
);

const states: Array<IComponentPresentation<IFabProps>> = [
  { legend: 'Enabled', props: { label: 'Enabled' } },
  {
    legend: 'Hovered',
    props: { label: 'Hovered', visualState: { hovered: true } },
  },
  {
    legend: 'Focused',
    props: { label: 'Focused', visualState: { focused: true } },
  },
  {
    legend: 'Pressed',
    props: { label: 'Pressed', visualState: { pressed: true } },
  },
  { legend: 'Loading', props: { label: 'Loading', loading: true } },
  {
    legend: 'Loading text',
    props: {
      label: 'Loading',
      loading: true,
      loadingText: '…',
    },
  },
  { legend: 'Disabled', props: { label: 'Disabled', disabled: true } },
];

const variants: Array<IComponentPresentation<IFabProps>> = [
  {
    legend: 'Surface',
    props: {
      variant: 'surface',
      children: <FontAwesomeIcon icon={faPaperPlane} />,
    },
  },
  {
    legend: 'Primary',
    props: {
      variant: 'primary',
      children: <FontAwesomeIcon icon={faPaperPlane} />,
    },
  },
  {
    legend: 'Secondary',
    props: {
      variant: 'secondary',
      children: <FontAwesomeIcon icon={faPaperPlane} />,
    },
  },
  {
    legend: 'Tertiary',
    props: {
      variant: 'tertiary',
      children: <FontAwesomeIcon icon={faPaperPlane} />,
    },
  },
  {
    legend: 'Branded',
    props: {
      variant: 'branded',
      children: svgColorIcon,
    },
  },
];

const sizes: Array<IComponentPresentation<IFabProps>> = [
  {
    legend: 'Small',
    props: { size: 'sm' },
  },
  {
    legend: 'Medium',
    props: { size: 'md' },
  },
  {
    legend: 'Large',
    props: { size: 'lg' },
  },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase component={Fab} props={props} cols={variants} />
  ),
  args: defaultArgs,
};

export const Sizes: IStory = {
  render: (props) => (
    <ComponentShowcase component={Fab} props={props} cols={sizes} />
  ),
  args: {
    ...defaultArgs,
    variant: 'surface',
    children: <FontAwesomeIcon icon={faPaperPlane} />,
  },
};

export const BrandedSizes: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Fab}
      props={props}
      cols={[
        { legend: 'Medium', props: { size: 'md' } },
        { legend: 'Large', props: { size: 'lg' } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'branded',
    children: svgColorIcon,
  },
};

export const Surface: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Fab}
      props={props}
      cols={states}
      rows={[
        {
          legend: 'Basic',
          props: {
            label: undefined,
            children: <FontAwesomeIcon icon={faPaperPlane} />,
          },
        },
        {
          legend: 'With label',
          props: { children: <FontAwesomeIcon icon={faPaperPlane} /> },
        },
        { legend: 'Label only' },
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
    <ComponentShowcase
      component={Fab}
      props={props}
      cols={states}
      rows={[
        {
          legend: 'Basic',
          props: {
            label: undefined,
            children: <FontAwesomeIcon icon={faPaperPlane} />,
          },
        },
        {
          legend: 'With label',
          props: { children: <FontAwesomeIcon icon={faPaperPlane} /> },
        },
        { legend: 'Label only' },
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
    <ComponentShowcase
      component={Fab}
      props={props}
      cols={states}
      rows={[
        {
          legend: 'Basic',
          props: {
            label: undefined,
            children: <FontAwesomeIcon icon={faPaperPlane} />,
          },
        },
        {
          legend: 'With label',
          props: { children: <FontAwesomeIcon icon={faPaperPlane} /> },
        },
        { legend: 'Label only' },
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
    <ComponentShowcase
      component={Fab}
      props={props}
      cols={states}
      rows={[
        {
          legend: 'Basic',
          props: {
            label: undefined,
            children: <FontAwesomeIcon icon={faPaperPlane} />,
          },
        },
        {
          legend: 'With label',
          props: { children: <FontAwesomeIcon icon={faPaperPlane} /> },
        },
        { legend: 'Label only' },
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
    <ComponentShowcase
      component={Fab}
      props={props}
      cols={states}
      rows={[
        { legend: 'Basic', props: { label: undefined } },
        { legend: 'With label' },
      ]}
      groups={[{}, { legend: 'Lowered', props: { lowered: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'branded',
    children: svgColorIcon,
  },
};

export default meta;
