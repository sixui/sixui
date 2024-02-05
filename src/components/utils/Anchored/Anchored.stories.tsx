import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as stylex from '@stylexjs/stylex';

import {
  type IComponentPropsWithLegend,
  type IComponentShowcaseProps,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Placeholder } from '@/components/atoms/Placeholder';
import { Anchored, type IAnchoredProps } from './Anchored';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

const meta = {
  component: Anchored,
} satisfies Meta<typeof Anchored>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IAnchoredProps>;

const badgeStyles$sm = stylex.create({
  host: {
    height: 16,
    width: 16,
    borderRadius: '999px',
    backgroundColor: colorRolesVars.primary,
  },
});

const badgeStyles$lg = stylex.create({
  host: {
    height: 16,
    width: 32,
    borderRadius: '999px',
    backgroundColor: colorRolesVars.primary,
  },
});

const Badge: React.FC<{ size: 'sm' | 'lg' }> = ({ size }) => (
  <Placeholder styles={size === 'sm' ? badgeStyles$sm : badgeStyles$lg} />
);

const anchorsProps: IComponentPropsWithLegend<IAnchoredProps> = [
  { verticalOrigin: 'top', horizontalOrigin: 'right' },
  { verticalOrigin: 'bottom', horizontalOrigin: 'right' },
  { verticalOrigin: 'top', horizontalOrigin: 'left' },
  { verticalOrigin: 'bottom', horizontalOrigin: 'left' },
];

const contentProps: IComponentPropsWithLegend<IAnchoredProps> = [
  { $legend: 'Short', content: <Badge size='sm' /> },
  { $legend: 'Long', content: <Badge size='lg' /> },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Anchored}
      props={props}
      colsProps={[
        {
          overlap: 'rectangular',
          children: <Placeholder shape='rectangular' />,
          content: <Badge size='sm' />,
          verticalOrigin: 'top',
          horizontalOrigin: 'right',
        },
        {
          overlap: 'circular',
          children: <Placeholder shape='circular' />,
          content: <Badge size='lg' />,
          verticalOrigin: 'bottom',
          horizontalOrigin: 'left',
        },
      ]}
    />
  ),
  args: defaultArgs as IAnchoredProps,
};

const ComponentShowcaseAnimated: React.FC<
  IComponentShowcaseProps<IAnchoredProps>
> = (props) => {
  const [invisible, setInvisible] = React.useState(true);

  React.useEffect(() => {
    setInterval(() => setInvisible((prev) => !prev), 2000);
  }, []);

  return (
    <ComponentShowcase
      {...props}
      groupsProps={[{ $legend: 'Static' }, { $legend: 'Animated', invisible }]}
    />
  );
};

export const RectangularOverlap: IStory = {
  render: (props) => (
    <ComponentShowcaseAnimated
      component={Anchored}
      props={props}
      rowsProps={contentProps}
      colsProps={anchorsProps}
    />
  ),
  args: {
    ...defaultArgs,
    overlap: 'rectangular',
    children: <Placeholder shape='rectangular' />,
  } as IAnchoredProps,
};

export const CircularOverlap: IStory = {
  render: (props) => (
    <ComponentShowcaseAnimated
      component={Anchored}
      props={props}
      rowsProps={contentProps}
      colsProps={anchorsProps}
    />
  ),
  args: {
    ...defaultArgs,
    overlap: 'circular',
    children: <Placeholder shape='circular' />,
  } as IAnchoredProps,
};

export default meta;
