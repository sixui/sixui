import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import type { IOmit } from '~/utils';
import type { IAppLayoutProps } from './AppLayout.types';
import { Checkbox } from '~/components/Checkbox';
import { Flex } from '~/components/Flex';
import { Labeled } from '~/components/Labeled';
import { ScreenFrame } from '~/components/ScreenFrame';
import { AppLayout } from './AppLayout';
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

interface IAppLayoutFrameChildrenProps {
  activeDestination?: ICanonicalLayoutType;
  setActiveDestination: (destination?: ICanonicalLayoutType) => void;
  hasTopBar?: boolean;
  hasNavigationRail?: boolean;
  hasNavigationDrawer?: boolean;
  hasFooter?: boolean;
  hasDividers?: boolean;
}

type IAppLayoutFrameProps = IOmit<IAppLayoutProps, 'children'> & {
  children: (props: IAppLayoutFrameChildrenProps) => React.ReactNode;
};

const AppLayoutFrame: React.FC<IAppLayoutFrameProps> = (props) => {
  const { children, ...other } = props;
  const [activeDestination, setActiveDestination] = useState<
    ICanonicalLayoutType | undefined
  >('listDetail');
  const [hasTopBar, setHasTopBar] = useState(true);
  const [hasNavigationRail, setHasNavigationRail] = useState(true);
  const [hasNavigationDrawer, setHasNavigationDrawer] = useState(true);
  const [hasFooter, setHasFooter] = useState(true);
  const [hasDividers, setHasDividers] = useState(true);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$6">
        <Labeled label="Top bar" labelPosition="right">
          <Checkbox
            checked={hasTopBar}
            onChange={(value) => {
              setHasTopBar(!!value);
            }}
          />
        </Labeled>
        <Labeled label="Navigation rail" labelPosition="right">
          <Checkbox
            checked={hasNavigationRail}
            onChange={(value) => {
              setHasNavigationRail(!!value);
            }}
          />
        </Labeled>
        <Labeled label="Navigation drawer" labelPosition="right">
          <Checkbox
            checked={hasNavigationDrawer}
            onChange={(value) => {
              setHasNavigationDrawer(!!value);
            }}
          />
        </Labeled>
        <Labeled label="Footer" labelPosition="right">
          <Checkbox
            checked={hasFooter}
            onChange={(value) => {
              setHasFooter(!!value);
            }}
          />
        </Labeled>
        <Labeled label="Dividers" labelPosition="right">
          <Checkbox
            checked={hasDividers}
            onChange={(value) => {
              setHasDividers(!!value);
            }}
          />
        </Labeled>
      </Flex>

      <ScreenFrame>
        {({ window }) => (
          <AppLayout
            preferredNavigationMode={hasNavigationDrawer ? 'standard' : 'rail'}
            window={window}
            {...other}
          >
            {children({
              activeDestination,
              setActiveDestination,
              hasTopBar,
              hasNavigationRail,
              hasNavigationDrawer,
              hasFooter,
              hasDividers,
            })}
          </AppLayout>
        )}
      </ScreenFrame>
    </Flex>
  );
};

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

            <Body type={activeDestination} />
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
                <Body type={activeDestination} />
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
