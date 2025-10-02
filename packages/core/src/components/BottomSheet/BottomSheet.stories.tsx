import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import type { IBottomSheetProps } from './BottomSheet.types';
import type { IBottomSheetOverlayProps } from './BottomSheetOverlay';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { useOverlays } from '~/components/Overlays';
import { Placeholder } from '~/components/Placeholder';
import { ScreenFrame } from '~/components/ScreenFrame';
import { Text } from '~/components/Text';
import { useToggle } from '~/hooks';
import { BottomSheet } from './BottomSheet';
import { BottomSheetOverlay } from './BottomSheetOverlay';

const meta = {
  component: BottomSheet,
  args: {
    showCloseButton: true,
    children: (
      <Text p="$xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        tincidunt dictum vulputate. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Nullam ultrices leo non urna sollicitudin faucibus.
        Curabitur interdum, massa at venenatis sodales, metus tellus aliquet
        erat, vitae lacinia mi mi consectetur dolor. Phasellus blandit porta
        urna at semper. Donec vehicula lectus in eleifend elementum. Vestibulum
        quis massa massa. Vivamus porta risus ac metus dictum tristique.
        Curabitur pulvinar nunc eget eros condimentum, sit amet fermentum dui
        blandit. Nam lorem orci, ultricies quis justo eget, gravida finibus
        sapien. Cras lorem odio, sagittis sed risus sed, tristique malesuada
        leo. In odio enim, pulvinar ut felis ac, vulputate auctor massa.
      </Text>
    ),
  },
} satisfies Meta<IBottomSheetProps>;

type IStory = StoryObj<IBottomSheetProps>;

const BottomSheetScreenFrame: React.FC<IBottomSheetProps> = (props) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);
  const [isModal, setModal] = useState(false);
  const [detached, setDetached] = useState(false);
  const [isFullHeight, setFullHeight] = useState(false);

  return (
    <Flex direction="column" gap="$sm">
      <Flex direction="row" gap="$xl" align="center">
        <Button
          onClick={() => {
            toggleOpened();
          }}
          w="96px"
        >
          {opened ? 'Close' : 'Open'}
        </Button>
        <Checkbox
          label="Modal"
          checked={isModal}
          onChange={(value) => {
            setModal(value);
          }}
        />
        <Checkbox
          label="Detached"
          checked={detached}
          onChange={(value) => {
            setDetached(value);
          }}
        />
        <Checkbox
          label="Full height"
          checked={isFullHeight}
          onChange={(value) => {
            setFullHeight(value);
          }}
        />
      </Flex>

      <ScreenFrame defaultHeight={350}>
        <Flex h="100%">
          <Placeholder label="Page" grow={1} expanded diagonals />
          <BottomSheet
            opened={opened}
            modal={isModal}
            detached={detached}
            fullHeight={isFullHeight}
            onClose={() => {
              toggleOpened(false);
            }}
            {...other}
          />
        </Flex>
      </ScreenFrame>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <BottomSheetScreenFrame {...props} />,
};

const AsOverlayDemo: React.FC<IBottomSheetOverlayProps> = (props) => {
  const overlays = useOverlays();

  return (
    <Button onClick={() => overlays.open(BottomSheetOverlay, props)}>
      Open
    </Button>
  );
};

const AsOverlayDemoShowcase = componentShowcaseFactory(AsOverlayDemo);

export const AsOverlay: IStory = {
  render: (props: IBottomSheetProps) => (
    <AsOverlayDemoShowcase
      props={props}
      rows={[{ legend: 'Normal' }, { legend: 'Modal', props: { modal: true } }]}
    />
  ),
};

export default meta;
