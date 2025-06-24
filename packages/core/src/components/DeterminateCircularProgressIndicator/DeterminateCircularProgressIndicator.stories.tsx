import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IDeterminateCircularProgressIndicatorProps } from './DeterminateCircularProgressIndicator.types';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { useToggle } from '~/hooks/useToggle';
import { DeterminateCircularProgressIndicator } from './DeterminateCircularProgressIndicator';

const meta = {
  component: DeterminateCircularProgressIndicator,
} satisfies Meta<typeof DeterminateCircularProgressIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  value: 0.75,
} satisfies Partial<IDeterminateCircularProgressIndicatorProps>;

const rows: Array<
  IComponentPresentation<IDeterminateCircularProgressIndicatorProps>
> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'No inactive track',
    props: {
      hideInactiveTrack: true,
    },
  },
  {
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const DeterminateCircularProgressIndicatorShowcase = componentShowcaseFactory(
  DeterminateCircularProgressIndicator,
);

export const Basic: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
      props={props}
      cols={[
        { props: { value: 0 } },
        { props: { value: 0.25 } },
        { props: { value: 0.5 } },
        { props: { value: 0.75 } },
        { props: { value: 1 } },
      ]}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

const AnimatedDemo: React.FC<IDeterminateCircularProgressIndicatorProps> = (
  props,
) => {
  const { ...other } = props;
  const [value, toggleValue] = useToggle([0, 0.25, 0.5, 0.75, 1]);

  return (
    <Flex direction="row" gap="$xl" align="center">
      <Button
        onClick={() => {
          toggleValue();
        }}
        w="96px"
      >
        Progress
      </Button>

      <DeterminateCircularProgressIndicator {...other} value={value} />
    </Flex>
  );
};

export const Animated: IStory = {
  render: (props) => <AnimatedDemo {...props} />,
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
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
  args: defaultArgs,
};

export const FontSizes: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
      props={props}
      cols={[
        { legend: '2', props: { fz: '$2' } },
        { legend: '4', props: { fz: '16px' } },
        { legend: '8', props: { fz: '32px' } },
        { legend: '16', props: { fz: '64px' } },
        { legend: '32', props: { fz: '$32' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const WithLabel: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
      props={props}
      cols={[
        { props: { value: 0 } },
        { props: { value: 0.25 } },
        { props: { value: 0.5 } },
        { props: { value: 0.75 } },
        { props: { value: 1 } },
      ]}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    fz: '2.5rem',
    withLabel: true,
  },
};

export const WithLabelFormatter: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
      props={props}
      cols={[
        { props: { value: 0 } },
        { props: { value: 0.25 } },
        { props: { value: 0.5 } },
        { props: { value: 0.75 } },
        { props: { value: 1 } },
      ]}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    fz: '2.5rem',
    withLabel: true,
    labelFormatter: (value) => `[${String(Math.round(value * 100))}]`,
  },
};

export const WithRange: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
      props={props}
      cols={[
        { props: { value: -64 } },
        { props: { value: -16 } },
        { props: { value: 32 } },
        { props: { value: 80 } },
        { props: { value: 128 } },
      ]}
      rows={[
        { legend: 'Normal [-64 - 128]' },
        { legend: 'Disabled', props: { disabled: true } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    fz: '2.5rem',
    withLabel: true,
    labelFormatter: (value) => String(value),
    min: -64,
    max: 128,
  },
};

export const ZeroBased: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
      props={props}
      cols={[
        { props: { value: -100 } },
        { props: { value: -67 } },
        { props: { value: -33 } },
        { props: { value: 0 } },
        { props: { value: 33 } },
        { props: { value: 67 } },
        { props: { value: 100 } },
      ]}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    fz: '2.5rem',
    withLabel: true,
    labelFormatter: (value) => String(value),
    min: -100,
    max: 100,
    zeroBased: true,
  },
};

export default meta;
