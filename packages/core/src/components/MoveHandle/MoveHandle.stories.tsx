import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IMoveHandleProps } from './MoveHandle.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Placeholder } from '~/components/Placeholder';
import { MoveHandle } from './MoveHandle';

const meta = {
  component: MoveHandle,
} satisfies Meta<typeof MoveHandle>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IMoveHandleProps>;

const variants: Array<IComponentPresentation<IMoveHandleProps>> = [
  { legend: 'Horizontal', props: { orientation: 'horizontal' } },
  { legend: 'Vertical', props: { orientation: 'vertical' } },
];

const states: Array<IComponentPresentation<IMoveHandleProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'Focused',
    props: { interactions: { focused: true } },
  },
  {
    legend: 'Hovered',
    props: { interactions: { hovered: true } },
  },
  {
    legend: 'Pressed',
    props: { interactions: { pressed: true } },
  },
  {
    legend: 'Dragged',
    props: { interactions: { dragged: true } },
  },
  {
    legend: 'Disabled',
    props: { disabled: true },
  },
];

const MoveHandleShowcase = componentShowcaseFactory(MoveHandle);

export const Basic: IStory = {
  render: (props) => (
    <MoveHandleShowcase
      props={props}
      cols={states}
      rows={variants}
      verticalAlign="center"
    />
  ),
  args: defaultArgs,
};

type IPositionedMoveHandleDemoProps = IMoveHandleProps;

const PositionedMoveHandleDemo: React.FC<IPositionedMoveHandleDemoProps> = (
  props,
) => {
  return (
    <Placeholder w="96px" h="96px" shape="$md" diagonals>
      <MoveHandle {...props} />
    </Placeholder>
  );
};

const PositionedMoveHandleDemoShowcase = componentShowcaseFactory(
  PositionedMoveHandleDemo,
);

export const Positioned: IStory = {
  render: (props) => (
    <PositionedMoveHandleDemoShowcase
      props={props}
      cols={[
        {
          legend: 'Top',
          props: { position: 'top' },
        },
        {
          legend: 'Right',
          props: { position: 'right' },
        },
        {
          legend: 'Bottom',
          props: { position: 'bottom' },
        },
        {
          legend: 'Left',
          props: { position: 'left' },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
