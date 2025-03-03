import { useState } from 'react';

import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import type { IOmit } from '~/utils/types';
import type { IAppLayoutProps } from '../AppLayout.types';
import { Checkbox } from '~/components/Checkbox';
import { Flex } from '~/components/Flex';
import { ScreenFrame } from '~/components/ScreenFrame';
import { AppLayout } from '../AppLayout';

interface IAppLayoutFrameChildrenRenderProps {
  activeDestination?: ICanonicalLayoutType;
  setActiveDestination: (destination?: ICanonicalLayoutType) => void;
  hasTopBar?: boolean;
  hasNavigationRail?: boolean;
  hasNavigationDrawer?: boolean;
  hasFooter?: boolean;
  hasDividers?: boolean;
}

type IAppLayoutFrameProps = IOmit<IAppLayoutProps, 'children'> & {
  children: (props: IAppLayoutFrameChildrenRenderProps) => React.ReactNode;
};

export const AppLayoutFrame: React.FC<IAppLayoutFrameProps> = (props) => {
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
    <Flex direction="column" gap="$sm">
      <Flex direction="row" gap="$xl">
        <Checkbox
          label="Top bar"
          checked={hasTopBar}
          onChange={(value) => {
            setHasTopBar(!!value);
          }}
        />
        <Checkbox
          label="Navigation rail"
          checked={hasNavigationRail}
          onChange={(value) => {
            setHasNavigationRail(!!value);
          }}
        />
        <Checkbox
          label="Navigation drawer"
          checked={hasNavigationDrawer}
          onChange={(value) => {
            setHasNavigationDrawer(!!value);
          }}
        />
        <Checkbox
          label="Footer"
          checked={hasFooter}
          onChange={(value) => {
            setHasFooter(!!value);
          }}
        />
        <Checkbox
          label="Dividers"
          checked={hasDividers}
          onChange={(value) => {
            setHasDividers(!!value);
          }}
        />
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
