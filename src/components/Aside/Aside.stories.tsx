import type { Meta, StoryObj } from '@storybook/react';

import type { IAsideProps } from './Aside.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Placeholder } from '~/components/Placeholder';
import { themeTokens } from '~/components/ThemeProvider';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { Aside } from './Aside';

const meta = {
  component: Aside,
} satisfies Meta<typeof Aside>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
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
} satisfies Partial<IAsideProps>;

const AsideFrame: React.FC<IAsideProps> = (props) => {
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
          <Aside
            standardOpened={standardOpened}
            modalOpened={modalOpened}
            onClose={() => toggleModalOpened(false)}
            {...other}
          />
        </Flex>
      </Frame>
    </Flex>
  );
};

export const FromLeft: IStory = {
  render: (props) => <AsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const FromLeftDetached: IStory = {
  render: (props) => <AsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
    detached: true,
  },
};

export const FromRight: IStory = {
  render: (props) => <AsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export const FromRightDetached: IStory = {
  render: (props) => <AsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
    detached: true,
  },
};

export default meta;
