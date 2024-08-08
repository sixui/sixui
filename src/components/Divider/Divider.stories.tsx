import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IDividerProps } from './Divider.types';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { Divider } from './Divider';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';

// https://m3.material.io/components/divider/
// https://material-web.dev/components/divider/
// https://github.com/material-components/material-web/blob/main/divider/demo/stories.ts

const meta = {
  component: Divider,
} satisfies Meta<typeof Divider>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IDividerProps>;

const styles = stylex.create({
  list: {
    borderWidth: outlineTokens.width$xs,
    borderStyle: 'dashed',
    borderColor: colorSchemeTokens.outlineVariant,
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    gap: spacingTokens.padding$4,
  },
  list$horizontal: {
    flexDirection: 'row',
    paddingLeft: spacingTokens.padding$4,
    paddingRight: spacingTokens.padding$4,
    height: `calc(64px * ${scaleTokens.scale})`,
  },
  list$vertical: {
    flexDirection: 'column',
    paddingTop: spacingTokens.padding$4,
    paddingBottom: spacingTokens.padding$4,
    width: `calc(64px * ${scaleTokens.scale})`,
  },
});

const List: React.FC<IDividerProps> = (props) => (
  <div
    {...stylex.props(
      styles.list,
      styles[
        `list$${props.orientation === 'vertical' ? 'horizontal' : 'vertical'}`
      ],
    )}
  >
    <div>One</div>
    <Divider {...props} />
    <div>Two</div>
    <Divider {...props} />
    <div>Three</div>
    <Divider {...props} />
    <div>Four</div>
  </div>
);

const cols: Array<IComponentPresentation<IDividerProps>> = [
  {
    legend: 'Horizontal',
    props: {
      orientation: 'horizontal',
    },
  },
  {
    legend: 'Vertical',
    props: {
      orientation: 'vertical',
    },
  },
];

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <List {...props} />}
      props={props}
      cols={cols}
    />
  ),
  args: defaultArgs,
};

export const Inset: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <List {...props} />}
      props={props}
      cols={cols}
    />
  ),
  args: {
    ...defaultArgs,
    inset: true,
  },
};

export const InsetStart: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <List {...props} />}
      props={props}
      cols={cols}
    />
  ),
  args: {
    ...defaultArgs,
    insetStart: true,
  },
};

export const InsetEnd: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <List {...props} />}
      props={props}
      cols={cols}
    />
  ),
  args: {
    ...defaultArgs,
    insetEnd: true,
  },
};

export const WithText: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => <List {...props} />}
      props={props}
      cols={cols}
    />
  ),
  args: {
    ...defaultArgs,
    children: 'or',
  },
};

export default meta;
