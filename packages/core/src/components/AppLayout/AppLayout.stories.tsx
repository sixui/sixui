import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import type { IOmit } from '~/utils';
import type { IAppLayoutProps } from './AppLayout.types';
import { Checkbox } from '~/components/Checkbox';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Labeled } from '~/components/Labeled';
import { AppLayout } from './AppLayout';
import { CanonicalLayout } from './AppLayout.stories/CanonicalLayout';
import { Footer } from './AppLayout.stories/Footer';
import { Header } from './AppLayout.stories/Header';
import { MainNavigationBar } from './AppLayout.stories/MainNavigationBar';
import { MainNavigationDrawer } from './AppLayout.stories/MainNavigationDrawer';
import { MainNavigationRail } from './AppLayout.stories/MainNavigationRail';

const meta = {
  component: AppLayout,
} satisfies Meta<typeof AppLayout>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IAppLayoutProps>;

interface IAppLayoutFrameChildrenProps {
  activeDestination?: ICanonicalLayoutType;
  setActiveDestination: (destination?: ICanonicalLayoutType) => void;
  hasHeader?: boolean;
}

type IAppLayoutFrameProps = IOmit<IAppLayoutProps, 'children'> & {
  children: (props: IAppLayoutFrameChildrenProps) => React.ReactNode;
};

const AppLayoutFrame: React.FC<IAppLayoutFrameProps> = (props) => {
  const { children, ...other } = props;
  const [activeDestination, setActiveDestination] = useState<
    ICanonicalLayoutType | undefined
  >('listDetail');
  const [hasHeader, setHasHeader] = useState(true);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$6">
        <Labeled label="Header" labelPosition="right">
          <Checkbox
            checked={hasHeader}
            onChange={(value) => {
              setHasHeader(!!value);
            }}
          />
        </Labeled>
      </Flex>

      <Frame importParentStyles w="100%" h="$160">
        {({ window }) => (
          <AppLayout
            preferredNavigationMode="standard"
            window={window}
            {...other}
          >
            {children({
              activeDestination,
              setActiveDestination,
              hasHeader,
            })}
          </AppLayout>
        )}
      </Frame>
    </Flex>
  );
};

const AppLayoutFrameA: React.FC<IAppLayoutProps> = (props) => (
  <AppLayoutFrame {...props}>
    {({ activeDestination, setActiveDestination, hasHeader }) => (
      <>
        <Flex direction="column">
          {hasHeader && <Header divider />}

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
    {({ activeDestination, setActiveDestination, hasHeader }) => (
      <>
        <Flex direction="column">
          <Flex direction="row" align="start">
            <MainNavigationRail
              activeDestination={activeDestination}
              onClick={setActiveDestination}
              divider
              wide
            />

            <MainNavigationDrawer
              activeDestination={activeDestination}
              onClick={setActiveDestination}
              divider
              wide
            />

            <Flex direction="column" align="stretch" grow={1}>
              {hasHeader && <Header divider />}

              <Flex direction="row" align="start">
                <CanonicalLayout type={activeDestination} />
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Footer divider />

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
