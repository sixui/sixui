import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/molecules/ComponentShowcase';
import { Card, type ICardProps } from './Card';
import { cardVariants } from './Card.styledefs';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { typescaleVars } from '@/themes/base/vars/typo.stylex';

// https://m3.material.io/components/cards
// https://github.com/material-components/material-web/blob/main/labs/card/demo/stories.ts

const meta = {
  component: Card,
} satisfies Meta<typeof Card>;

type IStory = StoryObj<typeof meta>;

const cardStyles = stylex.create({
  host: {
    width: '192px',
  },
});

const cardContentStyles = stylex.create({
  content: {
    minHeight: '128px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    justifyContent: 'flex-end',
    padding: '16px',
    gap: '16px',
    color: colorRolesVars.onSurface,
    fontFamily: typescaleVars.bodyFont$md,
    fontSize: typescaleVars.bodySize$md,
    fontWeight: typescaleVars.bodyWeight$md,
    lineHeight: typescaleVars.bodyLineHeight$md,
    letterSpacing: typescaleVars.bodyLetterSpacing$md,
  },
});

const defaultArgs = {
  styles: cardStyles,
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
  <Card {...props}>
    {/* <img
      {...stylex.props(cardContentStyles.img)}
      src={MEDIA_IMAGE}
      alt='Placeholder image'
    /> */}
    <div {...stylex.props(cardContentStyles.content)}>{children}</div>
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
