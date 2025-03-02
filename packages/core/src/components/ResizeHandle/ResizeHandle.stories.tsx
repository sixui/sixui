import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IResizeHandleProps } from './ResizeHandle.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { ResizeHandle } from './ResizeHandle';

const meta = {
  component: ResizeHandle,
} satisfies Meta<typeof ResizeHandle>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IResizeHandleProps>;

const variants: Array<IComponentPresentation<IResizeHandleProps>> = [
  { legend: 'Horizontal', props: { orientation: 'horizontal' } },
  { legend: 'Vertical', props: { orientation: 'vertical' } },
];

const states: Array<IComponentPresentation<IResizeHandleProps>> = [
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

const ResizeHandleShowcase = componentShowcaseFactory(ResizeHandle);

export const Basic: IStory = {
  render: (props) => (
    <ResizeHandleShowcase
      props={props}
      cols={states}
      rows={variants}
      verticalAlign="center"
    />
  ),
  args: defaultArgs,
};

export default meta;
