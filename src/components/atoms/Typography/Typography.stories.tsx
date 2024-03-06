import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import {
  type ITypographyProps,
  Typography,
  typographyTagMap,
} from './Typography';

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
    $legend: `Display (lg) | ${typographyTagMap.display$lg}`,
    variant: 'display',
    size: 'lg',
    children: LOREM$SM,
  },
  {
    $legend: `Display (md) | ${typographyTagMap.display$md}`,
    variant: 'display',
    size: 'md',
    children: LOREM$SM,
  },
  {
    $legend: `Display (sm) | ${typographyTagMap.display$sm}`,
    variant: 'display',
    size: 'sm',
    children: LOREM$SM,
  },
  {
    $legend: `Headline (lg) | ${typographyTagMap.headline$lg}`,
    variant: 'headline',
    size: 'lg',
    children: LOREM$MD,
  },
  {
    $legend: `Headline (md) | ${typographyTagMap.headline$md}`,
    variant: 'headline',
    size: 'md',
    children: LOREM$MD,
  },
  {
    $legend: `Headline (sm) | | ${typographyTagMap.headline$sm}`,
    variant: 'headline',
    size: 'sm',
    children: LOREM$MD,
  },
  {
    $legend: `Title (lg) | ${typographyTagMap.title$lg}`,
    variant: 'title',
    size: 'lg',
    children: LOREM$MD,
  },
  {
    $legend: `Title (md) | ${typographyTagMap.title$md}`,
    variant: 'title',
    size: 'md',
    children: LOREM$MD,
  },
  {
    $legend: `Title (sm) | | ${typographyTagMap.title$sm}`,
    variant: 'title',
    size: 'sm',
    children: LOREM$MD,
  },
  {
    $legend: `Body (lg) | ${typographyTagMap.body$lg}`,
    variant: 'body',
    size: 'lg',
    children: LOREM$LG,
  },
  {
    $legend: `Body (md) | ${typographyTagMap.body$md}`,
    variant: 'body',
    size: 'md',
    children: LOREM$LG,
  },
  {
    $legend: `Body (sm) | ${typographyTagMap.body$sm}`,
    variant: 'body',
    size: 'sm',
    children: LOREM$LG,
  },
  {
    $legend: `Label (lg) | ${typographyTagMap.label$lg}`,
    variant: 'label',
    size: 'lg',
    children: LOREM$XS,
  },
  {
    $legend: `Label (md) | ${typographyTagMap.label$md}`,
    variant: 'label',
    size: 'md',
    children: LOREM$XS,
  },
  {
    $legend: `Label (sm) | ${typographyTagMap.label$sm}`,
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
