import type { Meta, StoryObj } from '@storybook/react';

import type { IScreenFrameProps } from './ScreenFrame.types';
import { themeTokens } from '~/components/Theme';
import { ScreenFrame } from './ScreenFrame';

const meta = {
  component: ScreenFrame,
} satisfies Meta<typeof ScreenFrame>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        color: themeTokens.colorScheme.onPrimary,
      }}
    >
      Hello world!
    </div>
  ),
} satisfies Partial<IScreenFrameProps>;

export const Basic: IStory = {
  render: (props) => <ScreenFrame {...props} />,
  args: defaultArgs,
};

export default meta;
