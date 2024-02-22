import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Paper, type IPaperProps } from './Paper';
import { paperVariants } from './Paper.styledefs';
import { Typography } from '../Typography';

// https://material.io/blog/tone-based-surface-color-m3
// https://m3.material.io/styles/elevation/overview

const meta = {
  component: Paper,
} satisfies Meta<typeof Paper>;

type IStory = StoryObj<typeof meta>;

const variantsProps: IComponentPropsWithLegend<IPaperProps> = [
  { $legend: 'Filled' },
  { $legend: 'Outlined', variant: 'outlined' },
];

const paperStyles = stylex.create({
  host: {
    width: 192,
  },
});

const paperContentStyles = stylex.create({
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
  },
});

const defaultArgs = {
  styles: paperStyles,
} satisfies Partial<IPaperProps>;

const PaperWithContent: React.FC<IPaperProps> = ({ children, ...props }) => (
  <Paper {...props}>
    <div {...stylex.props(paperContentStyles.content)}>
      <Typography variant='body' size='md'>
        {children}
      </Typography>
    </div>
  </Paper>
);

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PaperWithContent}
      props={props}
      colsProps={paperVariants.map((variant) => ({
        variant,
        children: capitalizeFirstLetter(variant),
      }))}
    />
  ),
  args: defaultArgs,
};

export const Corners: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PaperWithContent}
      props={props}
      colsProps={variantsProps}
      rowsProps={[{ $legend: 'Rounded' }, { $legend: 'Square', square: true }]}
    />
  ),
  args: defaultArgs,
};

export const Elevations: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PaperWithContent}
      props={props}
      colsProps={variantsProps}
      rowsProps={[
        { $legend: 'Level 0', elevation: 0 },
        { $legend: 'Level 1', elevation: 1 },
        { $legend: 'Level 2', elevation: 2 },
        { $legend: 'Level 3', elevation: 3 },
        { $legend: 'Level 4', elevation: 4 },
        { $legend: 'Level 5', elevation: 5 },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
