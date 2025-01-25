import type { Meta, StoryObj } from '@storybook/react';
import {
  faArrowUpRightFromSquare,
  faChevronRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IButtonProps, IButtonVariant } from './Button.types';
import { Badge } from '~/components/Badge';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Text as SixuiText } from '~/components/Text';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Button } from './Button';

// https://m3.material.io/components/buttons/overview
// https://material-web.dev/components/button/
// https://github.com/material-components/material-web/blob/main/button/demo/stories.ts

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('onClick', args, 1000),
  children: 'Button',
} satisfies Partial<IButtonProps>;

const states: Array<IComponentPresentation<IButtonProps>> = [
  {
    legend: 'Normal',
    props: { children: 'Normal' },
  },
  {
    legend: 'Focused',
    props: { children: 'Focused', interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { children: 'Hovered', interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { children: 'Pressed', interactions: { pressed: true } },
  },
  { legend: 'Loading', props: { children: 'Loading', loading: true } },
  {
    legend: 'Loading text',
    props: {
      children: 'Loading',
      loading: true,
      loadingText: '…',
    },
  },
  { legend: 'Read-only', props: { children: 'Read-only', readOnly: true } },
  { legend: 'Disabled', props: { children: 'Disabled', disabled: true } },
];

const rows: Array<IComponentPresentation<IButtonProps>> = [
  { legend: 'Basic' },
  {
    legend: 'With leading icon',
    props: {
      leadingIcon: <FontAwesomeIcon icon={faPlus} />,
    },
  },
  {
    legend: 'With trailing icon',
    props: {
      trailingIcon: <FontAwesomeIcon icon={faChevronRight} />,
    },
  },
  {
    legend: 'With leading and trailing icon',
    props: {
      leadingIcon: <FontAwesomeIcon icon={faPlus} />,
      trailingIcon: <FontAwesomeIcon icon={faChevronRight} />,
    },
  },
  {
    legend: 'With leading icon and end slot',
    props: {
      leadingIcon: <FontAwesomeIcon icon={faPlus} />,
      end: <Badge value="2" />,
    },
  },
  {
    legend: 'With start slot and trailing icon',
    props: {
      start: <Badge value="2" />,
      trailingIcon: <FontAwesomeIcon icon={faChevronRight} />,
    },
  },
];

const ButtonShowcase = componentShowcaseFactory(Button);

export const Variants: IStory = {
  render: (props) => (
    <ButtonShowcase
      props={props}
      cols={(
        [
          'elevated',
          'filled',
          'filledTonal',
          'outlined',
          'text',
          'danger',
          'snackbar',
          'inline',
        ] as Array<IButtonVariant>
      ).map((variant) => ({
        props: {
          variant,
          children: capitalizeFirstLetter(variant),
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <ButtonShowcase
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
    variant: 'filled',
  },
};

export const Densities: IStory = {
  render: (props) => (
    <ButtonShowcase
      props={props}
      cols={[
        { legend: '-4', props: { density: -4 } },
        { legend: '-3', props: { density: -3 } },
        { legend: '-2', props: { density: -2 } },
        { legend: '-1', props: { density: -1 } },
        { legend: '0', props: { density: 0 } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const Elevated: IStory = {
  render: (props) => <ButtonShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'elevated',
  },
};

export const Filled: IStory = {
  render: (props) => <ButtonShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'filled',
  },
};

export const FilledTonal: IStory = {
  render: (props) => <ButtonShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'filledTonal',
  },
};

export const Outlined: IStory = {
  render: (props) => <ButtonShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'outlined',
  },
};

export const Text: IStory = {
  render: (props) => <ButtonShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'text',
  },
};

export const Danger: IStory = {
  render: (props) => <ButtonShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'danger',
  },
};

export const Snackbar: IStory = {
  render: (props) => <ButtonShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'snackbar',
  },
};

export const Inline: IStory = {
  render: (props) => <ButtonShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: 'inline',
  },
};

const InlineButton: React.FC<IButtonProps> = (props) => (
  <>
    Lorem ipsum dolor sit amet <Button {...props} />, consectetur adipiscing
    elit
  </>
);

export const InlineWithText: IStory = {
  render: (props) => (
    <ButtonShowcase
      horizontalAlign="start"
      props={props}
      rows={[
        {
          component: (props) => (
            <SixuiText variant="display">
              <InlineButton {...props} />
            </SixuiText>
          ),
        },
        {
          component: (props) => (
            <SixuiText variant="headline">
              <InlineButton {...props} />
            </SixuiText>
          ),
        },
        {
          component: (props) => (
            <SixuiText variant="title">
              <InlineButton {...props} />
            </SixuiText>
          ),
        },
        {
          component: (props) => (
            <SixuiText variant="body">
              <InlineButton {...props} />
            </SixuiText>
          ),
        },
        {
          component: (props) => (
            <SixuiText variant="label">
              <InlineButton {...props} />
            </SixuiText>
          ),
        },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'inline',
    children: 'click me',
    trailingIcon: <FontAwesomeIcon icon={faArrowUpRightFromSquare} />,
  },
};

export const Raw: IStory = {
  render: (props) => <ButtonShowcase props={props} cols={states} rows={rows} />,
  args: {
    ...defaultArgs,
    variant: false,
  },
};

export default meta;
