import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
import {
  useCanonicalLayout,
  type ICanonicalLayoutType,
} from '~/hooks/useCanonicalLayout';
import { Frame } from '../Frame';
import { Text } from '../Text';
import { Stack } from '../Stack';
import { IconButton } from '../IconButton';
import { Placeholder } from '../Placeholder';
import { NavigationRailDestination } from '../NavigationRailDestination';
import { NavigationDrawerContent } from '../NavigationDrawerContent';
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
    height: `calc(600px * ${scaleTokens.scale})`,
    borderWidth: outlineTokens.width$xs,
    borderColor: colorSchemeTokens.outlineVariant,
    borderStyle: 'dashed',
  },
  placeholder$grow: {
    flexGrow: 1,
  },
});

const HeaderContentDemo: React.FC = () => {
  const appLayoutContext = useAppLayoutContext();

  return (
    <Stack horizontal gap={6} justify='space-between' grow>
      <Stack horizontal gap={2}>
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
      </Stack>

      <Stack horizontal gap={2}>
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
      </Stack>
    </Stack>
  );
};

type IBodyDemoProps = {
  canonicalLayoutType: ICanonicalLayoutType;
};

const BodyDemo: React.FC<IBodyDemoProps> = (props) => {
  const { canonicalLayoutType } = props;
  const canonicalLayout = useCanonicalLayout(canonicalLayoutType);
  const horizontal = canonicalLayout.orientation === 'horizontal';

  return (
    <AppLayout.Body horizontal={horizontal}>
      {canonicalLayout.panes.map((pane) => (
        <Placeholder
          key={pane.name}
          corner='none'
          height={200}
          width={pane.fixedWidth}
          sx={[!pane.fixedWidth && styles.placeholder$grow]}
        >
          {pane.name} {pane.sheet && '(sheet)'}
          {pane.fixedWidth ? `(${pane.fixedWidth}px)` : null}
        </Placeholder>
      ))}

      <AppLayout.SideSheet anchor='right'>
        <AppLayout.Aside divider>
          <AsideContent />
        </AppLayout.Aside>
      </AppLayout.SideSheet>
    </AppLayout.Body>
  );
};

const NavigationDrawerContentDemo: React.FC = () => (
  <Stack gap={6}>
    <NavigationDrawerContent.DestinationList headline='Mail' endDivider>
      <NavigationDrawerContent.Destination
        onClick={() => {}}
        active
        trailingSupportingText='24'
      >
        XX
      </NavigationDrawerContent.Destination>
      <NavigationDrawerContent.Destination onClick={() => {}}>
        YY
      </NavigationDrawerContent.Destination>
    </NavigationDrawerContent.DestinationList>

    <NavigationDrawerContent.DestinationList headline='Labels'>
      <NavigationDrawerContent.Destination
        onClick={() => {}}
        trailingSupportingText='24'
      >
        XX
      </NavigationDrawerContent.Destination>
      <NavigationDrawerContent.Destination onClick={() => {}}>
        YY
      </NavigationDrawerContent.Destination>
    </NavigationDrawerContent.DestinationList>
  </Stack>
);

type INavigationRailContentProps = {
  canonicalLayoutType: ICanonicalLayoutType;
  setCanonicalLayoutType: (type: ICanonicalLayoutType) => void;
};

const NavigationRailContent: React.FC<INavigationRailContentProps> = (
  props,
) => {
  const { canonicalLayoutType, setCanonicalLayoutType } = props;

  return (
    <>
      <NavigationRailDestination
        icon={<FontAwesomeIcon icon={faSquare} />}
        activeIcon={<FontAwesomeIcon icon={faSquareSolid} />}
        label='List-detail'
        onClick={() => setCanonicalLayoutType('listDetail')}
        active={canonicalLayoutType === 'listDetail'}
      />
      <NavigationRailDestination
        icon={<FontAwesomeIcon icon={faCircle} />}
        activeIcon={<FontAwesomeIcon icon={faCircleSolid} />}
        label='Supporting pane'
        onClick={() => setCanonicalLayoutType('supportingPane')}
        active={canonicalLayoutType === 'supportingPane'}
      />
      <NavigationRailDestination
        icon={<FontAwesomeIcon icon={faHeart} />}
        activeIcon={<FontAwesomeIcon icon={faHeartSolid} />}
        label='Feed'
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
    <Frame importParentStyles sx={styles.frame}>
      {({ window }) => (
        <AppLayout
          preferredNavigationMode='standard'
          window={window}
          {...props}
        >
          <Stack>
            <AppLayout.Header divider>
              <HeaderContentDemo />
            </AppLayout.Header>

            <Stack horizontal align='start'>
              <AppLayout.SideSheet>
                <AppLayout.NavigationRail divider>
                  <NavigationRailContent
                    canonicalLayoutType={canonicalLayoutType}
                    setCanonicalLayoutType={setCanonicalLayoutType}
                  />
                </AppLayout.NavigationRail>

                <AppLayout.NavigationDrawer divider>
                  <NavigationDrawerContentDemo />
                </AppLayout.NavigationDrawer>
              </AppLayout.SideSheet>

              <BodyDemo canonicalLayoutType={canonicalLayoutType} />
            </Stack>
          </Stack>

          <AppLayout.Footer>
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
    <Frame importParentStyles sx={styles.frame}>
      {({ window }) => (
        <AppLayout window={window} {...props}>
          <Stack>
            <Stack horizontal align='start'>
              <AppLayout.SideSheet fullHeight>
                <AppLayout.NavigationRail divider>
                  <NavigationRailContent
                    canonicalLayoutType={canonicalLayoutType}
                    setCanonicalLayoutType={setCanonicalLayoutType}
                  />
                </AppLayout.NavigationRail>

                <AppLayout.NavigationDrawer
                  divider
                  headline='App Name'
                  showCloseButton
                  header={<Placeholder label='Header' corner='none' />}
                  footer={<Placeholder label='Footer' corner='none' />}
                >
                  <NavigationDrawerContentDemo />
                </AppLayout.NavigationDrawer>
              </AppLayout.SideSheet>

              <Stack align='stretch' grow>
                <AppLayout.Header divider>
                  <HeaderContentDemo />
                </AppLayout.Header>

                <Stack horizontal align='start'>
                  <BodyDemo canonicalLayoutType={canonicalLayoutType} />
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          <AppLayout.Footer>
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
