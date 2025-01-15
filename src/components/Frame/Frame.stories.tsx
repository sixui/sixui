import type { Meta, StoryObj } from '@storybook/react';

import type { IFrameProps } from './Frame.types';
import { px } from '~/helpers/styles/px';
import { Button } from '../Button';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { ThemeProvider, themeTokens } from '../ThemeProvider';
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
        backgroundColor: '#000',
        backgroundImage: '-webkit-linear-gradient(45deg, #000 50%, #fff 50%)',
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
    borderColor: themeTokens.colorScheme.outline,
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
