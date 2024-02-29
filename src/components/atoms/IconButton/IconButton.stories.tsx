import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { IconButton, type IIconButtonProps } from './IconButton';
import { iconbuttonVariants } from './IconButton.styledefs';

// https://m3.material.io/components/icon-buttons/overview
// https://material-web.dev/components/icon-button/
// https://github.com/material-components/material-web/blob/main/iconbutton/demo/stories.ts

const meta = {
  component: IconButton,
} satisfies Meta<typeof IconButton>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (args) => sbHandleEvent('click', args),
  icon: <FontAwesomeIcon icon={faHeart} />,
  selectedIcon: <FontAwesomeIcon icon={faHeartSolid} />,
} satisfies Partial<IIconButtonProps>;

const statesProps: IComponentPropsWithLegend<IIconButtonProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Loading', loading: true },
  { $legend: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<IIconButtonProps> = [
  { $legend: 'Basic', toggle: false },
  { $legend: 'Selectable', toggle: true },
  { $legend: 'Selected', toggle: true, selected: true },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={IconButton}
      props={props}
      colsProps={iconbuttonVariants.map((variant) => ({ variant }))}
    />
  ),
  args: defaultArgs,
};

export const Standard: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={IconButton}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
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
      colsProps={statesProps}
      rowsProps={rowsProps}
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
      colsProps={statesProps}
      rowsProps={rowsProps}
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
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export default meta;
