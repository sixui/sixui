import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import type { IAnchoredProps } from './Anchored.types';
import {
  ComponentShowcase,
  type IComponentPresentation,
  type IComponentShowcaseProps,
} from '../ComponentShowcase';
import { Placeholder, type IPlaceholderProps } from '../Placeholder';
import { Anchored } from './Anchored';

const meta = {
  component: Anchored,
} satisfies Meta<typeof Anchored>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IAnchoredProps>;

const AnchoredPlaceholder: React.FC<
  IPlaceholderProps & { size: 'sm' | 'lg' }
> = ({ size, ...other }) => (
  <Placeholder
    {...other}
    width={size === 'sm' ? 16 : 32}
    height={16}
    corner='full'
    surface='primary'
  />
);

const BasePlaceholder: React.FC<IPlaceholderProps> = (props) => (
  <Placeholder {...props} width={56} height={56} />
);

const anchors: Array<IComponentPresentation<IAnchoredProps>> = [
  { props: { verticalOrigin: 'top', horizontalOrigin: 'right' } },
  { props: { verticalOrigin: 'bottom', horizontalOrigin: 'right' } },
  { props: { verticalOrigin: 'top', horizontalOrigin: 'left' } },
  { props: { verticalOrigin: 'bottom', horizontalOrigin: 'left' } },
];

const content: Array<IComponentPresentation<IAnchoredProps>> = [
  { legend: 'Short', props: { content: <AnchoredPlaceholder size='sm' /> } },
  { legend: 'Long', props: { content: <AnchoredPlaceholder size='lg' /> } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Anchored}
      props={props}
      cols={[
        {
          props: {
            content: <AnchoredPlaceholder size='sm' />,
            verticalOrigin: 'top',
            horizontalOrigin: 'right',
          },
        },
        {
          props: {
            content: <AnchoredPlaceholder size='lg' />,
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
            children: <BasePlaceholder corner='md' />,
          },
        },
        {
          legend: 'Circular',
          props: {
            overlap: 'circular',
            children: <BasePlaceholder corner='full' />,
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
    children: <Placeholder corner='md' width={56} height={56} />,
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
    children: <Placeholder corner='full' width={56} height={56} />,
  } as IAnchoredProps,
};

export default meta;
