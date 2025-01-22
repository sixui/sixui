import type { Meta, StoryObj } from '@storybook/react';

import type { ISideSheetProps } from './SideSheet.types';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { SideSheet } from './SideSheet';

const meta = {
  component: SideSheet,
} satisfies Meta<typeof SideSheet>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  header: (
    <Placeholder
      label="Header"
      grow={1}
      h="$16"
      diagonals
      surface="$primaryContainer"
      color="$onPrimaryContainer"
    />
  ),
  footer: (
    <Placeholder
      label="Footer"
      grow={1}
      h="$16"
      diagonals
      surface="$primaryContainer"
      color="$onPrimaryContainer"
    />
  ),
  children: (
    <Placeholder
      label="Content"
      grow={1}
      expanded
      diagonals
      surface="$primaryContainer"
      color="$onPrimaryContainer"
    />
  ),
  divider: true,
} satisfies Partial<ISideSheetProps>;

const SideSheetFrame: React.FC<ISideSheetProps> = (props) => {
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
        <SideSheet
          standardOpened={standardOpened}
          modalOpened={modalOpened}
          onClose={() => toggleModalOpened(false)}
          side="left"
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
          {...props}
        />
      </Frame>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <SideSheetFrame {...props} />,
  args: defaultArgs,
};

export default meta;
