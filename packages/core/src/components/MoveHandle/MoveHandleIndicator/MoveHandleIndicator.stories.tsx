import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IMoveHandleIndicatorProps } from './MoveHandleIndicator.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { MoveHandleIndicator } from './MoveHandleIndicator';

const meta = {
  component: MoveHandleIndicator,
} satisfies Meta<typeof MoveHandleIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  orientation: 'horizontal',
} satisfies Partial<IMoveHandleIndicatorProps>;

const variants: Array<IComponentPresentation<IMoveHandleIndicatorProps>> = [
  {
    legend: 'Horizontal',
    props: {
      orientation: 'horizontal',
    },
  },
  {
    legend: 'Vertical',
    props: {
      orientation: 'vertical',
    },
  },
];

const states: Array<IComponentPresentation<IMoveHandleIndicatorProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'Disabled',
    props: {
      disabled: true,
    },
  },
];

const MoveHandleIndicatorShowcase =
  componentShowcaseFactory(MoveHandleIndicator);

export const Variants: IStory = {
  render: (props) => (
    <MoveHandleIndicatorShowcase props={props} rows={variants} cols={states} />
  ),
  args: defaultArgs,
};

export default meta;
