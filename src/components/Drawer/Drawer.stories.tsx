import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IOmit } from '~/helpers/types';
import type { IDrawerProps } from './Drawer.types';
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

const defaultArgs = {
  children: 'Drawer',
} satisfies Partial<IDrawerProps>;

type IDrawerDemoProps = IOmit<IDrawerProps, 'children'>;

const DrawerDemo: React.FC<IDrawerDemoProps> = (props) => {
  const { ...other } = props;

  return (
    <Drawer {...other}>
      {({ close }) => (
        <Paper p="$4" surface="$surface" grow={1} data-test="xxxx">
          {/* FIXME: This is a hack to prevent the first focusable element
                    from being focused when the side sheet is opened. */}
          {/* <button
            aria-hidden
            type="button"
            {...stylex.props(commonStyles.outOfScreen)}
          /> */}

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
        borderWidth: themeTokens.outline.width.xs,
        borderColor: themeTokens.colorScheme.outlineVariant,
        borderStyle: 'dashed',
      }}
    >
      <div ref={setRootElement}>
        <DrawerDemo
          {...props}
          target={rootElement}
          opened={leftOpened}
          onClose={leftActions.close}
          side="left"
        />
        <DrawerDemo
          {...props}
          target={rootElement}
          opened={topOpened}
          onClose={topActions.close}
          side="top"
        />
        <DrawerDemo
          {...props}
          target={rootElement}
          opened={rightOpened}
          onClose={rightActions.close}
          side="right"
        />
        <DrawerDemo
          {...props}
          target={rootElement}
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
            leadingIcon={<FontAwesomeIcon icon={faArrowLeft} />}
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
              leadingIcon={<FontAwesomeIcon icon={faArrowUp} />}
            >
              Open top
            </Button>
            <Button
              variant="text"
              onClick={bottomActions.open}
              leadingIcon={<FontAwesomeIcon icon={faArrowDown} />}
            >
              Open bottom
            </Button>
          </Flex>
          <Button
            variant="text"
            onClick={rightActions.open}
            leadingIcon={<FontAwesomeIcon icon={faArrowRight} />}
            trailingIcon
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
  args: defaultArgs,
};

export const Detached: IStory = {
  render: (props) => <DrawerFrame {...props} />,
  args: {
    ...defaultArgs,
    variant: 'detached',
  },
};

export default meta;
