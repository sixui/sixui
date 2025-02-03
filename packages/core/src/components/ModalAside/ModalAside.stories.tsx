import type { Meta, StoryObj } from '@storybook/react';

import type { IModalAsideProps } from './ModalAside.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Placeholder } from '~/components/Placeholder';
import { themeTokens } from '~/components/Theme';
import { useToggle } from '~/hooks/useToggle';
import { px } from '~/utils/css/px';
import { ModalAside } from './ModalAside';

const meta = {
  component: ModalAside,
} satisfies Meta<typeof ModalAside>;

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
} satisfies Partial<IModalAsideProps>;

const ModalAsideFrame: React.FC<IModalAsideProps> = (props) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$2">
        <Button
          onClick={() => {
            toggleOpened();
          }}
          w="$24"
        >
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
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <ModalAside
            opened={opened}
            onClose={() => {
              toggleOpened(false);
            }}
            {...other}
          />
        </Flex>
      </Frame>
    </Flex>
  );
};

export const FromLeft: IStory = {
  render: (props) => <ModalAsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const FromLeftDetached: IStory = {
  render: (props) => <ModalAsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
    detached: true,
  },
};

export const FromRight: IStory = {
  render: (props) => <ModalAsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export const FromRightDetached: IStory = {
  render: (props) => <ModalAsideFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
    detached: true,
  },
};

export default meta;
