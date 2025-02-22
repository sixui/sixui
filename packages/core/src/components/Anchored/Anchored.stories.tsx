import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IPlaceholderProps } from '~/components/Placeholder';
import type { IAnchoredProps } from './Anchored.types';
import {
  componentShowcaseFactory,
  IComponentShowcaseProps,
} from '~/components/ComponentShowcase';
import { Paper } from '~/components/Paper';
import { Placeholder } from '~/components/Placeholder';
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
    h="$4"
    shape="$full"
    surface="$primary"
  />
);

const AnchoredShowcase = componentShowcaseFactory(Anchored);

export const Variants: IStory = {
  render: (props) => (
    <AnchoredShowcase
      props={props}
      cols={[
        { props: { content: <BadgeDemo size="sm" /> } },
        { props: { content: <BadgeDemo size="lg" /> } },
      ]}
      rows={[
        {
          legend: 'Rectangular overlap',
          props: {
            overlap: 'rectangular',
            children: <Placeholder w="$12" h="$12" shape="$sm" />,
          },
        },
        {
          legend: 'Circular overlap',
          props: {
            overlap: 'circular',
            children: <Placeholder w="$12" h="$12" shape="$full" />,
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
  const [invisible, setInvisible] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setInvisible((prev) => !prev);
    }, 2000);
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

const colsPositions: Array<IComponentPresentation<IAnchoredProps>> = [
  { props: { position: 'top-start' } },
  { props: { position: 'top-center' } },
  { props: { position: 'top-end' } },
  { props: { position: 'middle-end' } },
  { props: { position: 'bottom-end' } },
  { props: { position: 'bottom-center' } },
  { props: { position: 'bottom-start' } },
  { props: { position: 'middle-start' } },
];

const rowsContentSizes: Array<IComponentPresentation<IAnchoredProps>> = [
  { legend: 'Short', props: { content: <BadgeDemo size="sm" /> } },
  { legend: 'Long', props: { content: <BadgeDemo size="lg" /> } },
];

export const RectangularOverlap: IStory = {
  render: (props) => (
    <AnchoredAnimatedShowcase
      props={props}
      rows={rowsContentSizes}
      cols={colsPositions}
    />
  ),
  args: {
    ...defaultArgs,
    overlap: 'rectangular',
    children: <Placeholder w="$12" h="$12" shape="$sm" />,
  },
};

export const CircularOverlap: IStory = {
  render: (props) => (
    <AnchoredAnimatedShowcase
      props={props}
      rows={rowsContentSizes}
      cols={colsPositions}
    />
  ),
  args: {
    ...defaultArgs,
    overlap: 'circular',
    children: <Placeholder w="$12" h="$12" shape="$full" />,
  },
};

export default meta;
