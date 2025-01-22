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

import type { INavigationRailProps } from '~/components/NavigationRail';
import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import { NavigationRail } from '~/components/NavigationRail';

export interface IMainNavigationRailProps extends INavigationRailProps {
  activeDestination?: ICanonicalLayoutType;
  onClick?: (destination?: ICanonicalLayoutType) => void;
}

export const MainNavigationRail: React.FC<IMainNavigationRailProps> = (
  props,
) => {
  const { activeDestination, onClick, ...other } = props;

  return (
    <NavigationRail {...other}>
      <NavigationRail.Destination
        onClick={() => onClick?.('listDetail')}
        active={activeDestination === 'listDetail'}
        icon={<FontAwesomeIcon icon={faSquare} />}
        activeIcon={<FontAwesomeIcon icon={fasSquare} />}
        label="List-detail"
      />
      <NavigationRail.Destination
        onClick={() => onClick?.('supportingPane')}
        active={activeDestination === 'supportingPane'}
        icon={<FontAwesomeIcon icon={faCircle} />}
        activeIcon={<FontAwesomeIcon icon={fasCircle} />}
        label="Supporting pane"
      />
      <NavigationRail.Destination
        onClick={() => onClick?.('feed')}
        active={activeDestination === 'feed'}
        icon={<FontAwesomeIcon icon={faHeart} />}
        activeIcon={<FontAwesomeIcon icon={fasHeart} />}
        label="Feed"
      />
      <NavigationRail.Destination
        onClick={() => onClick?.(undefined)}
        active={activeDestination === undefined}
        icon={<FontAwesomeIcon icon={faQuestionCircle} />}
        activeIcon={<FontAwesomeIcon icon={fasQuestionCircle} />}
        label="Custom"
      />
    </NavigationRail>
  );
};
