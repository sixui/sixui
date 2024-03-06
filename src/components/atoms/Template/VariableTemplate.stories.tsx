import type { Meta, StoryObj } from '@storybook/react';

import {
  type IComponentPropsWithLegend,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import {
  VariableTemplate,
  type IVariableTemplateProps,
} from './VariableTemplate';

const meta = {
  component: VariableTemplate,
} satisfies Meta<typeof VariableTemplate>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'VariableTemplate',
} satisfies Partial<IVariableTemplateProps>;

const statesProps: IComponentPropsWithLegend<IVariableTemplateProps> = [
  { $legend: 'Enabled' },
  { $legend: 'Hovered', visualState: { hovered: true } },
  { $legend: 'Focused', visualState: { focused: true } },
  { $legend: 'Pressed', visualState: { pressed: true } },
  { $legend: 'Dragged', visualState: { dragged: true } },
];

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={VariableTemplate}
      props={props}
      colsProps={[{ variant: 'variant' }]}
    />
  ),
  args: defaultArgs,
};

export const Variant: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={VariableTemplate}
      props={props}
      colsProps={statesProps}
    />
  ),
  args: {
    ...defaultArgs,
    variant: 'variant',
  },
};

export default meta;
