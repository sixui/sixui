import type { Meta, StoryObj } from '@storybook/react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import type { IAppLayoutSideSheetProps } from './AppLayoutSideSheet.types';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { SideSheet } from '../SideSheet';
import { themeTokens } from '../ThemeProvider';
import { AppLayoutSideSheet } from './AppLayoutSideSheet';

const meta = {
  component: AppLayoutSideSheet,
} satisfies Meta<typeof AppLayoutSideSheet>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <Placeholder w="$96" expanded diagonals />,
} satisfies Partial<IAppLayoutSideSheetProps>;

const AppLayoutSideSheetFrame: React.FC<IAppLayoutSideSheetProps> = (props) => {
  const [opened, toggleOpened] = useToggle([true, false]);

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
        <Flex direction="row" align="start" h="100%">
          <Placeholder label="Page" grow={1} expanded diagonals />
          <AppLayoutSideSheet
            style={assignInlineVars({
              [AppLayoutSideSheet.theme.tokens.container.width]: '384px',
            })}
            asideOpened={opened}
            {...props}
          >
            <SideSheet w="$96" standardOpened={opened} side="right" divider>
              <Placeholder label="SideSheet" grow={1} expanded diagonals />
            </SideSheet>
          </AppLayoutSideSheet>
        </Flex>
      </Frame>
    </Flex>
  );
};

export const Left: IStory = {
  render: (props) => <AppLayoutSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
  },
};

export default meta;
