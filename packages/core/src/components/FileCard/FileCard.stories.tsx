import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IFileCardProps } from './FileCard.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { FileCard } from './FileCard';

const meta = {
  component: FileCard,
} satisfies Meta<typeof FileCard>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'FileCard',
} satisfies Partial<IFileCardProps>;

const variants: Array<IComponentPresentation<IFileCardProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IFileCardProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const FileCardShowcase = componentShowcaseFactory(FileCard);

export const Basic: IStory = {
  render: (props) => (
    <FileCardShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
