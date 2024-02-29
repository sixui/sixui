import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import {
  ComponentShowcase,
  type IComponentPropsWithLegend,
} from '@/components/utils/ComponentShowcase';
import { Placeholder, type IPlaceholderProps } from './Placeholder';

const meta = {
  component: Placeholder,
} satisfies Meta<typeof Placeholder>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  styles: stylex.create({
    host: {
      width: 96,
      height: 96,
    },
  }),
} satisfies Partial<IPlaceholderProps>;

const colsProps: IComponentPropsWithLegend<IPlaceholderProps> = [
  { $legend: 'Basic' },
  { $legend: 'Crosshairs', crosshairs: true },
  { $legend: 'Label', label: 'Label' },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Placeholder}
      props={props}
      colsProps={[
        { shape: 'rounded' },
        { shape: 'rectangular', crosshairs: true },
        { shape: 'circular', label: 'Label' },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Rounded: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Placeholder}
      props={props}
      colsProps={colsProps}
    />
  ),
  args: {
    ...defaultArgs,
    shape: 'rounded',
  },
};

export const Rectangular: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Placeholder}
      props={props}
      colsProps={colsProps}
    />
  ),
  args: {
    ...defaultArgs,
    shape: 'rectangular',
  },
};

export const Circular: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Placeholder}
      props={props}
      colsProps={colsProps}
    />
  ),
  args: {
    ...defaultArgs,
    shape: 'circular',
  },
};

export default meta;
