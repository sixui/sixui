import {
  faBars as fasBars,
  faXmark as fasXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAppLayoutHeaderProps } from '~/components/AppLayoutHeader';
import { Flex } from '~/components/Flex';
import { IconButton } from '~/components/IconButton';
import { AppLayout } from '../AppLayout';
import { useAppLayoutContext } from '../AppLayout.context';

export type IHeaderProps = IAppLayoutHeaderProps;

export const Header: React.FC<IHeaderProps> = (props) => {
  const { ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  return (
    <AppLayout.Header {...other}>
      <Flex direction="row" gap="$6" justify="space-between" grow={1}>
        <Flex direction="row" gap="$2" align="center">
          {appLayoutContext?.navigationDrawer?.state?.toggle && (
            <IconButton
              icon={
                <FontAwesomeIcon
                  icon={
                    appLayoutContext.navigationDrawer?.state?.opened
                      ? fasXmark
                      : fasBars
                  }
                />
              }
              onClick={appLayoutContext.navigationDrawer?.state?.toggle}
            />
          )}
          <div>Header</div>
        </Flex>

        <Flex direction="row" gap="$2">
          {appLayoutContext?.aside?.state?.toggle && (
            <IconButton
              icon={
                <FontAwesomeIcon
                  icon={
                    appLayoutContext.aside?.state?.opened ? fasXmark : fasBars
                  }
                />
              }
              onClick={appLayoutContext.aside?.state?.toggle}
            />
          )}
        </Flex>
      </Flex>
    </AppLayout.Header>
  );
};
