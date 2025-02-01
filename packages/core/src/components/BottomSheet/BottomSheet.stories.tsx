import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IBottomSheetProps } from './BottomSheet.types';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Text } from '~/components/Text';
import { useDisclosure } from '~/hooks/useDisclosure';
import { BottomSheet } from './BottomSheet';

const meta = {
  component: BottomSheet,
} satisfies Meta<IBottomSheetProps>;

type IStory = StoryObj<IBottomSheetProps>;

const defaultArgs = {
  showCloseButton: true,
} satisfies Partial<IBottomSheetProps>;

const rows: Array<IComponentPresentation<IBottomSheetProps>> = [
  { legend: 'Normal' },
  { legend: 'Full height', props: { fullHeight: true } },
];

const BottomSheetDemo: React.FC<IBottomSheetProps> = (props) => {
  const [opened, { close, toggle }] = useDisclosure(false);

  return (
    <>
      <Button
        onClick={() => {
          toggle();
        }}
        w="$24"
      >
        {opened ? 'Close' : 'Open'}
      </Button>
      <BottomSheet {...props} opened={opened} onClose={close}>
        <Text p="$6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          tincidunt dictum vulputate. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nullam ultrices leo non urna sollicitudin faucibus.
          Curabitur interdum, massa at venenatis sodales, metus tellus aliquet
          erat, vitae lacinia mi mi consectetur dolor. Phasellus blandit porta
          urna at semper. Donec vehicula lectus in eleifend elementum.
          Vestibulum quis massa massa. Vivamus porta risus ac metus dictum
          tristique. Curabitur pulvinar nunc eget eros condimentum, sit amet
          fermentum dui blandit. Nam lorem orci, ultricies quis justo eget,
          gravida finibus sapien. Cras lorem odio, sagittis sed risus sed,
          tristique malesuada leo. In odio enim, pulvinar ut felis ac, vulputate
          auctor massa.
        </Text>
      </BottomSheet>
    </>
  );
};

const BottomSheetDemoShowcase = componentShowcaseFactory(BottomSheetDemo);

export const Standard: IStory = {
  render: (props) => <BottomSheetDemoShowcase props={props} rows={rows} />,
  args: defaultArgs,
};

export const Modal: IStory = {
  render: (props) => <BottomSheetDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    modal: true,
  },
};

export const Detached: IStory = {
  render: (props) => <BottomSheetDemoShowcase props={props} rows={rows} />,
  args: {
    ...defaultArgs,
    detached: true,
  },
};

export default meta;
