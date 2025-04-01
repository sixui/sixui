import type { Meta, StoryObj } from '@storybook/react';

import type { IStandardAsideProps } from './StandardAside.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { useToggle } from '~/hooks/useToggle';
import { StandardAside } from './StandardAside';

const meta = {
  component: StandardAside,
} satisfies Meta<typeof StandardAside>;

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
} satisfies Partial<IStandardAsideProps>;

const StandardAsideScreenFrame: React.FC<IStandardAsideProps> = (props) => {
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

      <ScreenFrame defaultHeight={640}>
        <Flex
          direction={
            other.side === 'right'
              ? 'row'
              : other.side === 'left'
                ? 'row-reverse'
                : other.side === 'top'
                  ? 'column-reverse'
                  : 'column'
          }
          align="flex-start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <StandardAside
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
  render: (props) => <StandardAsideScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const FromRight: IStory = {
  render: (props) => <StandardAsideScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export const FromTop: IStory = {
  render: (props) => <StandardAsideScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'top',
  },
};

export const FromBottom: IStory = {
  render: (props) => <StandardAsideScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'bottom',
  },
};

export default meta;
