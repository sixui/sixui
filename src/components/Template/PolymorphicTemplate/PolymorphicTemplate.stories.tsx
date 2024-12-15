import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../../ComponentShowcase';
import type { IPolymorphicTemplateProps } from './PolymorphicTemplate.types';
import { componentShowcaseFactory } from '../../ComponentShowcase';
import { PolymorphicTemplate } from './PolymorphicTemplate';

const meta = {
  component: PolymorphicTemplate,
} satisfies Meta<typeof PolymorphicTemplate>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'PolymorphicTemplate',
} satisfies Partial<IPolymorphicTemplateProps>;

const variants: Array<IComponentPresentation<IPolymorphicTemplateProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IPolymorphicTemplateProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const PolymorphicTemplateShowcase =
  componentShowcaseFactory(PolymorphicTemplate);

export const Basic: IStory = {
  render: (props) => (
    <PolymorphicTemplateShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
