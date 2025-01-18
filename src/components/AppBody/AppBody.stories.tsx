import type { Meta, StoryObj } from '@storybook/react';

import type { IAppBodyProps } from './AppBody.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { AppBody } from './AppBody';

const meta = {
  component: AppBody,
} satisfies Meta<typeof AppBody>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <>
      <span>Content</span>
      <span>Content</span>
      <span>Content</span>
    </>
  ),
  w: '$128',
  h: '$128',
  outline: '$xs',
  outlineStyle: 'dashed',
} satisfies Partial<IAppBodyProps>;

// FIXME: in frame (Body and Header)

const AppBodyShowcase = componentShowcaseFactory(AppBody);

export const Basic: IStory = {
  render: (props) => <AppBodyShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
