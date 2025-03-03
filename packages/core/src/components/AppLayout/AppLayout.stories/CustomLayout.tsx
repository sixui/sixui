import { createSequence } from '@olivierpascal/helpers';

import type { IAppLayoutBodyProps } from '~/components/AppLayout';
import { AppLayout } from '~/components/AppLayout';
import { BottomSheet } from '~/components/BottomSheet';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Placeholder } from '~/components/Placeholder';
import { Text } from '~/components/Text';
import { useToggle } from '~/hooks/useToggle';

const AppLayoutSideSheetContent: React.FC = () => (
  <Flex direction="column" rowGap="$sm" pl="$lg" pr="$lg">
    {createSequence(4).map((index) => (
      <Placeholder key={index} label="list" shape="$lg" h="96px" diagonals />
    ))}
  </Flex>
);

const BottomSheetContent: React.FC = () => (
  <Flex h="100%" align="center" justify="center">
    <Text>Hello World!</Text>
  </Flex>
);

export type ICustomLayoutProps = IAppLayoutBodyProps;

export const CustomLayout: React.FC<ICustomLayoutProps> = (props) => {
  const { ...other } = props;
  const [bottomSheetOpened, toggleBottomSheet] = useToggle([false, true]);

  return (
    <>
      <AppLayout.Body {...other}>
        <Placeholder shape="$lg" grow={1} h="24px4" diagonals>
          <Button
            onClick={() => {
              toggleBottomSheet();
            }}
          >
            Toggle Bottom Sheet
          </Button>
        </Placeholder>
      </AppLayout.Body>

      <AppLayout.SideSheet side="right" divider>
        <AppLayoutSideSheetContent />
      </AppLayout.SideSheet>

      <BottomSheet
        showCloseButton
        opened={bottomSheetOpened}
        onClose={() => {
          toggleBottomSheet(false);
        }}
        h="16px8"
      >
        <BottomSheetContent />
      </BottomSheet>
    </>
  );
};
