import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import type { IBottomSheetProps } from './BottomSheet.types';
import { Button } from '~/components/Button';
import { Checkbox } from '~/components/Checkbox';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Labeled } from '~/components/Labeled';
import { OverlaysProvider, useOverlays } from '~/components/Overlays';
import { Text } from '~/components/Text';
import { themeTokens } from '~/components/Theme';
import { useToggle } from '~/hooks';
import { px } from '~/utils/css';
import { Placeholder } from '../Placeholder';
import { BottomSheet } from './BottomSheet';
import { BottomSheetOverlay } from './BottomSheetOverlay';

const meta = {
  component: BottomSheet,
} satisfies Meta<IBottomSheetProps>;

type IStory = StoryObj<IBottomSheetProps>;

const defaultArgs = {
  showCloseButton: true,
  children: (
    <Text p="$6">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
      tincidunt dictum vulputate. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Nullam ultrices leo non urna sollicitudin faucibus.
      Curabitur interdum, massa at venenatis sodales, metus tellus aliquet erat,
      vitae lacinia mi mi consectetur dolor. Phasellus blandit porta urna at
      semper. Donec vehicula lectus in eleifend elementum. Vestibulum quis massa
      massa. Vivamus porta risus ac metus dictum tristique. Curabitur pulvinar
      nunc eget eros condimentum, sit amet fermentum dui blandit. Nam lorem
      orci, ultricies quis justo eget, gravida finibus sapien. Cras lorem odio,
      sagittis sed risus sed, tristique malesuada leo. In odio enim, pulvinar ut
      felis ac, vulputate auctor massa.
    </Text>
  ),
} satisfies Partial<IBottomSheetProps>;

const BottomSheetFrame: React.FC<IBottomSheetProps> = (props) => {
  const { ...other } = props;
  const [opened, toggleOpened] = useToggle([true, false]);
  const [isModal, setModal] = useState(false);
  const [detached, setDetached] = useState(false);
  const [isFullHeight, setFullHeight] = useState(false);

  return (
    <Flex direction="column" gap="$2">
      <Flex direction="row" gap="$6">
        <Button
          onClick={() => {
            toggleOpened();
          }}
          w="$24"
        >
          {opened ? 'Close' : 'Open'}
        </Button>
        <Labeled label="Modal" labelPosition="right">
          <Checkbox
            onChange={(value) => {
              setModal(!!value);
            }}
          />
        </Labeled>
        <Labeled label="Detached" labelPosition="right">
          <Checkbox
            onChange={(value) => {
              setDetached(!!value);
            }}
          />
        </Labeled>
        <Labeled label="Full height" labelPosition="right">
          <Checkbox
            onChange={(value) => {
              setFullHeight(!!value);
            }}
          />
        </Labeled>
      </Flex>

      <Frame
        importParentStyles
        w="100%"
        h="$96"
        style={{
          borderWidth: px(1),
          borderStyle: 'dashed',
          borderColor: themeTokens.colorScheme.outlineVariant,
        }}
      >
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
      </Frame>
    </Flex>
  );
};

export const Basic: IStory = {
  render: (props) => <BottomSheetFrame {...props} />,
  args: defaultArgs,
};

const AsOverlayDemo: React.FC<IBottomSheetProps> = (props) => {
  const overlays = useOverlays();

  return (
    <Button
      onClick={() =>
        overlays.open(BottomSheetOverlay, {
          ...props,
          modal: true,
        })
      }
    >
      Open
    </Button>
  );
};

const AsOverlayDemoShowcase = componentShowcaseFactory(AsOverlayDemo);

export const AsOverlay: IStory = {
  render: (props: IBottomSheetProps) => (
    <OverlaysProvider>
      <AsOverlayDemoShowcase props={props} />
    </OverlaysProvider>
  ),
  args: defaultArgs,
};

export default meta;
