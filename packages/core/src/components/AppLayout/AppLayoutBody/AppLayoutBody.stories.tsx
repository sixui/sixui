import type { Meta, StoryObj } from '@storybook/react-vite';
import { createSequence } from '@olivierpascal/helpers';

import type { IAppLayoutBodyProps } from './AppLayoutBody.types';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { AppLayoutBody } from './AppLayoutBody';

const meta = {
  component: AppLayoutBody,
  args: {
    children: createSequence(3).map((index) => (
      <Placeholder key={index} grow={1} diagonals />
    )),
  },
} satisfies Meta<typeof AppLayoutBody>;

type IStory = StoryObj<typeof meta>;

const AppLayoutBodyScreenFrame: React.FC<IAppLayoutBodyProps> = (props) => {
  return (
    <ScreenFrame defaultHeight={350}>
      <AppLayoutBody h="100%" {...props} />
    </ScreenFrame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutBodyScreenFrame {...props} />,
};

export default meta;
