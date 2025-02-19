import type { Meta, StoryObj } from '@storybook/react';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { ISlotProps } from './Slot.types';
import { Box } from '~/components/Box';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { useToggle } from '~/hooks';
import { Slot } from './Slot';

const meta = {
  component: Slot,
} satisfies Meta<typeof Slot>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <FontAwesomeIcon icon={faSmile} />,
} satisfies Partial<ISlotProps>;

const SlotDemo: React.FC<ISlotProps> = (props) => {
  const [opened, toggleOpened] = useToggle([false, true]);

  return (
    <Flex direction="row" gap="$2">
      <Button
        onClick={() => {
          toggleOpened();
        }}
        w="$24"
      >
        {opened ? 'Close' : 'Open'}
      </Button>

      <Box w="$10" h="$10">
        <Slot
          as={Flex}
          opened={opened}
          h="$10"
          align="center"
          justify="center"
          {...props}
        />
      </Box>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <SlotDemo {...props} />,
  args: defaultArgs,
};

export const Animated: IStory = {
  render: (props) => <SlotDemo {...props} />,
  args: {
    ...defaultArgs,
    animated: true,
  },
};

export default meta;
