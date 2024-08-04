import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IMenuListProps } from './MenuList.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { ListItem } from '../ListItem';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { MenuDivider } from '../MenuDivider';
import { MenuList } from './MenuList';

const meta = {
  component: MenuList,
} satisfies Meta<typeof MenuList>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host$fixedWidth: {
    width: 192,
  },
  section: {
    backgroundColor: colorSchemeTokens.primaryContainer,
    color: colorSchemeTokens.onPrimaryContainer,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 'inherit',
  },
});

const defaultArgs = {
  children: (
    <>
      <ListItem onClick={(...args) => sbHandleEvent('click', args)}>
        Apple
      </ListItem>
      <ListItem onClick={(...args) => sbHandleEvent('click', args)}>
        Banana
      </ListItem>
      <ListItem onClick={(...args) => sbHandleEvent('click', args)}>
        This is a very long and unexpected item
      </ListItem>
      <MenuDivider />
      <ListItem
        onClick={(...args) => sbHandleEvent('click', args)}
        maxLines={1}
      >
        This item will never wrap
      </ListItem>
    </>
  ),
} satisfies Partial<IMenuListProps>;

export const AutoWidth: IStory = {
  render: (props) => <MenuList {...props} />,
  args: defaultArgs,
};

export const FixedWidth: IStory = {
  render: (props) => <MenuList sx={styles.host$fixedWidth} {...props} />,
  args: defaultArgs,
};

export const WithHeaderAndFooter: IStory = {
  render: (props) => <MenuList {...props} />,
  args: {
    ...defaultArgs,
    header: <div {...stylex.props(styles.section)}>Header</div>,
    footer: <div {...stylex.props(styles.section)}>Footer</div>,
  },
};

export const OnlyHeader: IStory = {
  render: (props) => <MenuList {...props} />,
  args: {
    ...defaultArgs,
    header: <div {...stylex.props(styles.section)}>Header</div>,
    children: undefined,
  },
};

export default meta;
