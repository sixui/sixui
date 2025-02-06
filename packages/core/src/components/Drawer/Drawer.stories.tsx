import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IOmit } from '~/utils/types';
import type { IDrawerProps } from './Drawer.types';
import { Button } from '~/components/Button';
import { Flex } from '~/components/Flex';
import { Frame } from '~/components/Frame';
import { Paper } from '~/components/Paper';
import { Text } from '~/components/Text';
import { useDisclosure } from '~/hooks/useDisclosure';
import { Drawer } from './Drawer';

const meta = {
  component: Drawer,
} satisfies Meta<typeof Drawer>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDrawerProps>;

type IDrawerDemoProps = IOmit<IDrawerProps, 'children'>;

const DrawerDemo: React.FC<IDrawerDemoProps> = (props) => {
  const { ...other } = props;

  return (
    <Drawer {...other}>
      {({ close }) => (
        <Paper p="$4" surface="$inverseSurface" grow={1}>
          <Flex direction="column" align="start">
            <Text color="$inverseOnSurface">
              Press escape to close the drawer.
            </Text>
            <Button onClick={close} variant="snackbar">
              Close
            </Button>
          </Flex>
        </Paper>
      )}
    </Drawer>
  );
};

const DrawerFrame: React.FC<IDrawerProps> = (props) => {
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const [leftOpened, leftActions] = useDisclosure(false);
  const [topOpened, topActions] = useDisclosure(false);
  const [rightOpened, rightActions] = useDisclosure(false);
  const [bottomOpened, bottomActions] = useDisclosure(false);

  return (
    <Frame importParentStyles w="100%" h="$96">
      <div ref={setRoot}>
        <DrawerDemo
          {...props}
          portalProps={{ root }}
          opened={leftOpened}
          onClose={leftActions.close}
          side="left"
          fullHeight
        />
        <DrawerDemo
          {...props}
          portalProps={{ root }}
          opened={topOpened}
          onClose={topActions.close}
          side="top"
          fullWidth
        />
        <DrawerDemo
          {...props}
          portalProps={{ root }}
          opened={rightOpened}
          onClose={rightActions.close}
          side="right"
          fullHeight
        />
        <DrawerDemo
          {...props}
          portalProps={{ root }}
          opened={bottomOpened}
          onClose={bottomActions.close}
          side="bottom"
          fullWidth
        />

        <Flex
          direction="row"
          align="center"
          justify="space-between"
          p="$4"
          h="100%"
        >
          <Button
            variant="text"
            onClick={leftActions.open}
            trailingIcon={<FontAwesomeIcon icon={faChevronRight} />}
          >
            Open left
          </Button>
          <Flex
            direction="column"
            justify="space-between"
            align="center"
            h="100%"
          >
            <Button
              variant="text"
              onClick={topActions.open}
              leadingIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              Open top
            </Button>
            <Button
              variant="text"
              onClick={bottomActions.open}
              leadingIcon={<FontAwesomeIcon icon={faChevronUp} />}
            >
              Open bottom
            </Button>
          </Flex>
          <Button
            variant="text"
            onClick={rightActions.open}
            leadingIcon={<FontAwesomeIcon icon={faChevronLeft} />}
          >
            Open right
          </Button>
        </Flex>
      </div>
    </Frame>
  );
};

export const Standard: IStory = {
  render: (props) => <DrawerFrame {...props} />,
  args: defaultArgs as IDrawerProps,
};

export const Detached: IStory = {
  render: (props) => <DrawerFrame {...props} />,
  args: {
    ...defaultArgs,
    variant: 'detached',
  } as IDrawerProps,
};

export default meta;
