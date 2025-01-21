import type { Meta, StoryObj } from '@storybook/react';

import type { IAppLayoutPaneProps } from './AppLayoutPane.types';
import { px } from '~/helpers/styles/px';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { AppLayoutPane } from './AppLayoutPane';

const meta = {
  component: AppLayoutPane,
} satisfies Meta<typeof AppLayoutPane>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <Placeholder diagonals h="$72" />,
} satisfies Partial<IAppLayoutPaneProps>;

const AppLayoutPaneFrame: React.FC<IAppLayoutPaneProps> = (props) => {
  return (
    <Frame
      importParentStyles
      w="100%"
      h="$96"
      style={{
        borderWidth: px(1),
        borderStyle: 'dashed',
        borderColor: themeTokens.colorScheme.outlineVariant,
      }}
    >
      <AppLayoutPane {...props} />
    </Frame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutPaneFrame {...props} />,
  args: defaultArgs,
};

export default meta;
