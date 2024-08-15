import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { createSequence } from '@olivierpascal/helpers';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import type { IModalSideSheetProps } from './ModalSideSheet.types';
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
import { ModalSideSheet } from './ModalSideSheet';

// https://m3.material.io/components/modalSideSheets/overview
// https://material-web.dev/components/modalSideSheet/
// https://github.com/material-components/material-web/blob/main/modalSideSheet/demo/stories.ts

const meta = {
  component: ModalSideSheet,
} satisfies Meta<IModalSideSheetProps>;

type IStory = StoryObj<IModalSideSheetProps>;

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
  children: ({ close }) => (
    <Stack sx={styles.content}>
      {createSequence(5).map((index) => (
        <ListItem key={index} onClick={close}>
          Item {index + 1}
        </ListItem>
      ))}
    </Stack>
  ),
} satisfies Partial<IModalSideSheetProps>;

const ModalSideSheetFrame: React.FC<IModalSideSheetProps> = (props) => {
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
          <ModalSideSheet
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
          />
          <ModalSideSheet
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
          />
        </Stack>
      </div>
    </Frame>
  );
};

export const Standard: IStory = {
  render: (props) => <ModalSideSheetFrame {...props} />,
  args: defaultArgs,
};

export const Detached: IStory = {
  render: (props) => <ModalSideSheetFrame {...props} />,
  args: {
    ...defaultArgs,
    variant: 'detached',
  },
};

export default meta;
