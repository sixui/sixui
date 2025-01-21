import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  faFolder,
  faHeart,
  faPaperPlane,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBars as fasBars,
  faInbox as fasInbox,
  faTrash as fasTrash,
  faXmark as fasXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSequence } from '@olivierpascal/helpers';

import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import type { IAppLayoutProps } from './AppLayout.types';
import { px } from '~/helpers/styles/px';
import { useCanonicalLayout } from '~/hooks/useCanonicalLayout';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { IconButton } from '../IconButton';
import { NavigationDrawerSection } from '../NavigationDrawerSection';
import { Placeholder } from '../Placeholder';
import { Text } from '../Text';
import { themeTokens } from '../ThemeProvider';
import { AppLayout } from './AppLayout';
import { useAppLayoutContext } from './AppLayout.context';

const meta = {
  component: AppLayout,
} satisfies Meta<typeof AppLayout>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'AppLayout',
} satisfies Partial<IAppLayoutProps>;

const HeaderContentDemo: React.FC = () => {
  const appLayoutContext = useAppLayoutContext();

  return (
    <Flex direction="row" gap="$6" justify="space-between" grow={1}>
      <Flex direction="row" gap="$2" align="center">
        {appLayoutContext?.navigationDrawer?.state?.toggle && (
          <IconButton
            icon={
              <FontAwesomeIcon
                icon={
                  appLayoutContext.navigationDrawer?.state?.opened
                    ? fasXmark
                    : fasBars
                }
              />
            }
            onClick={appLayoutContext.navigationDrawer?.state?.toggle}
          />
        )}
        <div>Header</div>
      </Flex>

      <Flex direction="row" gap="$2">
        {appLayoutContext?.aside?.state?.toggle && (
          <IconButton
            icon={
              <FontAwesomeIcon
                icon={
                  appLayoutContext.aside?.state?.opened ? fasXmark : fasBars
                }
              />
            }
            onClick={appLayoutContext.aside?.state?.toggle}
          />
        )}
      </Flex>
    </Flex>
  );
};

type IBodyDemoProps = {
  canonicalLayoutType: ICanonicalLayoutType;
};

const BodyDemo: React.FC<IBodyDemoProps> = (props) => {
  const { canonicalLayoutType } = props;
  const canonicalLayout = useCanonicalLayout(canonicalLayoutType);

  return (
    <AppLayout.Body orientation={canonicalLayout.orientation}>
      {canonicalLayout.panes.map((pane) => (
        <Placeholder
          key={pane.name}
          h="$48"
          w={pane.fixedWidth}
          grow={!pane.fixedWidth ? 1 : 0}
        >
          {pane.name} {pane.sheet && '(sheet)'}
          {pane.fixedWidth && `(${pane.fixedWidth}px)`}
        </Placeholder>
      ))}

      <AppLayout.SideSheet side="right">
        <AppLayout.Aside divider>
          <AsideContent />
        </AppLayout.Aside>
      </AppLayout.SideSheet>
    </AppLayout.Body>
  );
};

const NavigationDrawerContentDemo: React.FC = () => {
  const [activeDestination, setActiveDestination] = useState('inbox');

  return (
    <Flex direction="column" gap="$6">
      <AppLayout.NavigationDrawer.Section headline="Mail" endDivider>
        <AppLayout.NavigationDrawer.Section.Destination
          onClick={() => setActiveDestination('inbox')}
          active={activeDestination === 'inbox'}
          leadingIcon={<FontAwesomeIcon icon={fasInbox} />}
          badgeLabel="24"
        >
          Inbox
        </AppLayout.NavigationDrawer.Section.Destination>
        <AppLayout.NavigationDrawer.Section.Destination
          onClick={() => setActiveDestination('outbox')}
          active={activeDestination === 'outbox'}
          leadingIcon={<FontAwesomeIcon icon={faPaperPlane} />}
        >
          Outbox
        </AppLayout.NavigationDrawer.Section.Destination>
        <AppLayout.NavigationDrawer.Section.Destination
          onClick={() => setActiveDestination('favorites')}
          active={activeDestination === 'favorites'}
          leadingIcon={<FontAwesomeIcon icon={faHeart} />}
          disabled
        >
          Favorites
        </AppLayout.NavigationDrawer.Section.Destination>
        <AppLayout.NavigationDrawer.Section.Destination
          onClick={() => setActiveDestination('trash')}
          active={activeDestination === 'trash'}
          leadingIcon={<FontAwesomeIcon icon={fasTrash} />}
        >
          Trash
        </AppLayout.NavigationDrawer.Section.Destination>
      </AppLayout.NavigationDrawer.Section>

      <NavigationDrawerSection headline="Labels">
        <AppLayout.NavigationDrawer.Section.Destination
          onClick={() => setActiveDestination('labelA')}
          active={activeDestination === 'labelA'}
          leadingIcon={<FontAwesomeIcon icon={faFolder} />}
        >
          Label A
        </AppLayout.NavigationDrawer.Section.Destination>
        <AppLayout.NavigationDrawer.Section.Destination
          onClick={() => setActiveDestination('labelB')}
          active={activeDestination === 'labelB'}
          leadingIcon={<FontAwesomeIcon icon={faFolder} />}
        >
          Label B
        </AppLayout.NavigationDrawer.Section.Destination>
      </NavigationDrawerSection>
    </Flex>
  );
};

