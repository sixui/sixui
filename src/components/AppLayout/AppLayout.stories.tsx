import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import type { IAppLayoutProps } from './AppLayout.types';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { Frame } from '../Frame';
import { AppLayout } from './AppLayout';
import { useDisclosure } from '~/hooks/useDisclosure';
import { useSideSheet } from '../SideSheet/useSideSheet';
import { Text } from '../Text';
import { createSequence } from '@olivierpascal/helpers';
import { Stack } from '../Stack';
import { IconButton } from '../IconButton';

const meta = {
  component: AppLayout,
} satisfies Meta<typeof AppLayout>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'AppLayout',
} satisfies Partial<IAppLayoutProps>;

const styles = stylex.create({
  frame: {
    width: '100%',
    height: `calc(400px * ${scaleTokens.scale})`,
    borderWidth: outlineTokens.width$xs,
    borderColor: colorSchemeTokens.outlineVariant,
    borderStyle: 'dashed',
  },
});

type IHeaderContent = {
  navigationDrawerOpened?: boolean;
  toggleNavigationDrawer?: () => void;
  asideOpened?: boolean;
  toggleAside?: () => void;
};

const HeaderContent: React.FC<IHeaderContent> = (props) => {
  const {
    navigationDrawerOpened,
    toggleNavigationDrawer,
    asideOpened,
    toggleAside,
  } = props;

  return (
    <Stack horizontal gap={6} justify='space-between' grow>
      <Stack horizontal gap={2}>
        {toggleNavigationDrawer ? (
          <IconButton
            icon={
              <FontAwesomeIcon
                icon={navigationDrawerOpened ? faXmark : faBars}
              />
            }
            onClick={toggleNavigationDrawer}
          />
        ) : null}
      </Stack>

      <Stack horizontal gap={2}>
        {toggleAside ? (
          <IconButton
            icon={<FontAwesomeIcon icon={asideOpened ? faXmark : faBars} />}
            onClick={toggleAside}
          />
        ) : null}
      </Stack>
    </Stack>
  );
};

const BodyContent: React.FC = () =>
  createSequence(20).map((i) => (
    <Text key={i} gutterBottom>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a ullamcorper
      nisl. In ut diam sapien. Proin orci mauris, pretium ac ante ut, porta
      fermentum ipsum. Proin at lobortis turpis, a rhoncus massa.
    </Text>
  ));

const AppLayoutFrameA: React.FC<IAppLayoutProps> = (props) => {
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
      <AppLayout
        navigationDrawer={{
          sideSheet: {
            isModal: navigationDrawer.isModal,
            modalOpened: navigationDrawer.modalOpened,
            standardOpened: navigationDrawer.standardOpened,
          },
          fullHeight: false,
        }}
        aside={{
          sideSheet: {
            isModal: aside.isModal,
            modalOpened: aside.modalOpened,
            standardOpened: aside.standardOpened,
          },
          fullHeight: false,
        }}
        {...props}
      >
        <Stack>
          <AppLayout.Header>
            <HeaderContent
              navigationDrawerOpened={navigationDrawerOpened}
              toggleNavigationDrawer={navigationDrawerCallbacks.toggle}
              asideOpened={asideOpened}
              toggleAside={asideCallbacks.toggle}
            />
          </AppLayout.Header>

          <Stack horizontal align='start'>
            <AppLayout.NavigationDrawer
              onClose={navigationDrawerCallbacks.close}
            >
              NAVIGATION
            </AppLayout.NavigationDrawer>

            <AppLayout.Body followNavigationDrawer followHeader followAside>
              <BodyContent />
            </AppLayout.Body>

            <AppLayout.Aside onClose={asideCallbacks.close} variant='detached'>
              ASIDE
            </AppLayout.Aside>
          </Stack>
        </Stack>
        <AppLayout.Footer>FOOTER</AppLayout.Footer>
      </AppLayout>
    </Frame>
  );
};

const AppLayoutFrameB: React.FC<IAppLayoutProps> = (props) => {
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
      <AppLayout
        navigationDrawer={{
          sideSheet: {
            isModal: navigationDrawer.isModal,
            modalOpened: navigationDrawer.modalOpened,
            standardOpened: navigationDrawer.standardOpened,
          },
          fullHeight: true,
        }}
        aside={{
          sideSheet: {
            isModal: aside.isModal,
            modalOpened: aside.modalOpened,
            standardOpened: aside.standardOpened,
          },
          fullHeight: false,
        }}
        {...props}
      >
        <Stack>
          <Stack horizontal align='start'>
            <AppLayout.NavigationDrawer
              onClose={navigationDrawerCallbacks.close}
              headline='Headline'
              showCloseButton
            >
              NAVIGATION
            </AppLayout.NavigationDrawer>

            <AppLayout.Body followNavigationDrawer followHeader>
              <AppLayout.Header>
                <HeaderContent
                  navigationDrawerOpened={navigationDrawerOpened}
                  toggleNavigationDrawer={
                    navigationDrawerOpened
                      ? undefined
                      : navigationDrawerCallbacks.toggle
                  }
                  asideOpened={asideOpened}
                  toggleAside={asideCallbacks.toggle}
                />
              </AppLayout.Header>

              <Stack horizontal align='start'>
                <AppLayout.Body followAside>
                  <BodyContent />
                </AppLayout.Body>

                <AppLayout.Aside
                  onClose={asideCallbacks.close}
                  headline='Headline'
                  variant='detached'
                >
                  ASIDE
                </AppLayout.Aside>
              </Stack>
            </AppLayout.Body>
          </Stack>
        </Stack>
        <AppLayout.Footer>FOOTER</AppLayout.Footer>
      </AppLayout>
    </Frame>
  );
};

export const Basic: IStory = {
  render: (props) => <AppLayoutFrameA {...props} />,
  args: defaultArgs,
};

export const BasicB: IStory = {
  render: (props) => <AppLayoutFrameB {...props} />,
  args: defaultArgs,
};

export default meta;
