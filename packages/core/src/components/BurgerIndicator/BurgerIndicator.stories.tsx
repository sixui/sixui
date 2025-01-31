import type { Meta, StoryObj } from '@storybook/react';

import type { IBurgerIndicatorProps } from './BurgerIndicator.types';
import { useToggle } from '~/hooks';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { BurgerIndicator } from './BurgerIndicator';

const meta = {
  component: BurgerIndicator,
} satisfies Meta<typeof BurgerIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IBurgerIndicatorProps>;

const BurgerIndicatorDemo: React.FC<IBurgerIndicatorProps> = (props) => {
  const [opened, toggleOpened] = useToggle([false, true]);

  return (
    <Flex direction="row" gap="$2" align="center">
      <Button
        onClick={() => {
          toggleOpened();
        }}
      >
        {opened ? 'Close' : 'Open'}
      </Button>

      <BurgerIndicator opened={opened} {...props} />
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <BurgerIndicatorDemo {...props} />,
  args: defaultArgs,
};

export default meta;
