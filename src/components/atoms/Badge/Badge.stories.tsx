import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

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
        { anchored: true, shape: 'rectangular', value: 1 },
        { anchored: true, shape: 'circular', value: 8000 },
        { anchored: true, shape: 'circular', value: 8000, maxValue: 999 },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={(props) => <BadgeDemo {...props} />}
      props={props}
      colsProps={colsProps}
    />
  ),
  args: {
    ...defaultArgs,
    value: 1,
  },
};

export const Dot: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={(props) => <BadgeDemo {...props} />}
      props={props}
      colsProps={colsProps}
    />
  ),
  args: {
    ...defaultArgs,
    dot: true,
  },
};

export const WithBigValue: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={(props) => <BadgeDemo {...props} />}
      props={props}
      colsProps={colsProps}
    />
  ),
  args: {
    ...defaultArgs,
    value: 8000,
  },
};

export const WithThresholdedValue: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={(props) => <BadgeDemo {...props} />}
      props={props}
      colsProps={colsProps}
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
    />
  ),
  args: {
    ...defaultArgs,
    value: 0,
  },
};

export const Invisible: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={(props) => <BadgeDemo {...props} />}
      props={props}
      colsProps={colsProps}
    />
  ),
  args: {
    ...defaultArgs,
    value: 1,
    invisible: true,
  },
};

export default meta;
