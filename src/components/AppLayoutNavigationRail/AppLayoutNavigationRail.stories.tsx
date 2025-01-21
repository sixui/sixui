import type { Meta, StoryObj } from '@storybook/react';
import { createSequence } from '@olivierpascal/helpers';

import type { IAppLayoutNavigationRailProps } from './AppLayoutNavigationRail.types';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { AppLayoutSideSheet } from '../AppLayoutSideSheet';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { AppLayoutNavigationRail } from './AppLayoutNavigationRail';

const meta = {
  component: AppLayoutNavigationRail,
} satisfies Meta<typeof AppLayoutNavigationRail>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: createSequence(3).map((index) => (
    <Placeholder key={index} expanded diagonals />
  )),
  divider: true,
} satisfies Partial<IAppLayoutNavigationRailProps>;

const AppLayoutNavigationRailFrame: React.FC<IAppLayoutNavigationRailProps> = (
  props,
) => {
  const [opened, toggleOpened] = useToggle([false, true]);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$2">
        <Button onClick={() => toggleOpened()}>
          {opened ? 'Close' : 'Open'}
        </Button>
      </Flex>
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
        <AppLayoutSideSheet side="right">
          <AppLayoutNavigationRail opened={opened} {...props} />
        </AppLayoutSideSheet>
      </Frame>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutNavigationRailFrame {...props} />,
  args: defaultArgs,
};

export default meta;
