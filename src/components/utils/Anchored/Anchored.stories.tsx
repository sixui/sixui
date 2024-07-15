import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAnchoredProps } from './Anchored.types';
import {
  ComponentShowcase,
  type IComponentPresentation,
  type IComponentShowcaseProps,
} from '@/components/utils/ComponentShowcase';
import { Placeholder } from '@/components/atoms/Placeholder';
import { Anchored } from './Anchored';
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

const anchors: Array<IComponentPresentation<IAnchoredProps>> = [
  { props: { verticalOrigin: 'top', horizontalOrigin: 'right' } },
  { props: { verticalOrigin: 'bottom', horizontalOrigin: 'right' } },
  { props: { verticalOrigin: 'top', horizontalOrigin: 'left' } },
  { props: { verticalOrigin: 'bottom', horizontalOrigin: 'left' } },
];

const content: Array<IComponentPresentation<IAnchoredProps>> = [
  { legend: 'Short', props: { content: <Badge size='sm' /> } },
  { legend: 'Long', props: { content: <Badge size='lg' /> } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Anchored}
      props={props}
      cols={[
        {
          props: {
            content: <Badge size='sm' />,
            verticalOrigin: 'top',
            horizontalOrigin: 'right',
          },
        },
        {
          props: {
            content: <Badge size='lg' />,
            verticalOrigin: 'bottom',
            horizontalOrigin: 'left',
          },
        },
      ]}
      rows={[
        {
          legend: 'Rectangular',
          props: {
            overlap: 'rectangular',
            children: <Placeholder shape='rectangular' />,
          },
        },
        {
          legend: 'Circular',
          props: {
            overlap: 'circular',
            children: <Placeholder shape='circular' />,
          },
        },
      ]}
    />
  ),
  args: defaultArgs as IAnchoredProps,
};

const ComponentShowcaseAnimated: React.FC<
  IComponentShowcaseProps<IAnchoredProps>
> = (props) => {
  const [invisible, setInvisible] = useState(true);

  useEffect(() => {
    setInterval(() => setInvisible((prev) => !prev), 2000);
  }, []);

  return (
    <ComponentShowcase
      {...props}
      groups={[
        { legend: 'Static' },
        { legend: 'Animated', props: { invisible } },
      ]}
    />
  );
};

export const RectangularOverlap: IStory = {
  render: (props) => (
    <ComponentShowcaseAnimated
      component={Anchored}
      props={props}
      rows={content}
      cols={anchors}
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
      rows={content}
      cols={anchors}
    />
  ),
  args: {
    ...defaultArgs,
    overlap: 'circular',
    children: <Placeholder shape='circular' />,
  } as IAnchoredProps,
};

export default meta;
