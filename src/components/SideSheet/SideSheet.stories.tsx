import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { createSequence } from '@olivierpascal/helpers';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import type { ISideSheetProps } from './SideSheet.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { Button } from '../Button';
import { ListItem } from '../ListItem';
import { Stack } from '../Stack';
import { IconButton } from '../IconButton';
import { Frame } from '../Frame';
import { SideSheet } from './SideSheet';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';

// https://m3.material.io/components/sideSheets/overview
// https://material-web.dev/components/sideSheet/
// https://github.com/material-components/material-web/blob/main/sideSheet/demo/stories.ts

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
  content: {
    minWidth: `calc(300px * ${scaleTokens.scale})`,
    paddingLeft: spacingTokens.padding$4,
    paddingRight: spacingTokens.padding$4,
  },
});

const defaultArgs = {
  onOpenChange: (...args) => void sbHandleEvent('openChange', args),
  headline: 'Title',
  showCloseButton: true,
  leadingActions: <IconButton icon={<FontAwesomeIcon icon={faArrowLeft} />} />,
  bottomActions: ({ close }) => (
    <>
      <Button onClick={close}>Save</Button>
      <Button variant='outlined' onClick={close}>
        Cancel
      </Button>
    </>
  ),
  trigger: ({ setRef, getProps }) => (
    <Button {...getProps()} ref={setRef}>
      Open
    </Button>
  ),
  children: ({ close }) => (
    <Stack sx={styles.content}>
      {createSequence(5).map((index) => (
        <ListItem key={index} onClick={close}>
          Item {index + 1}
        </ListItem>
      ))}
    </Stack>
  ),
} satisfies Partial<ISideSheetProps>;

const Test: React.FC<ISideSheetProps> = (props) => {
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null);

  return (
    <Frame importParentStyles sx={styles.frame}>
      <div ref={setRootElement}>
        <SideSheet {...props} root={rootElement} />
      </div>
    </Frame>
  );
};

export const Standard: IStory = {
  render: (props) => <Test {...props} />,
  args: defaultArgs,
};

export const Modal: IStory = {
  render: (props) => <SideSheet {...props} />,
  args: {
    ...defaultArgs,
    modal: true,
  },
};

export const Detached: IStory = {
  render: (props) => <SideSheet {...props} />,
  args: {
    ...defaultArgs,
    modal: true,
    variant: 'detached',
  },
};

export default meta;
