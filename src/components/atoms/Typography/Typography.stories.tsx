import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { type ITypographyProps, Typography } from './Typography';

// https://m3.material.io/styles/typography/overview
// https://material-web.dev/theming/typography/

const meta = {
  component: Typography,
} satisfies Meta<typeof Typography>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ITypographyProps>;

const LOREM$XS = 'Lorem ipsum dolor sit amet.';
const LOREM$SM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const LOREM$MD =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus pharetra urna in porttitor.';
const LOREM$LG =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia ante et enim tempor pretium. Proin sed sem vehicula, dignissim velit vel, varius turpis. Ut vel ex non lectus iaculis pretium. Nunc at tempus enim. Donec commodo placerat libero.';

const rowsProps: IComponentPropsWithLegend<ITypographyProps> = [
  {
    $legend: 'Display (lg) | span',
    variant: 'display',
    size: 'lg',
    children: LOREM$SM,
  },
  {
    $legend: 'Display (md) | span',
    variant: 'display',
    size: 'md',
    children: LOREM$SM,
  },
  {
    $legend: 'Display (sm) | span',
    variant: 'display',
    size: 'sm',
    children: LOREM$SM,
  },
  {
    $legend: 'Headline (lg) | h1',
    variant: 'headline',
    size: 'lg',
    children: LOREM$MD,
  },
  {
    $legend: 'Headline (md) | h2',
    variant: 'headline',
    size: 'md',
    children: LOREM$MD,
  },
  {
    $legend: 'Headline (sm) | h3',
    variant: 'headline',
    size: 'sm',
    children: LOREM$MD,
  },
  {
    $legend: 'Title (lg) | h4',
    variant: 'title',
    size: 'lg',
    children: LOREM$MD,
  },
  {
    $legend: 'Title (md) | h5',
    variant: 'title',
    size: 'md',
    children: LOREM$MD,
  },
  {
    $legend: 'Title (sm) | h6',
    variant: 'title',
    size: 'sm',
    children: LOREM$MD,
  },
  {
    $legend: 'Body (lg) | p',
    variant: 'body',
    size: 'lg',
    children: LOREM$LG,
  },
  {
    $legend: 'Body (md) | p',
    variant: 'body',
    size: 'md',
    children: LOREM$LG,
  },
  {
    $legend: 'Body (sm) | p',
    variant: 'body',
    size: 'sm',
    children: LOREM$LG,
  },
  {
    $legend: 'Label (lg) | span',
    variant: 'label',
    size: 'lg',
    children: LOREM$XS,
  },
  {
    $legend: 'Label (md) | span',
    variant: 'label',
    size: 'md',
    children: LOREM$XS,
  },
  {
    $legend: 'Label (sm) | span',
    variant: 'label',
    size: 'sm',
    children: LOREM$XS,
  },
];

const componentShowcaseStyles = stylex.create({
  host: {
    maxWidth: '600px',
  },
});

export const TypeScale: IStory = {
  render: (props) => (
    <ComponentShowcase
      styles={componentShowcaseStyles}
      component={(props) => (
        <Typography {...props}>
          {props.children ??
            (props.variant ? capitalizeFirstLetter(props.variant) : null)}
        </Typography>
      )}
      props={props}
      rowsProps={rowsProps}
      align='start'
      rowLegendPosition='top'
    />
  ),
  args: defaultArgs,
};

export default meta;
