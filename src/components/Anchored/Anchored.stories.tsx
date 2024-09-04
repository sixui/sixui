import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import type { IAnchoredProps } from './Anchored.types';
import {
  IComponentShowcaseProps,
  makeComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { Placeholder, type IPlaceholderProps } from '../Placeholder';
import { Paper } from '../Paper';
import { Anchored } from './Anchored';

const meta = {
  component: Anchored,
} satisfies Meta<typeof Anchored>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IAnchoredProps>;

const BadgeDemo: React.FC<IPlaceholderProps & { size: 'sm' | 'lg' }> = ({
  size,
  ...other
}) => (
  <Paper
    {...other}
    w={size === 'sm' ? '$4' : '$8'}
    h='$4'
    corner='$full'
    surface='$primary'
  />
);

const anchors: Array<IComponentPresentation<IAnchoredProps>> = [
  { props: { position: 'top-start' } },
  { props: { position: 'top-center' } },
  { props: { position: 'top-end' } },
  { props: { position: 'middle-end' } },
  { props: { position: 'bottom-end' } },
  { props: { position: 'bottom-center' } },
  { props: { position: 'bottom-start' } },
  { props: { position: 'middle-start' } },
];

const content: Array<IComponentPresentation<IAnchoredProps>> = [
  { legend: 'Short', props: { content: <BadgeDemo size='sm' /> } },
  { legend: 'Long', props: { content: <BadgeDemo size='lg' /> } },
];

const AnchoredShowcase = makeComponentShowcase(Anchored);

export const Variants: IStory = {
  render: (props) => (
    <AnchoredShowcase
      props={props}
      cols={[
        {
          props: {
            content: <BadgeDemo size='sm' />,
            position: 'top-end',
          },
        },
        {
          props: {
            content: <BadgeDemo size='lg' />,
            position: 'top-end',
          },
        },
      ]}
      rows={[
        {
          legend: 'Rectangular',
          props: {
            overlap: 'rectangular',
            children: <Placeholder w='$12' h='$12' />,
          },
        },
        {
          legend: 'Circular',
          props: {
            overlap: 'circular',
            children: <Placeholder w='$12' h='$12' corner='$full' />,
          },
        },
      ]}
    />
  ),
  args: defaultArgs as IAnchoredProps,
};

const AnchoredAnimatedShowcase: React.FC<
  IComponentShowcaseProps<IAnchoredProps>
> = (props) => {
  const [invisible, setInvisible] = useState(true);

  useEffect(() => {
    setInterval(() => setInvisible((prev) => !prev), 2000);
  }, []);

  return (
    <AnchoredShowcase
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
    <AnchoredAnimatedShowcase props={props} rows={content} cols={anchors} />
  ),
  args: {
    ...defaultArgs,
    overlap: 'rectangular',
    children: <Placeholder w='$12' h='$12' />,
  },
};

export const CircularOverlap: IStory = {
  render: (props) => (
    <AnchoredAnimatedShowcase props={props} rows={content} cols={anchors} />
  ),
  args: {
    ...defaultArgs,
    overlap: 'circular',
    children: <Placeholder w='$12' h='$12' corner='$full' />,
  },
};

export default meta;
