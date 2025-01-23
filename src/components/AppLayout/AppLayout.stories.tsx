import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import type { IAppLayoutProps } from './AppLayout.types';
import { px } from '~/helpers/styles/px';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { themeTokens } from '../ThemeProvider';
import { AppLayout } from './AppLayout';
import { CanonicalLayout } from './AppLayout.stories/CanonicalLayout';
import { Footer } from './AppLayout.stories/Footer';
import { Header } from './AppLayout.stories/Header';
import { MainNavigationDrawer } from './AppLayout.stories/MainNavigationDrawer';
import { MainNavigationRail } from './AppLayout.stories/MainNavigationRail';

const meta = {
  component: AppLayout,
} satisfies Meta<typeof AppLayout>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'AppLayout',
} satisfies Partial<IAppLayoutProps>;

const AppLayoutFrameA: React.FC<IAppLayoutProps> = (props) => {
  const [activeDestination, setActiveDestination] = useState<
    ICanonicalLayoutType | undefined
  >('supportingPane');

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
            <Header divider />

            <Flex direction="row" align="start">
              <MainNavigationRail
                activeDestination={activeDestination}
                onClick={setActiveDestination}
                divider
              />

              <MainNavigationDrawer
                activeDestination={activeDestination}
                onClick={setActiveDestination}
                divider
              />

              <CanonicalLayout type={activeDestination} />
            </Flex>
          </Flex>

          <Footer divider />
        </AppLayout>
      )}
    </Frame>
  );
};

const AppLayoutFrameB: React.FC<IAppLayoutProps> = (props) => {
  const [activeDestination, setActiveDestination] = useState<
    ICanonicalLayoutType | undefined
  >('supportingPane');

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
              <MainNavigationRail
                activeDestination={activeDestination}
                onClick={setActiveDestination}
                divider
                fullHeight
              />

              <MainNavigationDrawer
                activeDestination={activeDestination}
                onClick={setActiveDestination}
                divider
                headline="App Name"
                showCloseButton
                fullHeight
              />

              <Flex direction="column" align="stretch" grow={1}>
                <Header divider />

                <Flex direction="row" align="start">
                  <CanonicalLayout type={activeDestination} />
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          <Footer divider />
        </AppLayout>
      )}
    </Frame>
  );
};

export const LayoutA: IStory = {
  render: (props) => <AppLayoutFrameA {...props} />,
  args: {
    ...defaultArgs,
    components: ['header', 'navigationRail', 'navigationDrawer', 'sideSheet'],
  },
};

export const LayoutB: IStory = {
  render: (props) => <AppLayoutFrameB {...props} />,
  args: {
    ...defaultArgs,
    components: ['header', 'navigationRail', 'navigationDrawer', 'sideSheet'],
  },
};

export default meta;
