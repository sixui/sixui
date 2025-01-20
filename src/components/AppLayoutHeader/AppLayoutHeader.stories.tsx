import type { Meta, StoryObj } from '@storybook/react';
import { createSequence } from '@olivierpascal/helpers';

import type { IAppLayoutHeaderProps } from './AppLayoutHeader.types';
import { px } from '~/helpers/styles/px';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { AppLayoutHeader } from './AppLayoutHeader';

const meta = {
  component: AppLayoutHeader,
} satisfies Meta<typeof AppLayoutHeader>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: createSequence(3).map((index) => (
    <Placeholder key={index} grow={1} diagonals />
  )),
  divider: true,
} satisfies Partial<IAppLayoutHeaderProps>;

const AppLayoutHeaderFrame: React.FC<IAppLayoutHeaderProps> = (props) => {
  return (
    <Frame
      importParentStyles
      w="100%"
      h="$96"
      style={{
        borderWidth: px(1),
        borderStyle: 'dashed',
        borderColor: themeTokens.colorScheme.outline,
      }}
    >
      <AppLayoutHeader {...props} />
    </Frame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutHeaderFrame {...props} />,
  args: defaultArgs,
};

export default meta;
