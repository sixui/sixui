import type { Meta, StoryObj } from '@storybook/react';
import { createSequence } from '@olivierpascal/helpers';

import type { IAppLayoutBodyProps } from './AppLayoutBody.types';
import { Frame } from '~/components/Frame';
import { Placeholder } from '~/components/Placeholder';
import { AppLayoutBody } from './AppLayoutBody';

const meta = {
  component: AppLayoutBody,
} satisfies Meta<typeof AppLayoutBody>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: createSequence(3).map((index) => (
    <Placeholder key={index} grow={1} diagonals />
  )),
} satisfies Partial<IAppLayoutBodyProps>;

const AppLayoutBodyFrame: React.FC<IAppLayoutBodyProps> = (props) => {
  return (
    <Frame importParentStyles w="100%" h="$96">
      <AppLayoutBody {...props} />
    </Frame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutBodyFrame {...props} />,
  args: defaultArgs,
};

export default meta;
