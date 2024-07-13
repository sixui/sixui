import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IDividerProps } from './Divider.types';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { Divider } from './Divider';

// https://m3.material.io/components/divider/
// https://material-web.dev/components/divider/
// https://github.com/material-components/material-web/blob/main/divider/demo/stories.ts

const meta = {
  component: Divider,
} satisfies Meta<typeof Divider>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDividerProps>;

const styles = stylex.create({
  ul: {
    borderWidth: '1px',
    borderStyle: 'dashed',
    borderColor: colorRolesVars.outlineVariant,
    margin: 0,
    padding: 0,
    width: '256px',
  },
  li: {
    color: colorRolesVars.onSurface,
    fontFamily: 'system-ui',
    listStyle: 'none',
    margin: '16px',
  },
});

const List: React.FC<IDividerProps> = (props) => (
  <ul
    {...stylex.props(styles.ul)}
    aria-label='A list of items with decorative and non-decorative separators'
  >
    <li {...stylex.props(styles.li)}>List item one</li>
    <Divider {...props} />
    <li {...stylex.props(styles.li)}>List item two</li>
    <Divider {...props} />
    <li {...stylex.props(styles.li)}>List item three</li>
    <Divider {...props} />
    <li {...stylex.props(styles.li)}>List item four</li>
  </ul>
);

export const Basic: IStory = {
  render: (props) => <List {...props} />,
  args: defaultArgs,
};

export const Inset: IStory = {
  render: (props) => <List {...props} />,
  args: {
    ...defaultArgs,
    inset: true,
  },
};

export const InsetStart: IStory = {
  render: (props) => <List {...props} />,
  args: {
    ...defaultArgs,
    insetStart: true,
  },
};

export const InsetEnd: IStory = {
  render: (props) => <List {...props} />,
  args: {
    ...defaultArgs,
    insetEnd: true,
  },
};

export const WithText: IStory = {
  render: (props) => <List {...props} />,
  args: {
    ...defaultArgs,
    children: 'or',
  },
};

export default meta;
