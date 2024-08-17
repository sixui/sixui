import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IAppShellProps } from './AppShell.types';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { Frame } from '../Frame';
import { AppShell } from './AppShell';
import { useDisclosure } from '~/hooks/useDisclosure';
import { Button } from '../Button';
import { appShellTokens } from './AppShell.stylex';
import { useSideSheet } from '../SideSheet/useSideSheet';

const meta = {
  component: AppShell,
} satisfies Meta<typeof AppShell>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'AppShell',
} satisfies Partial<IAppShellProps>;

const styles = stylex.create({
  frame: {
    width: '100%',
    height: `calc(400px * ${scaleTokens.scale})`,
    borderWidth: outlineTokens.width$xs,
    borderColor: colorSchemeTokens.outlineVariant,
    borderStyle: 'dashed',
  },
  appShell: {
    [appShellTokens.navigationDrawerWidth]: '200px',
  },
});

const AppShellFrame: React.FC<IAppShellProps> = (props) => {
  const [opened, { open, close, toggle }] = useDisclosure(true);
  const sideSheet = useSideSheet(opened, { onOpen: open, onClose: close });

  return (
    <Frame importParentStyles sx={styles.frame}>
      <AppShell
        navigationDrawer={{
          sideSheet,
        }}
        sx={styles.appShell}
        {...props}
      >
        <AppShell.NavigationDrawer onClose={close}>
          MAIN
        </AppShell.NavigationDrawer>
        <AppShell.Main>
          <Button onClick={toggle}>
            TOGGLE{' '}
            {sideSheet.standardOpened || sideSheet.modalOpened
              ? '(close)'
              : '(open)'}
          </Button>
        </AppShell.Main>
      </AppShell>
    </Frame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppShellFrame {...props} />,
  args: defaultArgs,
};

export default meta;
