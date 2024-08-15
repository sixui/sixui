import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { createSequence } from '@olivierpascal/helpers';
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
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Button, IButtonProps } from '../Button';
import { ListItem } from '../ListItem';
import { Stack } from '../Stack';
import { Frame } from '../Frame';
import { SideSheetContent } from '../SideSheetContent';
import { Drawer } from './Drawer';
import { Placeholder } from '../Placeholder';

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
  content: {
    minWidth: `calc(300px * ${scaleTokens.scale})`,
    paddingLeft: spacingTokens.padding$4,
    paddingRight: spacingTokens.padding$4,
  },
  column: {
    height: '100%',
  },
  drawer: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const defaultArgs = {
  onOpenChange: (...args) => void sbHandleEvent('openChange', args),
} satisfies Partial<IDrawerProps>;

type IDrawerDemo = IOmit<IDrawerProps, 'children'> &
  Pick<IButtonProps, 'icon' | 'trailingIcon'>;

const DrawerDemo: React.FC<IDrawerDemo> = (props) => {
  const { icon, trailingIcon, anchor = 'left', ...other } = props;

  return (
    <Drawer
      sx={styles.drawer}
      {...other}
      anchor={anchor}
      trigger={({ setRef, getProps }) => (
        <Button
          {...getProps()}
          ref={setRef}
          icon={icon}
          trailingIcon={trailingIcon}
          variant='text'
        >
          Open {props.anchor}
        </Button>
      )}
    >
      <Placeholder
        label='Did you open the drawer?'
        corner='none'
        width={160}
        height={160}
      />
    </Drawer>
  );
};

const DrawerFrame: React.FC<IDrawerProps> = (props) => {
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

  return (
    <Frame importParentStyles sx={styles.frame}>
      <div ref={setRootElement}>
        <Stack horizontal justify='space-between' sx={styles.frameInner}>
          <DrawerDemo
            {...props}
            root={rootElement}
            anchor='left'
            icon={<FontAwesomeIcon icon={faArrowLeft} />}
          />
          <Stack justify='space-between' align='center' sx={styles.column}>
            <DrawerDemo
              {...props}
              root={rootElement}
              anchor='top'
              icon={<FontAwesomeIcon icon={faArrowUp} />}
            />
            <DrawerDemo
              {...props}
              root={rootElement}
              anchor='bottom'
              icon={<FontAwesomeIcon icon={faArrowDown} />}
            />
          </Stack>
          <DrawerDemo
            {...props}
            root={rootElement}
            anchor='right'
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            trailingIcon
          />
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
