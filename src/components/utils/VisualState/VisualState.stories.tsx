import type { Meta, StoryObj } from '@storybook/react';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { VisualState, type IVisualStateProps } from './VisualState';

const meta = {
  component: VisualState,
} satisfies Meta<typeof VisualState>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IVisualStateProps>;

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={VisualState}
      colsProps={[
        { $legend: 'Enabled' },
        { $legend: 'Disabled', disabled: true },
      ]}
      props={props}
    />
  ),
  args: defaultArgs,
};

export const Inherited: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={VisualState}
      colsProps={[
        { $legend: 'Enabled' },
        { $legend: 'Hovered', visualState: { hovered: true } },
        { $legend: 'Focused', visualState: { focused: true } },
        { $legend: 'Pressed', visualState: { pressed: true } },
        { $legend: 'Dragged', visualState: { dragged: true } },
      ]}
      props={props}
    />
  ),
  args: defaultArgs,
};

export default meta;
