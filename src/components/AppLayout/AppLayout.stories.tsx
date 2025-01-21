import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  faCircle,
  faFolder,
  faHeart,
  faSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBars as fasBars,
  faCircle as fasCircle,
  faHeart as fasHeart,
  faSquare as fasSquare,
  faXmark as fasXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createSequence } from '@olivierpascal/helpers';

import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import type { IAppLayoutProps } from './AppLayout.types';
import { px } from '~/helpers/styles/px';
import { useCanonicalLayout } from '~/hooks/useCanonicalLayout';
import { Box } from '../Box';
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
    <Flex direction="row" grow={1}>
      <AppLayout.Body orientation={canonicalLayout.orientation} pt="$6" pb="$6">
        {canonicalLayout.panes.map((pane) => (
          <Box
            key={pane.name}
            grow={canonicalLayout.orientation === 'horizontal' ? 1 : 0}
          >
            {['list', 'listDetail'].includes(pane.name) && (
              <Flex direction="column" rowGap="$2">
                {createSequence(4).map((index) => (
                  <Placeholder
                    key={index}
                    label={pane.name}
                    shape="$sm"
                    h="$24"
                    diagonals
                  />
                ))}
              </Flex>
            )}

            {pane.name === 'detail' && (
              <Placeholder label={pane.name} shape="$sm" h="$128" diagonals />
            )}

            {pane.name === 'focus' && (
              <Placeholder label={pane.name} shape="$sm" h="$64" diagonals />
            )}

            {pane.name === 'supporting' && (
              <Flex direction="row" gap="$2">
                <Placeholder
                  label={pane.name}
                  shape="$sm"
                  w="$32"
                  h="$32"
                  diagonals
                />
                <Placeholder
                  label={pane.name}
                  shape="$sm"
                  w="$32"
                  h="$32"
                  diagonals
                />
              </Flex>
            )}
          </Box>
        ))}
      </AppLayout.Body>

      <AppLayout.SideSheet side="right">
        <AppLayout.Aside divider>
          <AsideContent />
        </AppLayout.Aside>
      </AppLayout.SideSheet>
    </Flex>
  );
};

type INavigationDrawerContentDemoProps = {
  activeDestination?: string;
  onClick?: (menu: string) => void;
};

const NavigationDrawerContentDemo: React.FC<
  INavigationDrawerContentDemoProps
> = (props) => {
  const { activeDestination, onClick } = props;

  return (
    <Flex direction="column" gap="$6">
      <AppLayout.NavigationDrawer.Section
        headline="Canonical layouts"
        endDivider
      >
        <AppLayout.NavigationDrawer.Section.Destination
          onClick={() => onClick?.('listDetail')}
          active={activeDestination === 'listDetail'}
          leadingIcon={<FontAwesomeIcon icon={faSquare} />}
          activeLeadingIcon={<FontAwesomeIcon icon={fasSquare} />}
        >
          List-detail
        </AppLayout.NavigationDrawer.Section.Destination>
        <AppLayout.NavigationDrawer.Section.Destination
          onClick={() => onClick?.('supportingPane')}
          active={activeDestination === 'supportingPane'}
          leadingIcon={<FontAwesomeIcon icon={faCircle} />}
          activeLeadingIcon={<FontAwesomeIcon icon={fasCircle} />}
        >
          Supporting pane
        </AppLayout.NavigationDrawer.Section.Destination>
        <AppLayout.NavigationDrawer.Section.Destination
          onClick={() => onClick?.('feed')}
          active={activeDestination === 'feed'}
          leadingIcon={<FontAwesomeIcon icon={faHeart} />}
          activeLeadingIcon={<FontAwesomeIcon icon={fasHeart} />}
        >
          Feed
        </AppLayout.NavigationDrawer.Section.Destination>
      </AppLayout.NavigationDrawer.Section>

      <NavigationDrawerSection headline="Labels">
        <AppLayout.NavigationDrawer.Section.Destination
          onClick={() => {}}
          leadingIcon={<FontAwesomeIcon icon={faFolder} />}
          disabled
        >
          Label A
        </AppLayout.NavigationDrawer.Section.Destination>
        <AppLayout.NavigationDrawer.Section.Destination
          onClick={() => {}}
          leadingIcon={<FontAwesomeIcon icon={faFolder} />}
          disabled
        >
          Label B
        </AppLayout.NavigationDrawer.Section.Destination>
      </NavigationDrawerSection>
    </Flex>
  );
};

type INavigationRailContentDemoProps = {
  activeDestination?: string;
  onClick?: (menu: string) => void;
};

const NavigationRailContentDemo: React.FC<INavigationRailContentDemoProps> = (
  props,
) => {
  const { activeDestination, onClick } = props;

  return (
    <>
      <AppLayout.NavigationRail.Destination
        onClick={() => onClick?.('listDetail')}
        active={activeDestination === 'listDetail'}
        icon={<FontAwesomeIcon icon={faSquare} />}
        activeIcon={<FontAwesomeIcon icon={fasSquare} />}
        label="List-detail"
      />
      <AppLayout.NavigationRail.Destination
        onClick={() => onClick?.('supportingPane')}
        active={activeDestination === 'supportingPane'}
        icon={<FontAwesomeIcon icon={faCircle} />}
        activeIcon={<FontAwesomeIcon icon={fasCircle} />}
        label="Supporting pane"
      />
      <AppLayout.NavigationRail.Destination
        onClick={() => onClick?.('feed')}
        active={activeDestination === 'feed'}
        icon={<FontAwesomeIcon icon={faHeart} />}
        activeIcon={<FontAwesomeIcon icon={fasHeart} />}
        label="Feed"
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
  const [activeDestination, setActiveDestination] = useState('supportingPane');

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
                    activeDestination={activeDestination}
                    onClick={setActiveDestination}
                  />
                </AppLayout.NavigationRail>

                <AppLayout.NavigationDrawer divider>
                  <NavigationDrawerContentDemo
                    activeDestination={activeDestination}
                    onClick={setActiveDestination}
                  />
                </AppLayout.NavigationDrawer>
              </AppLayout.SideSheet>

              <BodyDemo
                canonicalLayoutType={activeDestination as ICanonicalLayoutType}
              />
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
  const [activeDestination, setActiveDestination] = useState('supportingPane');

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
                    activeDestination={activeDestination}
                    onClick={setActiveDestination}
                  />
                </AppLayout.NavigationRail>

                <AppLayout.NavigationDrawer
                  divider
                  headline="App Name"
                  showCloseButton
                  header={<Placeholder label="Header" />}
                  footer={<Placeholder label="Footer" />}
                >
                  <NavigationDrawerContentDemo
                    activeDestination={activeDestination}
                    onClick={setActiveDestination}
                  />
                </AppLayout.NavigationDrawer>
              </AppLayout.SideSheet>

              <Flex direction="column" align="stretch" grow={1}>
                <AppLayout.Header divider>
                  <HeaderContentDemo />
                </AppLayout.Header>

                <Flex direction="row" align="start">
                  <BodyDemo
                    canonicalLayoutType={
                      activeDestination as ICanonicalLayoutType
                    }
                  />
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

export const LayoutA: IStory = {
  render: (props) => <AppLayoutFrameA {...props} />,
  args: {
    ...defaultArgs,
    components: ['header', 'navigationRail', 'navigationDrawer', 'aside'],
  },
};

export const LayoutB: IStory = {
  render: (props) => <AppLayoutFrameB {...props} />,
  args: {
    ...defaultArgs,
    components: ['header', 'navigationRail', 'navigationDrawer', 'aside'],
  },
};

export default meta;
