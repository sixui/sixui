import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faXmark,
  faSquare as faSquareSolid,
  faCircle as faCircleSolid,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import { createSequence } from '@olivierpascal/helpers';
import {
  faSquare,
  faCircle,
  faHeart,
} from '@fortawesome/free-regular-svg-icons';

import type { IAppLayoutProps } from './AppLayout.types';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { useDisclosure } from '~/hooks/useDisclosure';
import { Frame } from '../Frame';
import { useSideSheet } from '../SideSheet/useSideSheet';
import { Text } from '../Text';
import { Stack } from '../Stack';
import { IconButton } from '../IconButton';
import { Placeholder } from '../Placeholder';
import { NavigationRailDestination } from '../NavigationRailDestination';
import { useAppLayoutContext } from './AppLayout.context';
import { AppLayout } from './AppLayout';

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
        <div>Header</div>
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

const BodyContent: React.FC = () => {
  const { canonicalLayout } = useAppLayoutContext();
  const horizontal = canonicalLayout.orientation === 'horizontal';

  return (
    <Stack horizontal={horizontal}>
      {canonicalLayout.panes.map((pane) => (
        <Placeholder key={pane.name} expand corner='none'>
          {pane.name} {pane.sheet && '(sheet)'}
        </Placeholder>
      ))}
    </Stack>
  );
};

const NavigationDrawerContent: React.FC = () =>
  createSequence(10).map((i) => (
    <Text key={i} gutterBottom>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a ullamcorper
      nisl. In ut diam sapien. Proin orci mauris, pretium ac ante ut, porta
      fermentum ipsum. Proin at lobortis turpis, a rhoncus massa.
    </Text>
  ));

const NavigationRailContent: React.FC = () => (
  <>
    <NavigationRailDestination
      icon={<FontAwesomeIcon icon={faSquare} />}
      activeIcon={<FontAwesomeIcon icon={faSquareSolid} />}
      label='First'
    />
    <NavigationRailDestination
      icon={<FontAwesomeIcon icon={faCircle} />}
      activeIcon={<FontAwesomeIcon icon={faCircleSolid} />}
      label='Second'
    />
    <NavigationRailDestination
      icon={<FontAwesomeIcon icon={faHeart} />}
      activeIcon={<FontAwesomeIcon icon={faHeartSolid} />}
      label='Third'
    />

    <NavigationRailDestination
      icon={<FontAwesomeIcon icon={faSquare} />}
      activeIcon={<FontAwesomeIcon icon={faSquareSolid} />}
      label='First'
    />
    <NavigationRailDestination
      icon={<FontAwesomeIcon icon={faCircle} />}
      activeIcon={<FontAwesomeIcon icon={faCircleSolid} />}
      label='Second'
    />
    <NavigationRailDestination
      icon={<FontAwesomeIcon icon={faHeart} />}
      activeIcon={<FontAwesomeIcon icon={faHeartSolid} />}
      label='Third'
    />
  </>
);

const AsideContent: React.FC = () =>
  createSequence(10).map((i) => (
    <Text key={i} gutterBottom>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a ullamcorper
      nisl. In ut diam sapien. Proin orci mauris, pretium ac ante ut, porta
      fermentum ipsum. Proin at lobortis turpis, a rhoncus massa.
    </Text>
  ));

const FooterContent: React.FC = () =>
  createSequence(2).map((i) => (
    <Text key={i} gutterBottom>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a ullamcorper
      nisl. In ut diam sapien. Proin orci mauris, pretium ac ante ut, porta
      fermentum ipsum. Proin at lobortis turpis, a rhoncus massa.
    </Text>
  ));

