import type { Meta, StoryObj } from '@storybook/react';

import type { IPolymorphicTemplateProps } from './PolymorphicTemplate.types';
import { PolymorphicTemplate } from './PolymorphicTemplate';

const meta = {
  component: PolymorphicTemplate,
} satisfies Meta<typeof PolymorphicTemplate>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'PolymorphicTemplate',
} satisfies Partial<IPolymorphicTemplateProps>;

export const Basic: IStory = {
  render: (props) => <PolymorphicTemplate {...props} />,
  args: defaultArgs,
};

export const AsHeader: IStory = {
  render: (props) => <PolymorphicTemplate {...props} />,
  args: {
    ...defaultArgs,
    as: 'h1',
  },
};

export default meta;
