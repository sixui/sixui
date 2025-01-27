import type { Meta, StoryObj } from '@storybook/react';

import type { IAppLayoutFooterProps } from './AppLayoutFooter.types';
import { Frame } from '~/components/Frame';
import { Placeholder } from '~/components/Placeholder';
import { themeTokens } from '~/components/ThemeProvider';
import { px } from '~/helpers/styles/px';
import { AppLayoutFooter } from './AppLayoutFooter';

const meta = {
  component: AppLayoutFooter,
} satisfies Meta<typeof AppLayoutFooter>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <Placeholder diagonals h="$72" />,
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
