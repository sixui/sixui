import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IMoveHandleProps } from './MoveHandle.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
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

export default meta;
