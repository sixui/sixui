import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IVisualStateProps } from './VisualState.types';
import { ComponentShowcase } from '../ComponentShowcase';
import { VisualState } from './VisualState';

const meta = {
  component: VisualState,
} satisfies Meta<typeof VisualState>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IVisualStateProps>;

const states: Array<IComponentPresentation<IVisualStateProps>> = [
  { legend: 'Normal' },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Pressed', props: { visualState: { pressed: true } } },
  { legend: 'Dragged', props: { visualState: { dragged: true } } },
];

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={VisualState}
      cols={[
        { legend: 'Normal' },
        { legend: 'Disabled', props: { disabled: true } },
      ]}
      props={props}
    />
  ),
  args: defaultArgs,
};

export const WithInitialValue: IStory = {
  render: (props) => (
    <ComponentShowcase component={VisualState} cols={states} props={props} />
  ),
  args: defaultArgs,
};

export const Overlapping: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <VisualState {...props}>
          <VisualState {...props} />
        </VisualState>
      )}
      props={props}
    />
  ),
  args: defaultArgs,
};

export default meta;
