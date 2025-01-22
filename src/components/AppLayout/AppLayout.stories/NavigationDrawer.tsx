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
  faQuestion as fasQuestionCircle,
  faSquare as fasSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IAppLayoutNavigationDrawerProps } from '~/components/AppLayoutNavigationDrawer/AppLayoutNavigationDrawer.types';
import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import { Flex } from '~/components/Flex';
import { AppLayout } from '../AppLayout';

export interface INavigationDrawerProps
  extends IAppLayoutNavigationDrawerProps {
  activeDestination?: ICanonicalLayoutType;
  onClick?: (destination?: ICanonicalLayoutType) => void;
}

export const NavigationDrawer: React.FC<INavigationDrawerProps> = (props) => {
  const { activeDestination, onClick, ...other } = props;

  return (
    <AppLayout.NavigationDrawer {...other}>
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
          <AppLayout.NavigationDrawer.Section.Destination
            onClick={() => onClick?.(undefined)}
            active={activeDestination === undefined}
            leadingIcon={<FontAwesomeIcon icon={faQuestionCircle} />}
            activeLeadingIcon={<FontAwesomeIcon icon={fasQuestionCircle} />}
          >
            Custom
          </AppLayout.NavigationDrawer.Section.Destination>
        </AppLayout.NavigationDrawer.Section>

        <AppLayout.NavigationDrawer.Section headline="Labels">
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
        </AppLayout.NavigationDrawer.Section>
      </Flex>
    </AppLayout.NavigationDrawer>
  );
};
