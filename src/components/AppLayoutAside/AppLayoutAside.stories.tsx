import type { Meta, StoryObj } from '@storybook/react';

import type { IAppLayoutAsideProps } from './AppLayoutAside.types';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { AppLayoutAside } from './AppLayoutAside';

const meta = {
  component: AppLayoutAside,
} satisfies Meta<typeof AppLayoutAside>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <Placeholder w="$24" grow={1} expanded diagonals />,
} satisfies Partial<IAppLayoutAsideProps>;

const AppLayoutAsideFrame: React.FC<IAppLayoutAsideProps> = (props) => {
  const [opened, toggleOpened] = useToggle([false, true]);

  return (
    <Flex direction="column" gap="$2" align="start">
      <Button onClick={() => toggleOpened()}>
        {opened ? 'Close' : 'Open'}
      </Button>
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
        <AppLayoutAside standardOpened={opened} {...props} />
      </Frame>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutAsideFrame {...props} />,
  args: defaultArgs,
};

export default meta;
