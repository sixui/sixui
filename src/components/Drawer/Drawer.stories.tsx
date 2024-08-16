import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
} from '@fortawesome/free-solid-svg-icons';

import type { IDrawerProps } from './Drawer.types';
import type { IOmit } from '~/helpers/types';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { commonStyles } from '~/helpers/commonStyles';
import { useDisclosure } from '~/hooks/useDisclosure';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { Frame } from '../Frame';
import { Drawer } from './Drawer';
import { Text } from '../Text';

// https://m3.material.io/components/drawers/overview
// https://material-web.dev/components/drawer/
// https://github.com/material-components/material-web/blob/main/drawer/demo/stories.ts

const meta = {
  component: Drawer,
} satisfies Meta<IDrawerProps>;

type IStory = StoryObj<IDrawerProps>;

const styles = stylex.create({
  frame: {
    width: '100%',
    height: `calc(400px * ${scaleTokens.scale})`,
    borderWidth: outlineTokens.width$xs,
    borderColor: colorSchemeTokens.outlineVariant,
    borderStyle: 'dashed',
  },
  frameInner: {
    height: '100%',
    padding: spacingTokens.padding$4,
  },
  column: {
    height: '100%',
  },
  content: {
    padding: spacingTokens.padding$4,
    backgroundColor: colorSchemeTokens.surface,
  },
});

const defaultArgs = {} satisfies Partial<IDrawerProps>;

type IDrawerDemo = IOmit<IDrawerProps, 'children'>;

const DrawerDemo: React.FC<IDrawerDemo> = (props) => {
  const { anchor = 'left', ...other } = props;

  return (
    <Drawer {...other} anchor={anchor} sx={styles.content}>
      {({ close }) => (
        <>
          {/* This is a hack to prevent the first focusable element
                    from being focused when the side sheet is opened. */}
          <button
            aria-hidden
            type='button'
            {...stylex.props(commonStyles.outOfScreen)}
          />

          <Stack align='start'>
            <Text>Press escape to close the drawer.</Text>
            <Button onClick={close} variant='text'>
              Close
            </Button>
          </Stack>
        </>
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
    <Frame importParentStyles sx={styles.frame}>
      <div ref={setRootElement}>
        <DrawerDemo
          {...props}
          root={rootElement}
          opened={leftOpened}
          onClose={leftActions.close}
          anchor='left'
        />
        <DrawerDemo
          {...props}
          root={rootElement}
          opened={topOpened}
          onClose={topActions.close}
          anchor='top'
        />
        <DrawerDemo
          {...props}
          root={rootElement}
          opened={rightOpened}
          onClose={rightActions.close}
          anchor='right'
        />
        <DrawerDemo
          {...props}
          root={rootElement}
          opened={bottomOpened}
          onClose={bottomActions.close}
          anchor='bottom'
        />

        <Stack horizontal justify='space-between' sx={styles.frameInner}>
          <Button
            variant='text'
            onClick={leftActions.open}
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
          >
            Open left
          </Button>
          <Stack justify='space-between' align='center' sx={styles.column}>
            <Button
              variant='text'
              onClick={topActions.open}
              icon={<FontAwesomeIcon icon={faArrowUp} />}
            >
              Open top
            </Button>
            <Button
              variant='text'
              onClick={bottomActions.open}
              icon={<FontAwesomeIcon icon={faArrowDown} />}
            >
              Open bottom
            </Button>
          </Stack>
          <Button
            variant='text'
            onClick={rightActions.open}
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            trailingIcon
          >
            Open right
          </Button>
        </Stack>
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
