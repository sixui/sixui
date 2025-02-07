import { AppLayout } from '~/components/AppLayout';
import { Burger } from '~/components/Burger';
import { Flex } from '~/components/Flex';
import { useAppLayoutContext } from '../AppLayout.context';
import { IAppLayoutTopBarProps } from '../AppLayoutTopBar';

export type ITopBarProps = IAppLayoutTopBarProps;

export const TopBar: React.FC<ITopBarProps> = (props) => {
  const { ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  return (
    <AppLayout.TopBar {...other}>
      <Flex direction="row" gap="$6" justify="space-between" grow={1}>
        <Flex direction="row" gap="$2" align="center">
          {appLayoutContext?.navigationDrawer?.state?.toggle && (
            <Burger onClick={appLayoutContext.navigationDrawer.state.toggle} />
          )}
          <div>TopBar</div>
        </Flex>

        <Flex direction="row" gap="$2">
          {appLayoutContext?.sideSheet?.state?.toggle && (
            <Burger onClick={appLayoutContext.sideSheet.state.toggle} />
          )}
        </Flex>
      </Flex>
    </AppLayout.TopBar>
  );
};
