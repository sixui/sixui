import { createSequence } from '@olivierpascal/helpers';

import { BottomSheet } from '~/components/BottomSheet';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';
import { SideSheet } from '~/components/SideSheet';
import { Text } from '~/components/Text';
import { useToggle } from '~/hooks/useToggle';
import { AppLayout } from '../AppLayout';

const AsideContent: React.FC = () => (
  <Flex direction="column" rowGap="$2" pl="$4" pr="$4">
    {createSequence(4).map((index) => (
      <Placeholder key={index} label="list" shape="$sm" h="$24" diagonals />
    ))}
  </Flex>
);

const BottomSheetContent: React.FC = () => (
  <Flex h="100%" align="center" justify="center">
    <Text>Hello World!</Text>
  </Flex>
);

export const CustomLayout: React.FC = () => {
  const [bottomSheetOpened, toggleBottomSheet] = useToggle([false, true]);

  return (
    <>
      <AppLayout.Body pt="$6" pb="$6">
        <Placeholder shape="$sm" grow={1} h="$64" diagonals>
          <Button onClick={() => toggleBottomSheet()}>
            Toggle Bottom Sheet
          </Button>
        </Placeholder>
      </AppLayout.Body>

      <AppLayout.SideSheet side="right">
        <SideSheet divider>
          <AsideContent />
        </SideSheet>
      </AppLayout.SideSheet>

      <BottomSheet
        showCloseButton
        opened={bottomSheetOpened}
        onClose={() => toggleBottomSheet(false)}
        h="$48"
      >
        <BottomSheetContent />
      </BottomSheet>
    </>
  );
};
