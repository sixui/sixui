import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';

import type { IIconButtonProps, IIconButtonVariant } from './IconButton.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '../ComponentShowcase';
import { IconButton } from './IconButton';

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

const states: Array<IComponentPresentation<IIconButtonProps>> = [
  { legend: 'Enabled' },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Pressed', props: { visualState: { pressed: true } } },
  { legend: 'Loading', props: { loading: true } },
  { legend: 'Disabled', props: { disabled: true } },
];

const rows: Array<IComponentPresentation<IIconButtonProps>> = [
  { legend: 'Basic', props: { toggle: false } },
  { legend: 'Togglable', props: { toggle: true } },
  { legend: 'Toggled', props: { toggle: true, selected: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={IconButton}
      verticalAlign='center'
      props={props}
      cols={(
        [
          'standard',
          'filled',
          'filledTonal',
          'outlined',
          'danger',
          'snackbar',
        ] as Array<IIconButtonVariant>
      ).map((variant) => ({ props: { variant } }))}
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

export const Danger: IStory = {
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
    variant: 'danger',
  },
};

export const Snackbar: IStory = {
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
    variant: 'snackbar',
  },
};

export default meta;