type INavigationRailContentProps = {
  canonicalLayoutType: ICanonicalLayoutType;
  setCanonicalLayoutType: (type: ICanonicalLayoutType) => void;
};

const NavigationRailContentDemo: React.FC<INavigationRailContentProps> = (
  props,
) => {
  const { ...other } = props;
  const [activeDestination, setActiveDestination] = useState('inbox');

  return (
    <>
      <AppLayout.NavigationRail.Destination
        onClick={() => setActiveDestination('inbox')}
        active={activeDestination === 'inbox'}
        icon={<FontAwesomeIcon icon={fasInbox} />}
        label="Inbox"
        {...other}
      />
      <AppLayout.NavigationRail.Destination
        onClick={() => setActiveDestination('outbox')}
        active={activeDestination === 'outbox'}
        icon={<FontAwesomeIcon icon={faPaperPlane} />}
        label="Outbox"
        {...other}
      />
      <AppLayout.NavigationRail.Destination
        onClick={() => setActiveDestination('favorites')}
        active={activeDestination === 'favorites'}
        icon={<FontAwesomeIcon icon={faHeart} />}
        label="Favorites"
        {...other}
      />
      <AppLayout.NavigationRail.Destination
        onClick={() => setActiveDestination('trash')}
        active={activeDestination === 'trash'}
        icon={<FontAwesomeIcon icon={fasTrash} />}
        label="Trash"
        {...other}
      />
    </>
  );
};

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
  const [canonicalLayoutType, setCanonicalLayoutType] =
    useState<ICanonicalLayoutType>('listDetail');

  return (
    <Frame
      importParentStyles
      w="100%"
      h="$160"
      style={{
        borderWidth: px(themeTokens.outline.width.xs),
        borderColor: themeTokens.colorScheme.outlineVariant,
        borderStyle: 'dashed',
      }}
    >
      {({ window }) => (
        <AppLayout
          preferredNavigationMode="standard"
          window={window}
          {...props}
        >
          <Flex direction="column">
            <AppLayout.Header divider>
              <HeaderContentDemo />
            </AppLayout.Header>

            <Flex direction="row" align="start">
              <AppLayout.SideSheet>
                <AppLayout.NavigationRail divider>
                  <NavigationRailContentDemo
                    canonicalLayoutType={canonicalLayoutType}
                    setCanonicalLayoutType={setCanonicalLayoutType}
                  />
                </AppLayout.NavigationRail>

                <AppLayout.NavigationDrawer divider>
                  <NavigationDrawerContentDemo />
                </AppLayout.NavigationDrawer>
              </AppLayout.SideSheet>

              <BodyDemo canonicalLayoutType={canonicalLayoutType} />
            </Flex>
          </Flex>

          <AppLayout.Footer divider>
            <FooterContent />
          </AppLayout.Footer>
        </AppLayout>
      )}
    </Frame>
  );
};

const AppLayoutFrameB: React.FC<IAppLayoutProps> = (props) => {
  const [canonicalLayoutType, setCanonicalLayoutType] =
    useState<ICanonicalLayoutType>('listDetail');

  return (
    <Frame
      importParentStyles
      w="100%"
      h="$160"
      style={{
        borderWidth: px(themeTokens.outline.width.xs),
        borderColor: themeTokens.colorScheme.outlineVariant,
        borderStyle: 'dashed',
      }}
    >
      {({ window }) => (
        <AppLayout window={window} {...props}>
          <Flex direction="column">
            <Flex direction="row" align="start">
              <AppLayout.SideSheet fullHeight>
                <AppLayout.NavigationRail divider>
                  <NavigationRailContentDemo
                    canonicalLayoutType={canonicalLayoutType}
                    setCanonicalLayoutType={setCanonicalLayoutType}
                  />
                </AppLayout.NavigationRail>

                <AppLayout.NavigationDrawer
                  divider
                  headline="App Name"
                  showCloseButton
                  header={<Placeholder label="Header" />}
                  footer={<Placeholder label="Footer" />}
                >
                  <NavigationDrawerContentDemo />
                </AppLayout.NavigationDrawer>
              </AppLayout.SideSheet>

              <Flex direction="column" align="stretch" grow={1}>
                <AppLayout.Header divider>
                  <HeaderContentDemo />
                </AppLayout.Header>

                <Flex direction="row" align="start">
                  <BodyDemo canonicalLayoutType={canonicalLayoutType} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <AppLayout.Footer divider>
            <FooterContent />
          </AppLayout.Footer>
        </AppLayout>
      )}
    </Frame>
  );
};

export const TypeA: IStory = {
  render: (props) => <AppLayoutFrameA {...props} />,
  args: {
    ...defaultArgs,
    components: ['header', 'navigationRail', 'navigationDrawer', 'aside'],
  },
};

export const TypeB: IStory = {
  render: (props) => <AppLayoutFrameB {...props} />,
  args: {
    ...defaultArgs,
    components: ['header', 'navigationRail', 'navigationDrawer', 'aside'],
  },
};

export default meta;
