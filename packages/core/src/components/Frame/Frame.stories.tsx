import type { Meta, StoryObj } from '@storybook/react';

import type { IFrameProps } from './Frame.types';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { themeTokens } from '~/components/Theme';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
import { Frame } from './Frame';

const meta = {
  component: Frame,
} satisfies Meta<typeof Frame>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: themeTokens.colorScheme.inverseSurface,
        backgroundImage: `-webkit-linear-gradient(45deg, ${themeTokens.colorScheme.inverseSurface} 50%, ${themeTokens.colorScheme.surface} 50%)`,
        color: themeTokens.colorScheme.inverseOnSurface,
      }}
    >
      <Button onClick={(...args) => sbHandleEvent('action:onClick', args)}>
        Hello World!
      </Button>
    </div>
  ),
  w: '16px8',
  h: '16px8',
} satisfies Partial<IFrameProps>;

const FrameShowcase = componentShowcaseFactory(Frame);

export const Basic: IStory = {
  render: (props) => <FrameShowcase props={props} />,
  args: defaultArgs,
};

export const WithParentStyles: IStory = {
  render: (props) => <FrameShowcase props={props} />,
  args: {
    ...defaultArgs,
    importParentStyles: true,
  },
};

export default meta;
