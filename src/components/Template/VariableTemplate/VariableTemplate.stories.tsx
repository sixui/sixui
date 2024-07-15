import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type {
  IVariableTemplateProps,
  IVariableTemplateVariant,
} from './VariableTemplate.types';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/ComponentShowcase';
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
      cols={(['primary', 'secondary'] as Array<IVariableTemplateVariant>).map(
        (variant) => ({
          props: {
            variant,
            children: capitalizeFirstLetter(variant),
          },
        }),
      )}
    />
  ),
  args: defaultArgs,
};

export const Primary: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={VariableTemplate}
      props={props}
      cols={states}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'primary',
  },
};

export const Secondary: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={VariableTemplate}
      props={props}
      cols={states}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'secondary',
  },
};

export default meta;
