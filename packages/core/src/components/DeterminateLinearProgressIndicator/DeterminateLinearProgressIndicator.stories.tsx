import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IDeterminateLinearProgressIndicatorProps } from './DeterminateLinearProgressIndicator.types';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { useToggle } from '~/hooks/useToggle';
import { DeterminateLinearProgressIndicator } from './DeterminateLinearProgressIndicator';

const meta = {
  component: DeterminateLinearProgressIndicator,
} satisfies Meta<typeof DeterminateLinearProgressIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  value: 0.75,
  w: '$72',
} satisfies Partial<IDeterminateLinearProgressIndicatorProps>;

const cols: Array<
  IComponentPresentation<IDeterminateLinearProgressIndicatorProps>
> = [{ legend: 'Normal' }, { legend: 'Disabled', props: { disabled: true } }];

const DeterminateLinearProgressIndicatorShowcase = componentShowcaseFactory(
  DeterminateLinearProgressIndicator,
);

export const Basic: IStory = {
  render: (props) => (
    <DeterminateLinearProgressIndicatorShowcase
      props={props}
      rows={[
        { legend: '0', props: { value: 0 } },
        { legend: '25%', props: { value: 0.25 } },
        { legend: '50%', props: { value: 0.5 } },
        { legend: '75%', props: { value: 0.75 } },
        { legend: '100%', props: { value: 1 } },
      ]}
      cols={cols}
    />
  ),
  args: defaultArgs,
};

const AnimatedDemo: React.FC<IDeterminateLinearProgressIndicatorProps> = (
  props,
) => {
  const { ...other } = props;
  const [value, toggleValue] = useToggle([0, 0.25, 0.5, 0.75, 1]);

  return (
    <Flex direction="row" gap="$6" align="center">
      <Button
        onClick={() => {
          toggleValue();
        }}
        w="$24"
      >
        Progress
      </Button>

      <DeterminateLinearProgressIndicator {...other} value={value} />
    </Flex>
  );
};

export const Animated: IStory = {
  render: (props) => <AnimatedDemo {...props} />,
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <DeterminateLinearProgressIndicatorShowcase
      horizontalAlign="start"
      props={props}
      rows={[
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

export const WithRange: IStory = {
  render: (props) => (
    <DeterminateLinearProgressIndicatorShowcase
      props={props}
      rows={[
        { legend: '-64', props: { value: -64 } },
        { legend: '-16', props: { value: -16 } },
        { legend: '32', props: { value: 32 } },
        { legend: '80', props: { value: 80 } },
        { legend: '128', props: { value: 128 } },
      ]}
      cols={[
        { legend: 'Normal [-64 - 128]' },
        { legend: 'Disabled', props: { disabled: true } },
      ]}
    />
  ),
  args: {
    ...defaultArgs,
    fz: '2.5rem',
    min: -64,
    max: 128,
  },
};

export default meta;
