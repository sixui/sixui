import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IResizableProps } from './Resizable.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Resizable } from './Resizable';

const meta = {
  component: Resizable,
} satisfies Meta<typeof Resizable>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Resizable',
} satisfies Partial<IResizableProps>;

const variants: Array<IComponentPresentation<IResizableProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IResizableProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const ResizableShowcase = componentShowcaseFactory(Resizable);

export const Basic: IStory = {
  render: (props) => (
    <ResizableShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
