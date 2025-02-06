import type { Meta, StoryObj } from '@storybook/react';

import type { IStandardSideSheetProps } from './StandardSideSheet.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Placeholder } from '~/components/Placeholder';
import { useToggle } from '~/hooks/useToggle';
import { StandardSideSheet } from './StandardSideSheet';

const meta = {
  component: StandardSideSheet,
} satisfies Meta<typeof StandardSideSheet>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  header: (
    <Placeholder
      label="Header"
      surface="$primaryContainer"
      color="$onPrimaryContainer"
      expanded
      diagonals
      h="$18"
    />
  ),
  children: (
    <Placeholder
      label="Content"
      surface="$primaryContainer"
      color="$onPrimaryContainer"
      expanded
      diagonals
    />
  ),
  footer: (
    <Placeholder
      label="Footer"
      surface="$primaryContainer"
      color="$onPrimaryContainer"
      expanded
      diagonals
      h="$18"
    />
  ),
} satisfies Partial<IStandardSideSheetProps>;

const StandardSideSheetFrame: React.FC<IStandardSideSheetProps> = (props) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$6">
        <Button
          onClick={() => {
            toggleOpened();
          }}
          w="$24"
        >
          {opened ? 'Close' : 'Open'}
        </Button>
      </Flex>

      <Frame importParentStyles w="100%" h="$96">
        <Flex
          direction={other.side === 'right' ? 'row' : 'row-reverse'}
          align="start"
          h="100%"
        >
          <Placeholder label="Page" grow={1} expanded diagonals />
          <StandardSideSheet
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
  render: (props) => <StandardSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const FromRight: IStory = {
  render: (props) => <StandardSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export default meta;
