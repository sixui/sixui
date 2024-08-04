import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IBadgeProps } from './Badge.types';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '~/components/ComponentShowcase';
import { Placeholder } from '~/components/Placeholder';
import { Badge } from './Badge';
import { Anchored, IAnchoredProps } from '~/components/Anchored';

// https://m3.material.io/components/badges/overview

const meta = {
  component: Badge,
} satisfies Meta<typeof Badge>;

type IStory = StoryObj<typeof meta>;

type IExtendedBadgeProps = IBadgeProps & Pick<IAnchoredProps, 'overlap'>;

const styles = stylex.create({
  placeholder: {
    width: 56,
    height: 56,
  },
});

const defaultArgs = {} satisfies Partial<IBadgeProps>;

const cols: Array<IComponentPresentation<IExtendedBadgeProps>> = [
  {},
  { props: { overlap: 'rectangular' } },
  { props: { overlap: 'circular' } },
];

const BadgeDemo: React.FC<IExtendedBadgeProps> = ({ overlap, ...props }) =>
  overlap ? (
    <Anchored content={<Badge {...props} />} overlap={overlap}>
      <Placeholder
        sx={styles.placeholder}
        corner={overlap === 'circular' ? 'full' : 'sm'}
      />
    </Anchored>
  ) : (
    <Badge {...props} />
  );

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={BadgeDemo}
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
  args: defaultArgs,
};

export const Dot: IStory = {
  render: (props) => (
    <ComponentShowcase<IExtendedBadgeProps>
      component={(props) => <BadgeDemo {...props} />}
      props={props}
      cols={cols}
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
      cols={cols}
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
      cols={cols}
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
      cols={cols}
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
      cols={cols}
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
      cols={cols}
    />
  ),
  args: {
    ...defaultArgs,
    value: 0,
  },
};

export default meta;
