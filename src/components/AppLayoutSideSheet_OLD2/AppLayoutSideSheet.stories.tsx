import type { Meta, StoryObj } from '@storybook/react';

import type { IAppLayoutSideSheetProps } from './AppLayoutSideSheet.types';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { AppLayoutSideSheet } from './AppLayoutSideSheet';

const meta = {
  component: AppLayoutSideSheet,
} satisfies Meta<typeof AppLayoutSideSheet>;

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
} satisfies Partial<IAppLayoutSideSheetProps>;

const AppLayoutSideSheetFrame: React.FC<IAppLayoutSideSheetProps> = (props) => {
  const { ...other } = props;
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
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <AppLayoutSideSheet
            standardOpened={standardOpened}
            modalOpened={modalOpened}
            onClose={() => toggleModalOpened(false)}
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
            {...other}
          />
        </Flex>
      </Frame>
    </Flex>
  );
};

export const Left: IStory = {
  render: (props) => <AppLayoutSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const LeftDetached: IStory = {
  render: (props) => <AppLayoutSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
    detached: true,
  },
};

export const Right: IStory = {
  render: (props) => <AppLayoutSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export const RightDetached: IStory = {
  render: (props) => <AppLayoutSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
    detached: true,
  },
};

export default meta;
