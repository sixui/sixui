import type { Meta, StoryObj } from '@storybook/react';

import type { IAsideProps } from './Aside.types';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { AppLayoutSideSheet } from '../AppLayoutSideSheet';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { Aside } from './Aside';

const meta = {
  component: Aside,
} satisfies Meta<typeof Aside>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <Placeholder expanded diagonals label="Aside" />,
  divider: true,
} satisfies Partial<IAsideProps>;

const AsideFrame: React.FC<IAsideProps> = (props) => {
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
        <Flex direction="row" h="100%">
          <Placeholder w="$48" h="100%" diagonals label="Page" />
          <AppLayoutSideSheet side="right">
            <Aside
              standardOpened={standardOpened}
              modalOpened={modalOpened}
              {...props}
            />
          </AppLayoutSideSheet>
        </Flex>
      </Frame>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <AsideFrame {...props} />,
  args: defaultArgs,
};

export default meta;
