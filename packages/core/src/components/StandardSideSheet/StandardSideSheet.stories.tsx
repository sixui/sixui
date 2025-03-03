import type { Meta, StoryObj } from '@storybook/react';

import type { IStandardSideSheetProps } from './StandardSideSheet.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
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
      h="72px"
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
      h="72px"
    />
  ),
} satisfies Partial<IStandardSideSheetProps>;

const StandardSideSheetScreenFrame: React.FC<IStandardSideSheetProps> = (
  props,
) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);

  return (
    <Flex direction="column" gap="$sm">
      <Flex direction="row" gap="$xl">
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
      </ScreenFrame>
    </Flex>
  );
};

export const FromLeft: IStory = {
  render: (props) => <StandardSideSheetScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'left',
  },
};

export const FromRight: IStory = {
  render: (props) => <StandardSideSheetScreenFrame {...props} />,
  args: {
    ...defaultArgs,
    side: 'right',
  },
};

export default meta;
