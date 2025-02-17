import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IDragHandleProps } from './DragHandle.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { DragHandle } from './DragHandle';

const meta = {
  component: DragHandle,
} satisfies Meta<typeof DragHandle>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDragHandleProps>;

const variants: Array<IComponentPresentation<IDragHandleProps>> = [
  { legend: 'Horizontal', props: { orientation: 'horizontal' } },
  { legend: 'Vertical', props: { orientation: 'vertical' } },
];

const states: Array<IComponentPresentation<IDragHandleProps>> = [
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
];

const DragHandleShowcase = componentShowcaseFactory(DragHandle);

export const Basic: IStory = {
  render: (props) => (
    <DragHandleShowcase
      props={props}
      cols={states}
      rows={variants}
      verticalAlign="center"
    />
  ),
  args: defaultArgs,
};

export default meta;
