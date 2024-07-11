import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IPlaceholderProps } from './PlaceholderProps';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Placeholder } from './Placeholder';

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

const cols: Array<IComponentPresentation<IPlaceholderProps>> = [
  { legend: 'Basic' },
  { legend: 'Crosshairs', props: { crosshairs: true } },
  { legend: 'Label', props: { label: 'Label' } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Placeholder}
      props={props}
      cols={[
        { props: { shape: 'rounded' } },
        { props: { shape: 'rectangular', crosshairs: true } },
        { props: { shape: 'circular', label: 'Label' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Rounded: IStory = {
  render: (props) => (
    <ComponentShowcase component={Placeholder} props={props} cols={cols} />
  ),
  args: {
    ...defaultArgs,
    shape: 'rounded',
  },
};

export const Rectangular: IStory = {
  render: (props) => (
    <ComponentShowcase component={Placeholder} props={props} cols={cols} />
  ),
  args: {
    ...defaultArgs,
    shape: 'rectangular',
  },
};

export const Circular: IStory = {
  render: (props) => (
    <ComponentShowcase component={Placeholder} props={props} cols={cols} />
  ),
  args: {
    ...defaultArgs,
    shape: 'circular',
  },
};

export default meta;
