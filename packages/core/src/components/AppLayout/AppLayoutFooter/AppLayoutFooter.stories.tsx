import type { Meta, StoryObj } from '@storybook/react';

import type { IAppLayoutFooterProps } from './AppLayoutFooter.types';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { AppLayoutFooter } from './AppLayoutFooter';

const meta = {
  component: AppLayoutFooter,
} satisfies Meta<typeof AppLayoutFooter>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <Placeholder diagonals h="$72" />,
  divider: true,
} satisfies Partial<IAppLayoutFooterProps>;

const AppLayoutFooterScreenFrame: React.FC<IAppLayoutFooterProps> = (props) => {
  return (
    <ScreenFrame
      h={350}
      style={{
        borderTopWidth: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <AppLayoutFooter {...props} />
    </ScreenFrame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutFooterScreenFrame {...props} />,
  args: defaultArgs,
};

export default meta;
