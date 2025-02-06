import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { DialogOverlay } from '~/components/Dialog';
import { Flex } from '~/components/Flex';
import { OverlaysProvider, useOverlays } from '~/components/Overlays';
import { DrawerSideSheetOverlay } from '../DrawerSideSheet';

type IOverlaysDemoProps = never;

const OverlaysDemo: React.FC<IOverlaysDemoProps> = () => {
  const overlays = useOverlays();

  return (
    <Flex direction="row" gap="$3">
      <Button
        onClick={() =>
          void overlays.open(DialogOverlay, {
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
          })
        }
      >
        Open dialog
      </Button>
      <Button
        onClick={() =>
          void overlays.open(DrawerSideSheetOverlay, {
            side: 'right',
            modal: true,
          })
        }
      >
        Open modal side sheet
      </Button>
    </Flex>
  );
};

const meta = {
  component: OverlaysDemo,
} satisfies Meta<IOverlaysDemoProps>;

type IStory = StoryObj<IOverlaysDemoProps>;

const defaultArgs = {} as IOverlaysDemoProps;

const OverlaysDemoShowcase = componentShowcaseFactory(OverlaysDemo);

export const Basic: IStory = {
  render: (props) => (
    <OverlaysProvider>
      <OverlaysDemoShowcase props={props} />
    </OverlaysProvider>
  ),
  args: defaultArgs,
};

export default meta;
