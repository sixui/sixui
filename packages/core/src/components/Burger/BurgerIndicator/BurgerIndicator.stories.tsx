import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IBurgerIndicatorProps } from './BurgerIndicator.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { useToggle } from '~/hooks';
import { BurgerIndicator } from './BurgerIndicator';

const meta = {
  component: BurgerIndicator,
} satisfies Meta<typeof BurgerIndicator>;

type IStory = StoryObj<typeof meta>;

const BurgerIndicatorDemo: React.FC<IBurgerIndicatorProps> = (props) => {
  const [opened, toggleOpened] = useToggle([false, true]);

  return (
    <Flex direction="row" gap="$xl" align="center">
      <Button
        onClick={() => {
          toggleOpened();
        }}
        w="96px"
      >
        {opened ? 'Close' : 'Open'}
      </Button>

      <BurgerIndicator opened={opened} {...props} />
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <BurgerIndicatorDemo {...props} />,
};

export default meta;
