import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../../ComponentShowcase';
import type { IBasicTemplateProps } from './BasicTemplate.types';
import { componentShowcaseFactory } from '../../ComponentShowcase';
import { BasicTemplate } from './BasicTemplate';

const meta = {
  component: BasicTemplate,
} satisfies Meta<typeof BasicTemplate>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'BasicTemplate',
} satisfies Partial<IBasicTemplateProps>;

const variants: Array<IComponentPresentation<IBasicTemplateProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IBasicTemplateProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const BasicTemplateShowcase = componentShowcaseFactory(BasicTemplate);

export const Basic: IStory = {
  render: (props) => (
    <BasicTemplateShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
