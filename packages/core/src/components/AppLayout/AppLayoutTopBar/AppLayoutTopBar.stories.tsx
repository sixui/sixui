import type { Meta, StoryObj } from '@storybook/react';

import type { IAppLayoutTopBarProps } from './AppLayoutTopBar.types';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { AppLayoutTopBar } from './AppLayoutTopBar';

const meta = {
  component: AppLayoutTopBar,
  args: {
    headline: 'Headline',
    leadingNavigation: <Placeholder diagonals w="32px" h="32px" shape="$xs" />,
    trailingActions: (
      <>
        <Placeholder diagonals w="32px" h="32px" shape="$xs" />
        <Placeholder diagonals w="32px" h="32px" shape="$xs" />
      </>
    ),
    divider: true,
  },
} satisfies Meta<typeof AppLayoutTopBar>;

type IStory = StoryObj<typeof meta>;

const AppLayoutTopBarScreenFrame: React.FC<IAppLayoutTopBarProps> = (props) => {
  return (
    <ScreenFrame defaultHeight={350}>
      <AppLayoutTopBar {...props} />
    </ScreenFrame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutTopBarScreenFrame {...props} />,
};

export default meta;
