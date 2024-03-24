import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import {
  IconButton,
  type IIconButtonProps,
  type IIconButtonOwnProps,
} from './IconButton';
import { iconbuttonVariants } from './IconButton.styledefs';

// https://m3.material.io/components/icon-buttons/overview
// https://material-web.dev/components/icon-button/
// https://github.com/material-components/material-web/blob/main/iconbutton/demo/stories.ts

const meta = {
  component: IconButton,
} satisfies Meta<typeof IconButton>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('click', args, 300),
  icon: <FontAwesomeIcon icon={faHeart} />,
  selectedIcon: <FontAwesomeIcon icon={faHeartSolid} />,
} satisfies Partial<IIconButtonProps>;

const states: Array<IComponentPresentation<IIconButtonOwnProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Pressed', props: { visualState: { pressed: true } } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IIconButtonOwnProps>> = [
  { legend: 'Basic', props: { toggle: false } },
  { legend: 'Selectable', props: { toggle: true } },
  { legend: 'Selected', props: { toggle: true, selected: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={IconButton}
      props={props}
      cols={iconbuttonVariants.map((variant) => ({ props: { variant } }))}
    />
  ),
  args: defaultArgs,
};

export const Standard: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={IconButton}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'standard',
  },
};

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={IconButton}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const FilledTonal: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={IconButton}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filledTonal',
  },
};

export const Outlined: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={IconButton}
      props={props}
      cols={states}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
