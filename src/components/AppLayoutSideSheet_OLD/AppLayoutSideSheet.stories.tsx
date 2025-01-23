import type { Meta, StoryObj } from '@storybook/react';

import type { IAppLayoutSideSheetProps } from './AppLayoutSideSheet.types';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { SideSheet } from '../SideSheet';
import { themeTokens } from '../ThemeProvider';

interface IAppLayoutSideSheetFrameProps extends IAppLayoutSideSheetProps {
  side: 'left' | 'right';
}

const AppLayoutSideSheetFrame: React.FC<IAppLayoutSideSheetFrameProps> = (
  props,
) => {
  const { side, ...other } = props;
  const [standardOpened, toggleStandardOpened] = useToggle([true, false]);
  const [modalOpened, toggleModalOpened] = useToggle([false, true]);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$2">
        <Button onClick={() => toggleStandardOpened()}>
          {standardOpened ? 'Close' : 'Open'} standard
        </Button>
        <Button onClick={() => toggleModalOpened()}>
          {modalOpened ? 'Close' : 'Open'} modal
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
          <SideSheet
            standardOpened={standardOpened}
            modalOpened={modalOpened}
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
