import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IBasicTemplateProps } from './BasicTemplate.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { BasicTemplate } from './BasicTemplate';

const meta = {
  component: BasicTemplate,
  args: {
    children: 'BasicTemplate',
  },
} satisfies Meta<typeof BasicTemplate>;

type IStory = StoryObj<typeof meta>;

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
};

export default meta;
