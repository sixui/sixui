import type { Meta, StoryObj } from '@storybook/react';

import { TemplatePlayground } from './TemplatePlayground';

const meta = {
  component: TemplatePlayground,
} satisfies Meta<typeof TemplatePlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <TemplatePlayground {...props} />,
};

export default meta;
