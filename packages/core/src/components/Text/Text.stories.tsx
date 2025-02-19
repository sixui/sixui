import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { ITextProps } from './Text.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Text, textTagMap } from './Text';
import { textStoriesStyles } from './Text.stories.css';

const { classNames } = textStoriesStyles;

const meta = {
  component: Text,
} satisfies Meta<typeof Text>;

type IStory = StoryObj<ITextProps>;

const defaultArgs = {} satisfies Partial<ITextProps>;

const LOREM$XS = 'Lorem ipsum dolor sit amet.';
const LOREM$SM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const LOREM$MD =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc faucibus pharetra urna in porttitor.';
const LOREM$LG =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lacinia ante et enim tempor pretium. Proin sed sem vehicula, dignissim velit vel, varius turpis. Ut vel ex non lectus iaculis pretium. Nunc at tempus enim. Donec commodo placerat libero.';

const TypeScaleShowcase = componentShowcaseFactory((props: ITextProps) => (
  <Text {...props}>
    {props.children ?? (props.variant && capitalizeFirstLetter(props.variant))}
  </Text>
));

export const TypeScale: IStory = {
  render: (props) => (
    <TypeScaleShowcase
      props={props}
      rows={[
        {
          legend: `Display (lg) | ${String(textTagMap.display.lg)}`,
          props: {
            variant: 'display',
            scale: 'lg',
            children: LOREM$SM,
          },
        },
        {
          legend: `Display (md) | ${String(textTagMap.display.md)}`,
          props: {
            variant: 'display',
            scale: 'md',
            children: LOREM$SM,
          },
        },
        {
          legend: `Display (sm) | ${String(textTagMap.display.sm)}`,
          props: {
            variant: 'display',
            scale: 'sm',
            children: LOREM$SM,
          },
        },
        {
          legend: `Headline (lg) | ${String(textTagMap.headline.lg)}`,
          props: {
            variant: 'headline',
            scale: 'lg',
            children: LOREM$MD,
          },
        },
        {
          legend: `Headline (md) | ${String(textTagMap.headline.md)}`,
          props: {
            variant: 'headline',
            scale: 'md',
            children: LOREM$MD,
          },
        },
        {
          legend: `Headline (sm) | | ${String(textTagMap.headline.sm)}`,
          props: {
            variant: 'headline',
            scale: 'sm',
            children: LOREM$MD,
          },
        },
        {
          legend: `Title (lg) | ${String(textTagMap.title.lg)}`,
          props: {
            variant: 'title',
            scale: 'lg',
            children: LOREM$MD,
          },
        },
        {
          legend: `Title (md) | ${String(textTagMap.title.md)}`,
          props: {
            variant: 'title',
            scale: 'md',
            children: LOREM$MD,
          },
        },
        {
          legend: `Title (sm) | ${String(textTagMap.title.sm)}`,
          props: {
            variant: 'title',
            scale: 'sm',
            children: LOREM$MD,
          },
        },
        {
          legend: `Body (lg) | ${String(textTagMap.body.lg)}`,
          props: {
            variant: 'body',
            scale: 'lg',
            children: LOREM$LG,
          },
        },
        {
          legend: `Body (md) | ${String(textTagMap.body.md)}`,
          props: {
            variant: 'body',
            scale: 'md',
            children: LOREM$LG,
          },
        },
        {
          legend: `Body (sm) | ${String(textTagMap.body.sm)}`,
          props: {
            variant: 'body',
            scale: 'sm',
            children: LOREM$LG,
          },
        },
        {
          legend: `Label (lg) | ${String(textTagMap.label.lg)}`,
          props: {
            variant: 'label',
            scale: 'lg',
            children: LOREM$XS,
          },
        },
        {
          legend: `Label (md) | ${String(textTagMap.label.md)}`,
          props: {
            variant: 'label',
            scale: 'md',
            children: LOREM$XS,
          },
        },
        {
          legend: `Label (sm) | ${String(textTagMap.label.sm)}`,
          props: {
            variant: 'label',
            scale: 'sm',
            children: LOREM$XS,
          },
        },
      ]}
      horizontalAlign="start"
      rowLegendPosition="top"
    />
  ),
  args: defaultArgs,
};

const TruncatedShowcase = componentShowcaseFactory(Text);

export const Truncated: IStory = {
  render: (props) => (
    <TruncatedShowcase
      className={classNames.truncatedContainer}
      props={props}
      rows={[
        {
          props: {
            as: (props) => (
              <div className={classNames.container} data-size="lg">
                <Text {...props} />
              </div>
            ),
          },
        },
        {
          props: {
            as: (props) => (
              <div className={classNames.container} data-size="md">
                <Text {...props} />
              </div>
            ),
          },
        },
        {
          props: {
            as: (props) => (
              <div className={classNames.container} data-size="sm">
                <Text {...props} />
              </div>
            ),
          },
        },
      ]}
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    children: LOREM$SM,
    truncate: true,
  },
};

const LineClampedShowcase = componentShowcaseFactory((props: ITextProps) => (
  <div className={classNames.container} data-size="sm">
    <Text {...props} />
  </div>
));

export const LineClamped: IStory = {
  render: (props) => (
    <LineClampedShowcase
      className={classNames.truncatedContainer}
      props={props}
      rows={[
        {
          legend: 'One line',
          props: {
            lineClamp: 1,
          },
        },
        {
          legend: 'Two lines',
          props: {
            lineClamp: 2,
          },
        },
        {
          legend: 'Three lines',
          props: {
            lineClamp: 3,
          },
        },
      ]}
      horizontalAlign="start"
    />
  ),
  args: {
    ...defaultArgs,
    children: LOREM$LG,
  },
};

export default meta;
