import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { ITextProps } from './Text.types';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '../ComponentShowcase';
import { Text, textTagMap } from './Text';

// https://m3.material.io/styles/Text/overview
// https://material-web.dev/theming/Text/

const meta = {
  component: Text,
} satisfies Meta<typeof Text>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = { dimmed: true } satisfies Partial<ITextProps>;

const LOREM$XS = 'Lorem ipsum dolor sit amet.';
const LOREM$SM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const LOREM$MD =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus pharetra urna in porttitor.';
const LOREM$LG =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia ante et enim tempor pretium. Proin sed sem vehicula, dignissim velit vel, varius turpis. Ut vel ex non lectus iaculis pretium. Nunc at tempus enim. Donec commodo placerat libero.';

const rows: Array<IComponentPresentation<ITextProps>> = [
  {
    legend: `Display (lg) | ${String(textTagMap.display$lg)}`,
    props: {
      variant: 'display',
      size: 'lg',
      children: LOREM$SM,
    },
  },
  {
    legend: `Display (md) | ${String(textTagMap.display$md)}`,
    props: {
      variant: 'display',
      size: 'md',
      children: LOREM$SM,
    },
  },
  {
    legend: `Display (sm) | ${String(textTagMap.display$sm)}`,
    props: {
      variant: 'display',
      size: 'sm',
      children: LOREM$SM,
    },
  },
  {
    legend: `Headline (lg) | ${String(textTagMap.headline$lg)}`,
    props: {
      variant: 'headline',
      size: 'lg',
      children: LOREM$MD,
    },
  },
  {
    legend: `Headline (md) | ${String(textTagMap.headline$md)}`,
    props: {
      variant: 'headline',
      size: 'md',
      children: LOREM$MD,
    },
  },
  {
    legend: `Headline (sm) | | ${String(textTagMap.headline$sm)}`,
    props: {
      variant: 'headline',
      size: 'sm',
      children: LOREM$MD,
    },
  },
  {
    legend: `Title (lg) | ${String(textTagMap.title$lg)}`,
    props: {
      variant: 'title',
      size: 'lg',
      children: LOREM$MD,
    },
  },
  {
    legend: `Title (md) | ${String(textTagMap.title$md)}`,
    props: {
      variant: 'title',
      size: 'md',
      children: LOREM$MD,
    },
  },
  {
    legend: `Title (sm) | ${String(textTagMap.title$sm)}`,
    props: {
      variant: 'title',
      size: 'sm',
      children: LOREM$MD,
    },
  },
  {
    legend: `Body (lg) | ${String(textTagMap.body$lg)}`,
    props: {
      variant: 'body',
      size: 'lg',
      children: LOREM$LG,
    },
  },
  {
    legend: `Body (md) | ${String(textTagMap.body$md)}`,
    props: {
      variant: 'body',
      size: 'md',
      children: LOREM$LG,
    },
  },
  {
    legend: `Body (sm) | ${String(textTagMap.body$sm)}`,
    props: {
      variant: 'body',
      size: 'sm',
      children: LOREM$LG,
    },
  },
  {
    legend: `Label (lg) | ${String(textTagMap.label$lg)}`,
    props: {
      variant: 'label',
      size: 'lg',
      children: LOREM$XS,
    },
  },
  {
    legend: `Label (md) | ${String(textTagMap.label$md)}`,
    props: {
      variant: 'label',
      size: 'md',
      children: LOREM$XS,
    },
  },
  {
    legend: `Label (sm) | ${String(textTagMap.label$sm)}`,
    props: {
      variant: 'label',
      size: 'sm',
      children: LOREM$XS,
    },
  },
];

const styles = stylex.create({
  container: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colorSchemeTokens.outline,
    padding: 16,
  },
  container$lg: {
    maxWidth: `calc(600px * ${scaleTokens.scale})`,
  },
  container$md: {
    maxWidth: `calc(300px * ${scaleTokens.scale})`,
  },
  container$sm: {
    maxWidth: `calc(150px * ${scaleTokens.scale})`,
  },
});

const componentShowcaseStyles = stylex.create({
  host: {
    maxWidth: 1200,
  },
});

export const TypeScale: IStory = {
  render: (props) => (
    <ComponentShowcase
      styles={componentShowcaseStyles}
      component={(props) => (
        <Text {...props}>
          {props.children ??
            (props.variant ? capitalizeFirstLetter(props.variant) : null)}
        </Text>
      )}
      props={props}
      rows={rows}
      horizontalAlign='start'
      rowLegendPosition='top'
    />
  ),
  args: defaultArgs,
};

export const Truncate: IStory = {
  render: (props) => (
    <ComponentShowcase
      styles={componentShowcaseStyles}
      component={Text}
      props={props}
      rows={[
        {
          props: {
            component: (props) => (
              <div {...stylex.props(styles.container, styles.container$lg)}>
                <Text {...props} />
              </div>
            ),
          },
        },
        {
          props: {
            component: (props) => (
              <div {...stylex.props(styles.container, styles.container$md)}>
                <Text {...props} />
              </div>
            ),
          },
        },
        {
          props: {
            component: (props) => (
              <div {...stylex.props(styles.container, styles.container$sm)}>
                <Text {...props} />
              </div>
            ),
          },
        },
      ]}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    children: LOREM$SM,
    truncate: true,
  },
};

export const TruncateLines: IStory = {
  render: (props) => (
    <ComponentShowcase
      styles={componentShowcaseStyles}
      component={(props) => (
        <div {...stylex.props(styles.container, styles.container$sm)}>
          <Text {...props} />
        </div>
      )}
      props={props}
      rows={[
        {
          legend: 'One line',
          props: {
            truncateLines: 1,
          },
        },
        {
          legend: 'Two lines',
          props: {
            truncateLines: 2,
          },
        },
        {
          legend: 'Three lines',
          props: {
            truncateLines: 3,
          },
        },
      ]}
      horizontalAlign='start'
    />
  ),
  args: {
    ...defaultArgs,
    children: LOREM$LG,
  },
};

export default meta;
