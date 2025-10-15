import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IDialogOverlayProps } from '~/components/Dialog';
import type { ISideSheetOverlayProps } from '~/components/SideSheet';
import type { ISnackbarOverlayProps } from '~/components/Snackbar';
import {
  BottomSheetOverlay,
  IBottomSheetOverlayProps,
} from '~/components/BottomSheet/BottomSheetOverlay';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { DialogOverlay } from '~/components/Dialog';
import { Flex } from '~/components/Flex';
import { useOverlays } from '~/components/Overlays';
import { SideSheetOverlay } from '~/components/SideSheet';
import { SnackbarOverlay } from '~/components/Snackbar';

type IOverlaysDemoProps = never;

const OverlaysDemo: React.FC<IOverlaysDemoProps> = () => {
  const overlays = useOverlays();

  const openDialog = (props?: IDialogOverlayProps): Promise<unknown> =>
    overlays.open(DialogOverlay, {
      headline: 'Basic dialog title',
      children:
        'A dialog is a window that appears in front of app content to provide information, or ask for a decision.',
      actions: ({ close }) => (
        <>
          <Button variant="text" onClick={close}>
            I don't agree
          </Button>
          <Button onClick={close}>I agree</Button>
        </>
      ),
      ...props,
    }).promise;

  const renderContent = (): React.ReactNode => (
    <Flex direction="column" p="$md" gap="$md" w="288px" ml="auto" mr="auto">
      <Flex direction="column" gap="$xs">
        <Button onClick={() => void openDialog()}>Open dialog</Button>
        <Button
          onClick={() =>
            void openDialog({
              modal: true,
            })
          }
        >
          Open dialog (modal)
        </Button>
      </Flex>

      <Flex direction="column" gap="$xs">
        <Button
          onClick={() =>
            void openSideSheet({
              side: 'left',
              showCloseButton: true,
            })
          }
        >
          Open left side sheet
        </Button>
        <Button
          onClick={() =>
            void openSideSheet({
              side: 'left',
              showCloseButton: true,
              modal: true,
            })
          }
        >
          Open left side sheet (modal)
        </Button>
      </Flex>

      <Flex direction="column" gap="$xs">
        <Button
          onClick={() =>
            void openSideSheet({
              side: 'right',
              showCloseButton: true,
            })
          }
        >
          Open right side sheet
        </Button>
        <Button
          onClick={() =>
            void openSideSheet({
              side: 'right',
              showCloseButton: true,
              modal: true,
            })
          }
        >
          Open right side sheet (modal)
        </Button>
      </Flex>

      <Flex direction="column" gap="$xs">
        <Button onClick={() => void openBottomSheet()}>
          Open bottom sheet
        </Button>
        <Button
          onClick={() =>
            void openBottomSheet({
              modal: true,
            })
          }
        >
          Open bottom sheet (modal)
        </Button>
      </Flex>

      <Button onClick={() => void openSnackbar()}>Open snackbar</Button>
    </Flex>
  );

  const openSideSheet = (props?: ISideSheetOverlayProps): Promise<unknown> =>
    overlays.open(SideSheetOverlay, {
      children: renderContent(),
      ...props,
    }).promise;

  const openSnackbar = (props?: ISnackbarOverlayProps): Promise<unknown> =>
    overlays.open(SnackbarOverlay, {
      children: 'Lorem ipsum dolor sit amet.',
      ...props,
    }).promise;

  const openBottomSheet = (
    props?: IBottomSheetOverlayProps,
  ): Promise<unknown> =>
    overlays.open(BottomSheetOverlay, {
      children: renderContent(),
      showCloseButton: true,
      ...props,
    }).promise;

  return renderContent();
};

const meta = {
  component: OverlaysDemo,
} satisfies Meta<IOverlaysDemoProps>;

type IStory = StoryObj<IOverlaysDemoProps>;

const defaultArgs = {} as IOverlaysDemoProps;

const OverlaysDemoShowcase = componentShowcaseFactory(OverlaysDemo);

export const Basic: IStory = {
  render: (props) => <OverlaysDemoShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
