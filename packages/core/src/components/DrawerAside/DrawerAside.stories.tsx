import type { Meta, StoryObj } from '@storybook/react';

import type { IDrawerAsideProps } from './DrawerAside.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { useToggle } from '~/hooks/useToggle';
import { DrawerAside } from './DrawerAside';

const meta = {
  component: DrawerAside,
} satisfies Meta<typeof DrawerAside>;

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
} satisfies Partial<IDrawerAsideProps>;

const DrawerAsideScreenFrame: React.FC<IDrawerAsideProps> = (props) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);

  return (
    <Flex direction="column" gap="$sm">
      <Flex direction="row" gap="$sm">
        <Button
          onClick={() => {
            toggleOpened();
          }}
          w="96px"
        >
          {opened ? 'Close' : 'Open'}
        </Button>
      </Flex>

      <ScreenFrame defaultHeight={350}>
        <Flex
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="flex-start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <DrawerAside
            opened={opened}
            onClose={() => {
              toggleOpened(false);
            }}
            {...other}
          />
        </Flex>
      </ScreenFrame>
    </Flex>
  );
};

export const FromLeft: IStory = {
  render: (props) => <DrawerAsideScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const FromLeftDetached: IStory = {
  render: (props) => <DrawerAsideScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
    detached: true,
  },
};

export const FromRight: IStory = {
  render: (props) => <DrawerAsideScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export const FromRightDetached: IStory = {
  render: (props) => <DrawerAsideScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
    detached: true,
  },
};

export default meta;
