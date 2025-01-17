import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IOmit } from '~/helpers/types';
import type { IDrawerProps } from './Drawer.types';
import { px } from '~/helpers/styles/px';
import { useDisclosure } from '~/hooks/useDisclosure';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { Frame } from '../Frame';
import { Paper } from '../Paper';
import { Text } from '../Text';
import { themeTokens } from '../ThemeProvider';
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
        <Paper p="$4" surface="$surface" grow={1}>
          <Flex direction="column" align="start">
            <Text>Press escape to close the drawer.</Text>
            <Button onClick={close} variant="text">
              Close
            </Button>
          </Flex>
        </Paper>
      )}
    </Drawer>
  );
};

const DrawerFrame: React.FC<IDrawerProps> = (props) => {
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
  const [leftOpened, leftActions] = useDisclosure(false);
  const [topOpened, topActions] = useDisclosure(false);
  const [rightOpened, rightActions] = useDisclosure(false);
  const [bottomOpened, bottomActions] = useDisclosure(false);

  return (
    <Frame
      importParentStyles
      w="100%"
      h="$96"
      style={{
        borderWidth: px(themeTokens.outline.width.xs),
        borderColor: themeTokens.colorScheme.outlineVariant,
        borderStyle: 'dashed',
      }}
    >
      <div ref={setRootElement}>
        <DrawerDemo
          {...props}
          root={rootElement}
          opened={leftOpened}
          onClose={leftActions.close}
          side="left"
          fullHeight
        />
        <DrawerDemo
          {...props}
          root={rootElement}
          opened={topOpened}
          onClose={topActions.close}
          side="top"
        />
        <DrawerDemo
          {...props}
          root={rootElement}
          opened={rightOpened}
          onClose={rightActions.close}
          side="right"
          fullHeight
        />
        <DrawerDemo
          {...props}
          root={rootElement}
          opened={bottomOpened}
          onClose={bottomActions.close}
          side="bottom"
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
            leadingIcon={<FontAwesomeIcon icon={faChevronLeft} />}
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
              leadingIcon={<FontAwesomeIcon icon={faChevronUp} />}
            >
              Open top
            </Button>
            <Button
              variant="text"
              onClick={bottomActions.open}
              leadingIcon={<FontAwesomeIcon icon={faChevronDown} />}
            >
              Open bottom
            </Button>
          </Flex>
          <Button
            variant="text"
            onClick={rightActions.open}
            trailingIcon={<FontAwesomeIcon icon={faChevronRight} />}
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
