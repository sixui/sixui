import type { Meta, StoryObj } from '@storybook/react';

import type { IFrameProps } from './Frame.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { themeTokens } from '~/components/Theme';
import { px } from '~/utils/css/px';
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
        backgroundColor: themeTokens.colorScheme.primary,
        backgroundImage: `-webkit-linear-gradient(45deg, ${themeTokens.colorScheme.primary} 50%, #fff 50%)`,
        color: themeTokens.colorScheme.onPrimary,
      }}
    >
      Hello world!
    </div>
  ),
  w: '$48',
  h: '$48',
  style: {
    borderWidth: px(1),
    borderStyle: 'dashed',
    borderColor: themeTokens.colorScheme.outlineVariant,
  },
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
