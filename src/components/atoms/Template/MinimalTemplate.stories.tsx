import type { Meta, StoryObj } from '@storybook/react';

import { MinimalTemplate, type IMinimalTemplateProps } from './MinimalTemplate';

const meta = {
  component: MinimalTemplate,
} satisfies Meta<typeof MinimalTemplate>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'MinimalTemplate',
} satisfies Partial<IMinimalTemplateProps>;

export const Minimal: IStory = {
  render: (props) => <MinimalTemplate {...props} />,
  args: defaultArgs,
};

export default meta;
