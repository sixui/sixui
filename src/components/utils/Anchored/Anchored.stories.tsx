import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as stylex from '@stylexjs/stylex';

import {
  type IComponentPropsWithLegend,
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

const parentStyles$square = stylex.create({
  host: {
    width: '4rem',
    height: '4rem',
    borderRadius: 0,
  },
});

const parentStyles$circular = stylex.create({
  host: {
    width: '4rem',
    height: '4rem',
    borderRadius: '999px',
  },
});

const Parent: React.FC<{ shape: 'square' | 'circular' }> = ({ shape }) => (
  <Placeholder
    styles={shape === 'square' ? parentStyles$square : parentStyles$circular}
  />
);

const badgeStyles$sm = stylex.create({
  host: {
    height: '1rem',
    width: '1rem',
    borderRadius: '999px',
    backgroundColor: colorRolesVars.primary,
  },
});

const badgeStyles$lg = stylex.create({
  host: {
    height: '1rem',
    width: '3rem',
    borderRadius: '999px',
    backgroundColor: colorRolesVars.primary,
  },
});

const Badge: React.FC<{ size: 'sm' | 'lg' }> = ({ size }) => (
  <Placeholder styles={size === 'sm' ? badgeStyles$sm : badgeStyles$lg} />
);

const anchorsProps: IComponentPropsWithLegend<IAnchoredProps> = [
  { horizontalOrigin: 'end', verticalOrigin: 'top' },
  { horizontalOrigin: 'end', verticalOrigin: 'bottom' },
  { horizontalOrigin: 'start', verticalOrigin: 'bottom' },
  { horizontalOrigin: 'start', verticalOrigin: 'top' },
];

const contentProps: IComponentPropsWithLegend<IAnchoredProps> = [
  { content: <Badge size='sm' /> },
  { content: <Badge size='lg' /> },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Anchored}
      props={props}
      colsProps={[
        {
          overlap: 'square',
          children: <Parent shape='square' />,
          content: <Badge size='sm' />,
          horizontalOrigin: 'end',
          verticalOrigin: 'top',
        },
        {
          overlap: 'circular',
          children: <Parent shape='circular' />,
          content: <Badge size='sm' />,
          horizontalOrigin: 'end',
          verticalOrigin: 'bottom',
        },
      ]}
    />
  ),
  args: defaultArgs as IAnchoredProps,
};

export const SquareOverlap: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Anchored}
      props={props}
      rowsProps={contentProps}
      colsProps={anchorsProps}
    />
  ),
  args: {
    ...defaultArgs,
    overlap: 'square',
    children: <Parent shape='square' />,
  } as IAnchoredProps,
};

export const CircularOverlap: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Anchored}
      props={props}
      rowsProps={contentProps}
      colsProps={anchorsProps}
    />
  ),
  args: {
    ...defaultArgs,
    overlap: 'circular',
    children: <Parent shape='circular' />,
  } as IAnchoredProps,
};

export default meta;
