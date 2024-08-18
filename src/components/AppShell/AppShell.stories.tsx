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
import { useSideSheet } from '../SideSheet/useSideSheet';
import { Text } from '../Text';
import { createSequence } from '@olivierpascal/helpers';

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
});

const AppShellFrame: React.FC<IAppShellProps> = (props) => {
  const [navigationDrawerOpened, navigationDrawerCallbacks] =
    useDisclosure(true);
  const navigationDrawer = useSideSheet(navigationDrawerOpened, {
    onOpen: navigationDrawerCallbacks.open,
    onClose: navigationDrawerCallbacks.close,
  });

  const [asideOpened, asideCallbacks] = useDisclosure(false);
  const aside = useSideSheet(asideOpened, {
    onOpen: asideCallbacks.open,
    onClose: asideCallbacks.close,
  });

  return (
    <Frame importParentStyles sx={styles.frame}>
      <AppShell
        navigationDrawer={{
          sideSheet: {
            isModal: navigationDrawer.isModal,
            modalOpened: navigationDrawer.modalOpened,
            standardOpened: navigationDrawer.standardOpened,
          },
        }}
        aside={{
          sideSheet: {
            isModal: true,
            modalOpened: aside.modalOpened || aside.standardOpened,
            standardOpened: false,
          },
        }}
        {...props}
      >
        <AppShell.NavigationDrawer
          onClose={navigationDrawerCallbacks.close}
          headline='Headline'
          showCloseButton
        >
          MAIN
        </AppShell.NavigationDrawer>
        <AppShell.Body>
          <Button onClick={navigationDrawerCallbacks.toggle}>
            TOGGLE NAV{' '}
            {navigationDrawer.standardOpened || navigationDrawer.modalOpened
              ? '(close)'
              : '(open)'}
          </Button>

          <Button onClick={asideCallbacks.toggle}>
            TOGGLE ASIDE{' '}
            {aside.standardOpened || aside.modalOpened ? '(close)' : '(open)'}
          </Button>

          {createSequence(20).map((i) => (
            <Text key={i} gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a
              ullamcorper nisl. In ut diam sapien. Proin orci mauris, pretium ac
              ante ut, porta fermentum ipsum. Proin at lobortis turpis, a
              rhoncus massa.
            </Text>
          ))}
        </AppShell.Body>
        <AppShell.Aside
          onClose={asideCallbacks.close}
          headline='Headline'
          showCloseButton
          // variant='detached'
        >
          ASIDE
        </AppShell.Aside>
      </AppShell>
    </Frame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppShellFrame {...props} />,
  args: defaultArgs,
};

export default meta;
