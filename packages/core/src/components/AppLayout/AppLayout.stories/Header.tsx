import { AppLayout } from '~/components/AppLayout';
import { Burger } from '~/components/Burger';
import { Flex } from '~/components/Flex';
import { useAppLayoutContext } from '../AppLayout.context';
import { IAppLayoutHeaderProps } from '../AppLayoutHeader';

export type IHeaderProps = IAppLayoutHeaderProps;

export const Header: React.FC<IHeaderProps> = (props) => {
  const { ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  return (
    <AppLayout.Header {...other}>
      <Flex direction="row" gap="$6" justify="space-between" grow={1}>
        <Flex direction="row" gap="$2" align="center">
          {appLayoutContext?.navigationDrawer?.state?.toggle && (
            <Burger
              opened={appLayoutContext.navigationDrawer.state.opened}
              onClick={appLayoutContext.navigationDrawer.state.toggle}
            />
          )}
          <div>Header</div>
        </Flex>

        <Flex direction="row" gap="$2">
          {appLayoutContext?.sideSheet?.state?.toggle && (
            <Burger
              opened={appLayoutContext.sideSheet.state.opened}
              onClick={appLayoutContext.sideSheet.state.toggle}
            />
          )}
        </Flex>
      </Flex>
    </AppLayout.Header>
  );
};
