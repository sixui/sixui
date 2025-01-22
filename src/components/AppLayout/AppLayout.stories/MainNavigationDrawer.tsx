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

import type { INavigationDrawerProps } from '~/components/NavigationDrawer';
import type { ICanonicalLayoutType } from '~/hooks/useCanonicalLayout';
import { Flex } from '~/components/Flex';
import { NavigationDrawer } from '~/components/NavigationDrawer';

export interface IMainNavigationDrawerProps extends INavigationDrawerProps {
  activeDestination?: ICanonicalLayoutType;
  onClick?: (destination?: ICanonicalLayoutType) => void;
}

export const MainNavigationDrawer: React.FC<IMainNavigationDrawerProps> = (
  props,
) => {
  const { activeDestination, onClick, ...other } = props;

  return (
    <NavigationDrawer {...other}>
      <Flex direction="column" gap="$6">
        <NavigationDrawer.Section headline="Canonical layouts" endDivider>
          <NavigationDrawer.Destination
            onClick={() => onClick?.('listDetail')}
            active={activeDestination === 'listDetail'}
            leadingIcon={<FontAwesomeIcon icon={faSquare} />}
            activeLeadingIcon={<FontAwesomeIcon icon={fasSquare} />}
          >
            List-detail
          </NavigationDrawer.Destination>
          <NavigationDrawer.Destination
            onClick={() => onClick?.('supportingPane')}
            active={activeDestination === 'supportingPane'}
            leadingIcon={<FontAwesomeIcon icon={faCircle} />}
            activeLeadingIcon={<FontAwesomeIcon icon={fasCircle} />}
          >
            Supporting pane
          </NavigationDrawer.Destination>
          <NavigationDrawer.Destination
            onClick={() => onClick?.('feed')}
            active={activeDestination === 'feed'}
            leadingIcon={<FontAwesomeIcon icon={faHeart} />}
            activeLeadingIcon={<FontAwesomeIcon icon={fasHeart} />}
          >
            Feed
          </NavigationDrawer.Destination>
          <NavigationDrawer.Destination
            onClick={() => onClick?.(undefined)}
            active={activeDestination === undefined}
            leadingIcon={<FontAwesomeIcon icon={faQuestionCircle} />}
            activeLeadingIcon={<FontAwesomeIcon icon={fasQuestionCircle} />}
          >
            Custom
          </NavigationDrawer.Destination>
        </NavigationDrawer.Section>

        <NavigationDrawer.Section headline="Labels">
          <NavigationDrawer.Destination
            onClick={() => {}}
            leadingIcon={<FontAwesomeIcon icon={faFolder} />}
            disabled
          >
            Label A
          </NavigationDrawer.Destination>
          <NavigationDrawer.Destination
            onClick={() => {}}
            leadingIcon={<FontAwesomeIcon icon={faFolder} />}
            disabled
          >
            Label B
          </NavigationDrawer.Destination>
        </NavigationDrawer.Section>
      </Flex>
    </NavigationDrawer>
  );
};
