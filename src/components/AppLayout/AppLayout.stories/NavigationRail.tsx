import {
  faCircle,
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

import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import { IAppLayoutNavigationRailProps } from '~/components/AppLayoutNavigationRail';
import { AppLayout } from '../AppLayout';

export interface INavigationRailProps extends IAppLayoutNavigationRailProps {
  activeDestination?: ICanonicalLayoutType;
  onClick?: (destination?: ICanonicalLayoutType) => void;
}

export const NavigationRail: React.FC<INavigationRailProps> = (props) => {
  const { activeDestination, onClick, ...other } = props;

  return (
    <AppLayout.NavigationRail {...other}>
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
      <AppLayout.NavigationRail.Destination
        onClick={() => onClick?.(undefined)}
        active={activeDestination === undefined}
        icon={<FontAwesomeIcon icon={faQuestionCircle} />}
        activeIcon={<FontAwesomeIcon icon={fasQuestionCircle} />}
        label="Custom"
      />
    </AppLayout.NavigationRail>
  );
};
