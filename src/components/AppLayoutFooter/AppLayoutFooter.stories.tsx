import type { Meta, StoryObj } from '@storybook/react';
import { createSequence } from '@olivierpascal/helpers';

import type { IAppLayoutFooterProps } from './AppLayoutFooter.types';
import { px } from '~/helpers/styles/px';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { AppLayoutFooter } from './AppLayoutFooter';

const meta = {
  component: AppLayoutFooter,
} satisfies Meta<typeof AppLayoutFooter>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: createSequence(1).map((index) => (
    <Placeholder key={index} diagonals h="$72" />
  )),
  divider: true,
} satisfies Partial<IAppLayoutFooterProps>;

const AppLayoutFooterFrame: React.FC<IAppLayoutFooterProps> = (props) => {
  return (
    <Frame
      importParentStyles
      w="100%"
      h="$96"
      style={{
        borderWidth: px(1),
        borderStyle: 'dashed',
        borderColor: themeTokens.colorScheme.outlineVariant,
        borderTopWidth: 0,
      }}
    >
      <AppLayoutFooter {...props} />
    </Frame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutFooterFrame {...props} />,
  args: defaultArgs,
};

export default meta;
