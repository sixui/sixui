import type { Meta, StoryObj } from '@storybook/react';
import { createSequence } from '@olivierpascal/helpers';

import type { IAppLayoutTopBarProps } from './AppLayoutTopBar.types';
import { Frame } from '~/components/Frame';
import { Placeholder } from '~/components/Placeholder';
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

const AppLayoutTopBarFrame: React.FC<IAppLayoutTopBarProps> = (props) => {
  return (
    <Frame importParentStyles w="100%" h="$96">
      <AppLayoutTopBar {...props} />
    </Frame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutTopBarFrame {...props} />,
  args: defaultArgs,
};

export default meta;
