import type { Meta, StoryObj } from '@storybook/react';
import { createSequence } from '@olivierpascal/helpers';

import type { IAppLayoutTopBarProps } from './AppLayoutTopBar.types';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { AppLayoutTopBar } from './AppLayoutTopBar';

const meta = {
  component: AppLayoutTopBar,
} satisfies Meta<typeof AppLayoutTopBar>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: createSequence(4).map((index) => (
    <Placeholder key={index} expanded diagonals />
  )),
  divider: true,
} satisfies Partial<IAppLayoutTopBarProps>;

const AppLayoutTopBarScreenFrame: React.FC<IAppLayoutTopBarProps> = (props) => {
  return (
    <ScreenFrame w="100%" h="$96">
      <AppLayoutTopBar {...props} />
    </ScreenFrame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutTopBarScreenFrame {...props} />,
  args: defaultArgs,
};

export default meta;
