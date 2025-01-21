import type { Meta, StoryObj } from '@storybook/react';

import type { IAppLayoutNavigationDrawerProps } from './AppLayoutNavigationDrawer.types';
import { px } from '~/helpers/styles/px';
import { useToggle } from '~/hooks/useToggle';
import { AppLayoutSideSheet } from '../AppLayoutSideSheet';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { Placeholder } from '../Placeholder';
import { themeTokens } from '../ThemeProvider';
import { AppLayoutNavigationDrawer } from './AppLayoutNavigationDrawer';

const meta = {
  component: AppLayoutNavigationDrawer,
} satisfies Meta<typeof AppLayoutNavigationDrawer>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <Placeholder expanded diagonals />,
  divider: true,
} satisfies Partial<IAppLayoutNavigationDrawerProps>;

const AppLayoutNavigationDrawerFrame: React.FC<
  IAppLayoutNavigationDrawerProps
> = (props) => {
  const [standardOpened, toggleStandardOpened] = useToggle([false, true]);
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
        <AppLayoutSideSheet side="right">
          <AppLayoutNavigationDrawer
            standardOpened={standardOpened}
            modalOpened={modalOpened}
            {...props}
          />
        </AppLayoutSideSheet>
      </Frame>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutNavigationDrawerFrame {...props} />,
  args: defaultArgs,
};

export default meta;
