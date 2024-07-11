import type { Meta, StoryObj } from '@storybook/react';

import type { IBasicTemplateProps } from './BasicTemplateProps';
import { BasicTemplate } from './BasicTemplate';

const meta = {
  component: BasicTemplate,
} satisfies Meta<typeof BasicTemplate>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'BasicTemplate',
} satisfies Partial<IBasicTemplateProps>;

export const Basic: IStory = {
  render: (props) => <BasicTemplate {...props} />,
  args: defaultArgs,
};

export default meta;
