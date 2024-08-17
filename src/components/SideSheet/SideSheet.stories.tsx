import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import stylex from '@stylexjs/stylex';

import type { ISideSheetProps } from './SideSheet.types';
import type { IOmit } from '~/helpers/types';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { commonStyles } from '~/helpers/commonStyles';
import { useDisclosure } from '~/hooks/useDisclosure';
import { Button } from '../Button';
import { Stack } from '../Stack';
import { Frame } from '../Frame';
import { SideSheet } from './SideSheet';
import { Text } from '../Text';
import { motionTokens } from '~/themes/base/motion.stylex';

// https://m3.material.io/components/sidesheets/overview
// https://material-web.dev/components/sidesheet/
// https://github.com/material-components/material-web/blob/main/sidesheet/demo/stories.ts

const meta = {
  component: SideSheet,
} satisfies Meta<ISideSheetProps>;

type IStory = StoryObj<ISideSheetProps>;

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
  },
  sideSheet: {
    flexGrow: 0,
    height: '100%',
    width: 200,
  },
  main: {
    flexGrow: 1,
    transitionProperty: 'margin',
    transitionDuration: motionTokens.duration$long3,
    transitionTimingFunction: motionTokens.easing$emphasizedDecelerate,
  },
  main$expanded: {
    marginLeft: -200,
    transitionProperty: 'margin',
    transitionDuration: motionTokens.duration$short3,
    transitionTimingFunction: motionTokens.easing$emphasizedAccelerate,
  },
});

const defaultArgs = {} satisfies Partial<ISideSheetProps>;

type ISideSheetDemo = IOmit<ISideSheetProps, 'children'>;

const SideSheetDemo: React.FC<ISideSheetDemo> = (props) => {
  const { anchor = 'left', ...other } = props;

  return (
    <SideSheet {...other} anchor={anchor}>
      {({ close }) => (
        <>
          {/* This is a hack to prevent the first focusable element from being
          focused when the side sheet is opened. */}
          <button
            aria-hidden
            type='button'
            {...stylex.props(commonStyles.outOfScreen)}
          />

          <Stack align='start'>
            <Text>Press escape to close the sidesheet.</Text>
            <Button onClick={close} variant='text'>
              Close
            </Button>
          </Stack>
        </>
      )}
    </SideSheet>
  );
};

const SideSheetFrame: React.FC<ISideSheetProps> = (props) => {
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);
  const [opened, { open, close, toggle }] = useDisclosure(true);

  return (
    <Frame importParentStyles sx={styles.frame}>
      <div ref={setRootElement}>
        {rootElement && (
          <Stack
            horizontal
            justify='space-between'
            align='start'
            // sx={styles.frameInner}
          >
            <div style={{ width: 200 }}>
              <SideSheetDemo
                sx={styles.sideSheet}
                {...props}
                root={rootElement}
                opened={opened}
                onClose={close}
                onOpen={open}
                anchor='left' // FIXME: 'right' is not working
              />
            </div>
            <Stack sx={[styles.main, !opened && styles.main$expanded]}>
              <Button onClick={toggle}>Toggle</Button>
            </Stack>
          </Stack>
        )}
      </div>
    </Frame>
  );
};

export const Standard: IStory = {
  render: (props) => <SideSheetFrame {...props} />,
  args: defaultArgs,
};

export const Detached: IStory = {
  render: (props) => <SideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    variant: 'detached',
  },
};

export default meta;
