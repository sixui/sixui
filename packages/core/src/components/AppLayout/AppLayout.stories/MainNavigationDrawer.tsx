import {
  faCircle,
  faFolder,
  faHeart,
  faQuestionCircle,
  faSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCircle as fasCircle,
  faHeart as fasHeart,
  faQuestionCircle as fasQuestionCircle,
  faSquare as fasSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { ISideSheetProps } from '~/components/SideSheet';
import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import { AppLayout } from '~/components/AppLayout';
import { Flex } from '~/components/Flex';
import { useAppLayoutContext } from '../AppLayout.context';

export interface IMainNavigationDrawerProps extends ISideSheetProps {
  activeDestination?: ICanonicalLayoutType;
  onClick?: (destination?: ICanonicalLayoutType) => void;
}

export const MainNavigationDrawer: React.FC<IMainNavigationDrawerProps> = (
  props,
) => {
  const { activeDestination, onClick, ...other } = props;

  const appLayoutContext = useAppLayoutContext();

  const changeRoute = (destination?: ICanonicalLayoutType): void => {
    onClick?.(destination);
    if (appLayoutContext?.navigationDrawer?.state.isDrawer) {
      appLayoutContext.navigationDrawer.state.close();
    }
  };

  return (
    <AppLayout.NavigationDrawer showCloseButton={other.wide} {...other}>
      <Flex direction="column" gap="$xl">
        <AppLayout.NavigationDrawer.Section
          headline="Canonical layouts"
          endDivider
        >
          <AppLayout.NavigationDrawer.Destination
            onClick={() => {
              changeRoute('listDetail');
            }}
            active={activeDestination === 'listDetail'}
            leadingIcon={<FontAwesomeIcon icon={faSquare} />}
            activeLeadingIcon={<FontAwesomeIcon icon={fasSquare} />}
          >
            List-detail
          </AppLayout.NavigationDrawer.Destination>
          <AppLayout.NavigationDrawer.Destination
            onClick={() => {
              changeRoute('supportingPane');
            }}
            active={activeDestination === 'supportingPane'}
            leadingIcon={<FontAwesomeIcon icon={faCircle} />}
            activeLeadingIcon={<FontAwesomeIcon icon={fasCircle} />}
          >
            Supporting pane
          </AppLayout.NavigationDrawer.Destination>
          <AppLayout.NavigationDrawer.Destination
            onClick={() => {
              changeRoute('feed');
            }}
            active={activeDestination === 'feed'}
            leadingIcon={<FontAwesomeIcon icon={faHeart} />}
            activeLeadingIcon={<FontAwesomeIcon icon={fasHeart} />}
          >
            Feed
          </AppLayout.NavigationDrawer.Destination>
          <AppLayout.NavigationDrawer.Destination
            onClick={() => {
              changeRoute(undefined);
            }}
            active={activeDestination === undefined}
            leadingIcon={<FontAwesomeIcon icon={faQuestionCircle} />}
            activeLeadingIcon={<FontAwesomeIcon icon={fasQuestionCircle} />}
          >
            Custom
          </AppLayout.NavigationDrawer.Destination>
        </AppLayout.NavigationDrawer.Section>

        <AppLayout.NavigationDrawer.Section headline="Labels">
          {['A', 'B', 'C', 'D', 'E', 'F'].map((label, index) => (
            <AppLayout.NavigationDrawer.Destination
              key={index}
              leadingIcon={<FontAwesomeIcon icon={faFolder} />}
              supportingText="Supporting text"
              disabled
            >
              Label {label}
            </AppLayout.NavigationDrawer.Destination>
          ))}
        </AppLayout.NavigationDrawer.Section>
      </Flex>
    </AppLayout.NavigationDrawer>
  );
};
