import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { createSequence } from '@olivierpascal/helpers';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import type { IDrawerProps } from './Drawer.types';
import type { IOmit } from '~/helpers/types';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Button } from '../Button';
import { ListItem } from '../ListItem';
import { Stack } from '../Stack';
import { IconButton } from '../IconButton';
import { Frame } from '../Frame';
import {
  SideSheetContent,
  type ISideSheetContentProps,
} from '../SideSheetContent';
import { Drawer } from './Drawer';

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
    padding: spacingTokens.padding$4,
  },
  content: {
    minWidth: `calc(300px * ${scaleTokens.scale})`,
    paddingLeft: spacingTokens.padding$4,
    paddingRight: spacingTokens.padding$4,
  },
});

const defaultArgs = {
  onOpenChange: (...args) => void sbHandleEvent('openChange', args),
} satisfies Partial<IDrawerProps>;

const DrawerContent: React.FC<IOmit<ISideSheetContentProps, 'children'>> = (
  props,
) => (
  <SideSheetContent
    {...props}
    variant='modal'
    headline='Title'
    showCloseButton
    leadingActions={
      <IconButton icon={<FontAwesomeIcon icon={faArrowLeft} />} />
    }
    bottomActions={({ close }) => (
      <>
        <Button onClick={close}>Save</Button>
        <Button variant='outlined' onClick={close}>
          Cancel
        </Button>
      </>
    )}
  >
    <Stack sx={styles.content}>
      {createSequence(5).map((index) => (
        <ListItem key={index} onClick={close}>
          Item {index + 1}
        </ListItem>
      ))}
    </Stack>
  </SideSheetContent>
);

const DrawerFrame: React.FC<IDrawerProps> = (props) => {
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

  return (
    <Frame importParentStyles sx={styles.frame}>
      <div ref={setRootElement}>
        <Stack
          horizontal
          justify='space-between'
          gap={2}
          sx={styles.frameInner}
        >
          <Drawer
            {...props}
            anchor='left'
            root={rootElement}
            trigger={({ setRef, getProps }) => (
              <Button
                {...getProps()}
                ref={setRef}
                icon={<FontAwesomeIcon icon={faArrowLeft} />}
              >
                Open left
              </Button>
            )}
          >
            {({ close }) => <DrawerContent anchor='left' onClose={close} />}
          </Drawer>
          <Drawer
            {...props}
            anchor='right'
            root={rootElement}
            trigger={({ setRef, getProps }) => (
              <Button
                {...getProps()}
                ref={setRef}
                icon={<FontAwesomeIcon icon={faArrowRight} />}
                trailingIcon
              >
                Open right
              </Button>
            )}
          >
            {({ close }) => <DrawerContent anchor='right' onClose={close} />}
          </Drawer>
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
