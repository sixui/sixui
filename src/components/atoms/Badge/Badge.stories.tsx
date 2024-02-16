import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import {
  type IPlaceholderProps,
  Placeholder,
} from '@/components/atoms/Placeholder';
import { Badge, type IBadgeProps } from './Badge';
import { Anchored } from '@/components/utils/Anchored';

// https://m3.material.io/components/badges/overview

const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>;

type IStory = StoryObj<typeof meta>;

type IExtendedBadgeProps = IBadgeProps & {
  anchored?: boolean;
  shape?: IPlaceholderProps['shape'];
};

const defaultArgs = {} satisfies Partial<IBadgeProps>;

const colsProps: IComponentPropsWithLegend<IExtendedBadgeProps> = [
  {},
  { anchored: true, shape: 'rectangular' },
  { anchored: true, shape: 'circular' },
];

const rowsProps: IComponentPropsWithLegend<IExtendedBadgeProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Enabled', disabled: true },
];

const BadgeDemo: React.FC<IExtendedBadgeProps> = ({
  anchored,
  shape,
  ...props
}) =>
  anchored ? (
    <Anchored
      content={<Badge {...props} invisible={props.invisible} />}
      overlap={shape === 'circular' ? 'circular' : undefined}
    >
      <Placeholder shape={shape} />
    </Anchored>
  ) : (
    <Badge {...props} />
  );

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={BadgeDemo}
      props={props}
      colsProps={[
        { anchored: true, shape: 'rectangular', dot: true },
        { anchored: true, shape: 'rectangular', value: 3 },
        { anchored: true, shape: 'circular', value: 32 },
        { anchored: true, shape: 'circular', value: 8000, maxValue: 999 },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Dot: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={(props) => <BadgeDemo {...props} />}
      props={props}
      colsProps={colsProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    dot: true,
  },
};

export const SingleDigit: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={(props) => <BadgeDemo {...props} />}
      props={props}
      colsProps={colsProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    value: 3,
  },
};

export const MultipleDigits: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={(props) => <BadgeDemo {...props} />}
      props={props}
      colsProps={colsProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    value: 32,
  },
};

export const MultipleDigitsThresholded: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={(props) => <BadgeDemo {...props} />}
      props={props}
      colsProps={colsProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    value: 8000,
    maxValue: 999,
  },
};

export const ShowZeroValue: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={(props) => <BadgeDemo {...props} />}
      props={props}
      colsProps={colsProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    value: 0,
    showZero: true,
  },
};

export const HideZeroValue: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={(props) => <BadgeDemo {...props} />}
      props={props}
      colsProps={colsProps}
      rowsProps={rowsProps}
    />
  ),
  args: {
    ...defaultArgs,
    value: 0,
  },
};

export default meta;
