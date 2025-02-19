import type { Meta, StoryObj } from '@storybook/react';

import type { IAppLayoutTopBarProps } from './AppLayoutTopBar.types';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { AppLayoutTopBar } from './AppLayoutTopBar';

const meta = {
  component: AppLayoutTopBar,
} satisfies Meta<typeof AppLayoutTopBar>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  headline: 'Headline',
  leadingNavigation: <Placeholder diagonals w="$8" h="$8" shape="$xs" />,
  trailingActions: (
    <>
      <Placeholder diagonals w="$8" h="$8" shape="$xs" />
      <Placeholder diagonals w="$8" h="$8" shape="$xs" />
    </>
  ),
  divider: true,
} satisfies Partial<IAppLayoutTopBarProps>;

const AppLayoutTopBarScreenFrame: React.FC<IAppLayoutTopBarProps> = (props) => {
  return (
    <ScreenFrame defaultHeight={350}>
      <AppLayoutTopBar {...props} />
    </ScreenFrame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutTopBarScreenFrame {...props} />,
  args: defaultArgs,
};

export default meta;
