import type { Meta, StoryObj } from '@storybook/react';
import { createSequence } from '@olivierpascal/helpers';

import type { IAppLayoutHeaderProps } from './AppLayoutHeader.types';
import { Frame } from '~/components/Frame';
import { Placeholder } from '~/components/Placeholder';
import { themeTokens } from '~/components/Theme';
import { px } from '~/utils/css/px';
import { AppLayoutHeader } from './AppLayoutHeader';

const meta = {
  component: AppLayoutHeader,
} satisfies Meta<typeof AppLayoutHeader>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: createSequence(4).map((index) => (
    <Placeholder key={index} expanded diagonals />
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
        borderColor: themeTokens.colorScheme.outlineVariant,
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
