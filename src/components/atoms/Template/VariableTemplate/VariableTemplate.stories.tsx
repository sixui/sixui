import type { Meta, StoryObj } from '@storybook/react';

import type { IVariableTemplateProps } from './VariableTemplateProps';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/utils/ComponentShowcase';
import { VariableTemplate } from './VariableTemplate';

const meta = {
  component: VariableTemplate,
} satisfies Meta<typeof VariableTemplate>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'VariableTemplate',
} satisfies Partial<IVariableTemplateProps>;

const states: Array<IComponentPresentation<IVariableTemplateProps>> = [
  { legend: 'Enabled' },
  { legend: 'Hovered', props: { visualState: { hovered: true } } },
  { legend: 'Focused', props: { visualState: { focused: true } } },
  { legend: 'Pressed', props: { visualState: { pressed: true } } },
  { legend: 'Dragged', props: { visualState: { dragged: true } } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={VariableTemplate}
      props={props}
      cols={[{ props: { variant: 'variant' } }]}
    />
  ),
  args: defaultArgs,
};

export const Variant: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={VariableTemplate}
      props={props}
      cols={states}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'variant',
  },
};

export default meta;
