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
  const [opened, { open, close, toggle }] = useDisclosure(true);
  const sideSheet = useSideSheet(opened, { onOpen: open, onClose: close });

  return (
    <Frame importParentStyles sx={styles.frame}>
      <AppShell
        navigationDrawer={{
          sideSheet,
        }}
        {...props}
      >
        <AppShell.NavigationDrawer
          onClose={close}
          headline='Headline'
          showCloseButton
        >
          MAIN
        </AppShell.NavigationDrawer>
        <AppShell.Body>
          <Button onClick={toggle}>
            TOGGLE{' '}
            {sideSheet.standardOpened || sideSheet.modalOpened
              ? '(close)'
              : '(open)'}
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
      </AppShell>
    </Frame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppShellFrame {...props} />,
  args: defaultArgs,
};

export default meta;
