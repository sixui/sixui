import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IBadgeProps } from './Badge.types';
import { Anchored, IAnchoredProps } from '~/components/Anchored';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Placeholder } from '~/components/Placeholder';
import { Badge } from './Badge';

type IBadgeDemoProps = IBadgeProps & Pick<IAnchoredProps, 'overlap'>;

const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>;

type IStory = StoryObj<IBadgeDemoProps>;

const BadgeDemo: React.FC<IBadgeDemoProps> = ({ overlap, ...props }) =>
  overlap ? (
    <Anchored content={<Badge {...props} />} overlap={overlap}>
      <Placeholder
        w="56px"
        h="56px"
        shape={overlap === 'circular' ? '$full' : '$sm'}
      />
    </Anchored>
  ) : (
    <Badge {...props} />
  );

const cols: Array<IComponentPresentation<IBadgeDemoProps>> = [
  {},
  { props: { overlap: 'rectangular' } },
  { props: { overlap: 'circular' } },
];

const BadgeDemoShowcase = componentShowcaseFactory(BadgeDemo);

export const Variants: IStory = {
  render: (props) => (
    <BadgeDemoShowcase
      props={props}
      cols={[
        { props: { overlap: 'rectangular', dot: true } },
        { props: { overlap: 'rectangular', value: 3 } },
        { props: { overlap: 'circular', value: 32 } },
        {
          props: {
            overlap: 'circular',
            value: 8000,
            maxValue: 999,
          },
        },
        {
          props: {
            overlap: 'circular',
            value: 'Text',
          },
        },
      ]}
    />
  ),
};

export const Scales: IStory = {
  render: (props) => (
    <BadgeDemoShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
  args: {
    value: 888,
  },
};

export const Dot: IStory = {
  render: (props) => <BadgeDemoShowcase props={props} cols={cols} />,
  args: {
    dot: true,
  },
};

export const SingleDigit: IStory = {
  render: (props) => <BadgeDemoShowcase props={props} cols={cols} />,
  args: {
    value: 3,
  },
};

export const MultipleDigits: IStory = {
  render: (props) => <BadgeDemoShowcase props={props} cols={cols} />,
  args: {
    value: 32,
  },
};

export const MultipleDigitsThresholded: IStory = {
  render: (props) => <BadgeDemoShowcase props={props} cols={cols} />,
  args: {
    value: 8000,
    maxValue: 999,
  },
};

export const ShowZeroValue: IStory = {
  render: (props) => <BadgeDemoShowcase props={props} cols={cols} />,
  args: {
    value: 0,
    showZero: true,
  },
};

export const HideZeroValue: IStory = {
  render: (props) => <BadgeDemoShowcase props={props} cols={cols} />,
  args: {
    value: 0,
  },
};

export default meta;
