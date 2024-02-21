import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Card, type ICardProps } from './Card';
import { cardVariants } from './Card.styledefs';
import { Typography } from '../Typography';

// https://m3.material.io/components/cards
// https://github.com/material-components/material-web/blob/main/labs/card/demo/stories.ts

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  card: {
    width: '192px',
  },
  content: {
    minHeight: '128px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    justifyContent: 'flex-end',
    gap: '16px',
  },
});

const defaultArgs = {
  children: 'Card content',
} satisfies Partial<ICardProps>;

const statesProps: IComponentPropsWithLegend<ICardProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Disabled', disabled: true },
];

const rowsProps: IComponentPropsWithLegend<ICardProps> = [
  { $legend: 'Static' },
  {
    $legend: 'Interactive',
    onClick: (args: React.MouseEvent<HTMLElement>) =>
      sbHandleEvent('click', args),
  },
];

const CardWithContent: React.FC<ICardProps> = ({ children, ...props }) => (
  <Card {...props} sx={styles.card}>
    {/* <img
      {...stylex.props(cardContentStyles.img)}
      src={MEDIA_IMAGE}
      alt='Placeholder image'
    /> */}
    <Card.Content sx={styles.content}>
      <Typography variant='body' size='md'>
        {children}
      </Typography>
    </Card.Content>
  </Card>
);

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={CardWithContent}
      props={props}
      colsProps={cardVariants.map((variant) => ({
        variant,
        children: capitalizeFirstLetter(variant),
      }))}
    />
  ),
  args: {
    ...defaultArgs,
    onClick: (args: React.MouseEvent<HTMLElement>) =>
      sbHandleEvent('click', args),
  },
};

export const Elevated: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={CardWithContent}
      props={props}
      colsProps={statesProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'elevated',
  },
};

export const Filled: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={CardWithContent}
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

export const Outlined: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={CardWithContent}
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
