import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { IAnchoredProps } from './Anchored.types';
import {
  ComponentShowcase,
  type IComponentPresentation,
  type IComponentShowcaseProps,
} from '../ComponentShowcase';
import { Placeholder } from '../Placeholder';
import { Anchored } from './Anchored';

const meta = {
  component: Anchored,
} satisfies Meta<typeof Anchored>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IAnchoredProps>;

const styles = stylex.create({
  placeholder: {
    width: 56,
    height: 56,
  },
  badge$sm: {
    height: 16,
    width: 16,
  },
  badge$lg: {
    height: 16,
    width: 32,
  },
});

const BadgePlaceholder: React.FC<{ size: 'sm' | 'lg' }> = ({ size }) => (
  <Placeholder
    sx={[size === 'sm' ? styles.badge$sm : styles.badge$lg]}
    corner='full'
    surface='primary'
  />
);

const anchors: Array<IComponentPresentation<IAnchoredProps>> = [
  { props: { verticalOrigin: 'top', horizontalOrigin: 'right' } },
  { props: { verticalOrigin: 'bottom', horizontalOrigin: 'right' } },
  { props: { verticalOrigin: 'top', horizontalOrigin: 'left' } },
  { props: { verticalOrigin: 'bottom', horizontalOrigin: 'left' } },
];

const content: Array<IComponentPresentation<IAnchoredProps>> = [
  { legend: 'Short', props: { content: <BadgePlaceholder size='sm' /> } },
  { legend: 'Long', props: { content: <BadgePlaceholder size='lg' /> } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Anchored}
      props={props}
      cols={[
        {
          props: {
            content: <BadgePlaceholder size='sm' />,
            verticalOrigin: 'top',
            horizontalOrigin: 'right',
          },
        },
        {
          props: {
            content: <BadgePlaceholder size='lg' />,
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
            children: <Placeholder sx={styles.placeholder} corner='md' />,
          },
        },
        {
          legend: 'Circular',
          props: {
            overlap: 'circular',
            children: <Placeholder sx={styles.placeholder} corner='full' />,
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
    children: <Placeholder sx={styles.placeholder} corner='md' />,
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
    children: <Placeholder sx={styles.placeholder} corner='full' />,
  } as IAnchoredProps,
};

export default meta;
