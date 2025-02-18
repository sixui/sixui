import type { Meta, StoryObj } from '@storybook/react';

import type { IAppLayoutProps } from './AppLayout.types';
import { Flex } from '~/components/Flex';
import { AppLayout } from './AppLayout';
import { AppLayoutFrame } from './AppLayout.stories/AppLayoutFrame';
import { Body } from './AppLayout.stories/Body';
import { Footer } from './AppLayout.stories/Footer';
import { MainNavigationBar } from './AppLayout.stories/MainNavigationBar';
import { MainNavigationDrawer } from './AppLayout.stories/MainNavigationDrawer';
import { MainNavigationRail } from './AppLayout.stories/MainNavigationRail';
import { TopBar } from './AppLayout.stories/TopBar';

const meta = {
  component: AppLayout,
} satisfies Meta<typeof AppLayout>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IAppLayoutProps>;

const AppLayoutFrameA: React.FC<IAppLayoutProps> = (props) => (
  <AppLayoutFrame {...props}>
    {({
      activeDestination,
      setActiveDestination,
      hasTopBar,
      hasNavigationRail,
      hasNavigationDrawer,
      hasFooter,
      hasDividers,
    }) => (
      <>
        <Flex direction="column">
          {hasTopBar && <TopBar divider={hasDividers} wide />}

          <Flex direction="row" align="start">
            {hasNavigationRail && (
              <MainNavigationRail
                activeDestination={activeDestination}
                onClick={setActiveDestination}
                divider={hasDividers}
              />
            )}

            {hasNavigationDrawer && (
              <MainNavigationDrawer
                activeDestination={activeDestination}
                onClick={setActiveDestination}
                divider={hasDividers}
              />
            )}

            <Body type={activeDestination} detached={!hasDividers} />
          </Flex>
        </Flex>

        {hasFooter && <Footer divider={hasDividers} />}

        <MainNavigationBar
          activeDestination={activeDestination}
          onClick={setActiveDestination}
        />
      </>
    )}
  </AppLayoutFrame>
);

const AppLayoutFrameB: React.FC<IAppLayoutProps> = (props) => (
  <AppLayoutFrame {...props}>
    {({
      activeDestination,
      setActiveDestination,
      hasTopBar,
      hasNavigationRail,
      hasNavigationDrawer,
      hasFooter,
      hasDividers,
    }) => (
      <>
        <Flex direction="column">
          <Flex direction="row" align="start">
            {hasNavigationRail && (
              <MainNavigationRail
                activeDestination={activeDestination}
                onClick={setActiveDestination}
                divider={hasDividers}
                wide
              />
            )}

            {hasNavigationDrawer && (
              <MainNavigationDrawer
                activeDestination={activeDestination}
                onClick={setActiveDestination}
                divider={hasDividers}
                wide
              />
            )}

            <Flex direction="column" align="stretch" grow={1}>
              {hasTopBar && <TopBar divider={hasDividers} />}

              <Flex direction="row" align="start">
                <Body type={activeDestination} detached={!hasDividers} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {hasFooter && <Footer divider={hasDividers} />}

        <MainNavigationBar
          activeDestination={activeDestination}
          onClick={setActiveDestination}
        />
      </>
    )}
  </AppLayoutFrame>
);

export const LayoutA: IStory = {
  render: (props) => <AppLayoutFrameA {...props} />,
  args: defaultArgs,
};

export const LayoutB: IStory = {
  render: (props) => <AppLayoutFrameB {...props} />,
  args: defaultArgs,
};

export default meta;
