import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  faCircle,
  faHeart,
  faSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faCircle as fasCircle,
  faHeart as fasHeart,
  faSquare as fasSquare,
  faXmark,
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
import { NavigationDrawerDestination } from '../NavigationDrawerDestination';
import { NavigationDrawerSection } from '../NavigationDrawerSection';
import { NavigationRailDestination } from '../NavigationRailDestination';
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
      <Flex direction="row" gap="$2">
        {appLayoutContext.navigationDrawer?.state?.toggle ? (
          <IconButton
            icon={
              <FontAwesomeIcon
                icon={
                  appLayoutContext.navigationDrawer?.state?.opened
                    ? faXmark
                    : faBars
                }
              />
            }
            onClick={appLayoutContext.navigationDrawer?.state?.toggle}
          />
        ) : null}
        <div>Header</div>
      </Flex>

      <Flex direction="row" gap="$2">
        {appLayoutContext.aside?.state?.toggle ? (
          <IconButton
            icon={
              <FontAwesomeIcon
                icon={appLayoutContext.aside?.state?.opened ? faXmark : faBars}
              />
            }
            onClick={appLayoutContext.aside?.state?.toggle}
          />
        ) : null}
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
  const horizontal = canonicalLayout.orientation === 'horizontal';

  return <div>BODY</div>;
  // <AppLayout.Body horizontal={horizontal}>
  //   {canonicalLayout.panes.map((pane) => (
  //     <Placeholder
  //       key={pane.name}
  //       corner="none"
  //       height={200}
  //       width={pane.fixedWidth}
  //       sx={[!pane.fixedWidth && styles.placeholder$grow]}
  //       grow={1}
  //     >
  //       {pane.name} {pane.sheet && '(sheet)'}
  //       {pane.fixedWidth ? `(${pane.fixedWidth}px)` : null}
  //     </Placeholder>
  //   ))}

  //   <AppLayout.SideSheet anchor="right">
  //     <AppLayout.Aside divider>
  //       <AsideContent />
  //     </AppLayout.Aside>
  //   </AppLayout.SideSheet>
  // </AppLayout.Body>
};

const NavigationDrawerContentDemo: React.FC = () => (
  <Flex direction="column" gap="$6">
    <NavigationDrawerSection headline="Mail" endDivider>
      <NavigationDrawerDestination
        onClick={() => {}}
        active
        badgeLabel="24"
        leadingIcon="xx"
      >
        XX
      </NavigationDrawerDestination>
      <NavigationDrawerDestination onClick={() => {}}>
        YY
      </NavigationDrawerDestination>
    </NavigationDrawerSection>

    <NavigationDrawerSection headline="Labels">
      <NavigationDrawerDestination onClick={() => {}} badgeLabel="24">
        XX
      </NavigationDrawerDestination>
      <NavigationDrawerDestination onClick={() => {}}>
        YY
      </NavigationDrawerDestination>
    </NavigationDrawerSection>
  </Flex>
);

type INavigationRailContentProps = {
  canonicalLayoutType: ICanonicalLayoutType;
  setCanonicalLayoutType: (type: ICanonicalLayoutType) => void;
};

const NavigationRailContentDemo: React.FC<INavigationRailContentProps> = (
  props,
) => {
  const { canonicalLayoutType, setCanonicalLayoutType } = props;

  return (
    <>
      <NavigationRailDestination
        icon={<FontAwesomeIcon icon={faSquare} />}
        activeIcon={<FontAwesomeIcon icon={fasSquare} />}
        label="List-detail"
        onClick={() => setCanonicalLayoutType('listDetail')}
        active={canonicalLayoutType === 'listDetail'}
      />
      <NavigationRailDestination
        icon={<FontAwesomeIcon icon={faCircle} />}
        activeIcon={<FontAwesomeIcon icon={fasCircle} />}
        label="Supporting pane"
        onClick={() => setCanonicalLayoutType('supportingPane')}
        active={canonicalLayoutType === 'supportingPane'}
      />
      <NavigationRailDestination
        icon={<FontAwesomeIcon icon={faHeart} />}
        activeIcon={<FontAwesomeIcon icon={fasHeart} />}
        label="Feed"
        onClick={() => setCanonicalLayoutType('feed')}
        active={canonicalLayoutType === 'feed'}
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
            {/* <AppLayout.Header divider>
              <HeaderContentDemo />
            </AppLayout.Header> */}
            <div>HEADER</div>

            <Flex direction="row" align="start">
              <div>SIDESHEET</div>
              {/* <AppLayout.SideSheet>
                <AppLayout.NavigationRail divider>
                  <NavigationRailContentDemo
                    canonicalLayoutType={canonicalLayoutType}
                    setCanonicalLayoutType={setCanonicalLayoutType}
                  />
                </AppLayout.NavigationRail>

                <AppLayout.NavigationDrawer divider>
                  <NavigationDrawerContentDemo />
                </AppLayout.NavigationDrawer>
              </AppLayout.SideSheet> */}

              <BodyDemo canonicalLayoutType={canonicalLayoutType} />
            </Flex>
          </Flex>

          {/* <AppLayout.Footer divider>
            <FooterContent />
          </AppLayout.Footer> */}
          <div>FOOTER</div>
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
              {/* <AppLayout.SideSheet fullHeight>
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
                  header={<Placeholder label="Header" corner="none" />}
                  footer={<Placeholder label="Footer" corner="none" />}
                >
                  <NavigationDrawerContentDemo />
                </AppLayout.NavigationDrawer>
              </AppLayout.SideSheet> */}
              <div>SIDESHEET</div>

              <Flex direction="column" align="stretch" grow={1}>
                {/* <AppLayout.Header divider>
                  <HeaderContentDemo />
                </AppLayout.Header> */}
                <div>HEADER</div>

                <Flex direction="row" align="start">
                  <BodyDemo canonicalLayoutType={canonicalLayoutType} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          {/* <AppLayout.Footer divider>
            <FooterContent />
          </AppLayout.Footer> */}
          <div>FOOTER</div>
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
