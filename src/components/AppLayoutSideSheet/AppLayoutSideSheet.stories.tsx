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

interface IAppLayoutSideSheetFrameProps extends IAppLayoutSideSheetProps {
  side: 'left' | 'right';
}

const AppLayoutSideSheetFrame: React.FC<IAppLayoutSideSheetFrameProps> = (
  props,
) => {
  const { side, ...other } = props;
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
        <Flex
          direction={side === 'right' ? 'row' : 'row-reverse'}
          align="start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <AppLayoutSideSheet
            style={assignInlineVars({
              [AppLayoutSideSheet.theme.tokens.container.width]: '384px',
            })}
            side={side}
            opened={opened}
            {...other}
          >
            <SideSheet
              w="$96"
              standardOpened={opened}
              side={side}
              divider
              header={
                <Placeholder
                  label="Header"
                  grow={1}
                  h="$16"
                  diagonals
                  surface="$primaryContainer"
                  color="$onPrimaryContainer"
                />
              }
              footer={
                <Placeholder
                  label="Footer"
                  grow={1}
                  h="$16"
                  diagonals
                  surface="$primaryContainer"
                  color="$onPrimaryContainer"
                />
              }
            >
              <Placeholder
                label="Content"
                grow={1}
                expanded
                diagonals
                surface="$primaryContainer"
                color="$onPrimaryContainer"
              />
            </SideSheet>
          </AppLayoutSideSheet>
        </Flex>
      </Frame>
    </Flex>
  );
};

const meta = {
  component: AppLayoutSideSheetFrame,
} satisfies Meta<typeof AppLayoutSideSheetFrame>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IAppLayoutSideSheetProps>;

export const Left: IStory = {
  render: (props) => <AppLayoutSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const Right: IStory = {
  render: (props) => <AppLayoutSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export default meta;