const AppLayoutFrameA: React.FC<IAppLayoutProps> = (props) => {
  // const [asideOpened, asideCallbacks] = useDisclosure(true);
  // const aside = useSideSheet({
  //   opened: asideOpened,
  //   onOpen: asideCallbacks.open,
  //   onClose: asideCallbacks.close,
  //   standardFromWindowSizeClass: 'extraLargeAndUp',
  // });

  const frameRef = useRef<HTMLIFrameElement>(null);

  return (
    <Frame importParentStyles sx={styles.frame} ref={frameRef}>
      <AppLayout
        header={{}}
        window={frameRef?.current?.contentWindow ?? undefined}
        navigationDrawer={{
          fullHeight: false,
        }}
        navigationRail={{
          fullHeight: false,
        }}
        // aside={{
        //   sideSheet: {
        //     isModal: aside.isModal,
        //     modalOpened: aside.modalOpened,
        //     standardOpened: aside.standardOpened,
        //   },
        //   fullHeight: false,
        // }}
        preferredNavigationMode='standard'
        {...props}
      >
        {({ navigationDrawer }) => (
          <>
            <Stack>
              <AppLayout.Header>
                <HeaderContent
                  navigationDrawerOpened={navigationDrawer?.state.opened}
                  toggleNavigationDrawer={navigationDrawer?.state.toggle}
                  // asideOpened={asideOpened}
                  // toggleAside={asideCallbacks.toggle}
                />
              </AppLayout.Header>

              <Stack horizontal align='start'>
                <AppLayout.NavigationDrawer headline='App name'>
                  <NavigationDrawerContent />
                </AppLayout.NavigationDrawer>

                {/* <AppLayout.NavigationRail>
                  <NavigationRailContent />
                </AppLayout.NavigationRail> */}

                <AppLayout.Body followNavigationDrawer followAside followHeader>
                  <BodyContent />
                </AppLayout.Body>

                {/* <AppLayout.Aside
                  onClose={asideCallbacks.close}
                  variant='detached'
                  showCloseButton={aside.isModal}
                >
                  <AsideContent />
                </AppLayout.Aside> */}
              </Stack>
            </Stack>

            <AppLayout.Footer>
              <FooterContent />
            </AppLayout.Footer>
          </>
        )}
      </AppLayout>
    </Frame>
  );
};

const AppLayoutFrameB: React.FC<IAppLayoutProps> = (props) => {
  // const [asideOpened, asideCallbacks] = useDisclosure(true);
  // const aside = useSideSheet({
  //   opened: asideOpened,
  //   onOpen: asideCallbacks.open,
  //   onClose: asideCallbacks.close,
  //   standardFromWindowSizeClass: 'extraLargeAndUp',
  // });

  const frameRef = useRef<HTMLIFrameElement>(null);

  return (
    <Frame importParentStyles sx={styles.frame} ref={frameRef}>
      <AppLayout
        header={{}}
        window={frameRef?.current?.contentWindow ?? undefined}
        navigationDrawer={{
          fullHeight: true,
        }}
        navigationRail={{
          fullHeight: true,
        }}
        // aside={{
        //   sideSheet: {
        //     isModal: aside.isModal,
        //     modalOpened: aside.modalOpened,
        //     standardOpened: aside.standardOpened,
        //   },
        //   fullHeight: false,
        // }}
        {...props}
      >
        {({ navigationDrawer }) => (
          <>
            <Stack>
              <Stack horizontal align='start'>
                <AppLayout.NavigationRail>
                  <NavigationRailContent />
                </AppLayout.NavigationRail>

                <AppLayout.NavigationDrawer headline='App name' showCloseButton>
                  <NavigationDrawerContent />
                </AppLayout.NavigationDrawer>

                <AppLayout.Body followNavigationDrawer>
                  <AppLayout.Header>
                    <HeaderContent
                      navigationDrawerOpened={navigationDrawer?.state.opened}
                      toggleNavigationDrawer={navigationDrawer?.state.toggle}
                      // asideOpened={asideOpened}
                      // toggleAside={asideCallbacks.toggle}
                    />
                  </AppLayout.Header>

                  <Stack horizontal align='start'>
                    <AppLayout.Body followAside followHeader>
                      <BodyContent />
                    </AppLayout.Body>

                    {/* <AppLayout.Aside
                      onClose={asideCallbacks.close}
                      headline='Headline'
                      variant='detached'
                      showCloseButton={aside.isModal}
                    >
                      <AsideContent />
                    </AppLayout.Aside> */}
                  </Stack>
                </AppLayout.Body>
              </Stack>
            </Stack>

            <AppLayout.Footer>
              <FooterContent />
            </AppLayout.Footer>
          </>
        )}
      </AppLayout>
      ;
    </Frame>
  );
};

export const TypeA: IStory = {
  render: (props) => <AppLayoutFrameA {...props} />,
  args: defaultArgs,
};

export const TypeB: IStory = {
  render: (props) => <AppLayoutFrameB {...props} />,
  args: defaultArgs,
};

export default meta;
