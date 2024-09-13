import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { ISkeletonProps } from './Skeleton.types';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';
import { ComponentShowcase } from '../ComponentShowcase';
import { Avatar } from '../Avatar';
import { Text } from '../Text';
import { Skeleton } from './Skeleton';

const meta = {
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ISkeletonProps>;

const styles = stylex.create({
  overlayContainer: {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: `calc(100px * ${scaleTokens.scale})`,
    height: `calc(100px * ${scaleTokens.scale})`,
    borderWidth: outlineTokens.width$xs,
    borderStyle: 'solid',
    borderColor: colorSchemeTokens.outline,
    borderRadius: shapeTokens.corner$md,
  },
});

export const AsContainer: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Skeleton}
      horizontalAlign='start'
      props={props}
      cols={[
        { legend: 'Loading (not animated)', props: { animation: false } },
        { legend: 'Loading (pulse)', props: { animation: 'pulse' } },
        { legend: 'Loading (wave)', props: { animation: 'wave' } },
        { legend: 'Loaded', props: { loaded: true } },
        { legend: 'Error', props: { hasError: true } },
      ]}
      rows={[
        {
          legend: 'Avatar',
          props: { children: <Avatar />, variant: 'circular' },
        },
        {
          legend: 'Text (large)',
          props: {
            children: (
              <Text variant='display' scale='lg'>
                Large text
              </Text>
            ),
          },
        },
        {
          legend: 'Text (medium)',
          props: {
            children: (
              <Text variant='title' scale='lg'>
                Medium text
              </Text>
            ),
          },
        },
        {
          legend: 'Text (small)',
          props: {
            children: (
              <Text variant='label' scale='sm'>
                Small text
              </Text>
            ),
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export const AsOverlay: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <div {...stylex.props(styles.overlayContainer)}>
          <Skeleton {...props} />
        </div>
      )}
      props={props}
      cols={[
        { legend: 'Loading (not animated)', props: { animation: false } },
        { legend: 'Loading (pulse)', props: { animation: 'pulse' } },
        { legend: 'Loading (wave)', props: { animation: 'wave' } },
        { legend: 'Loaded', props: { loaded: true } },
        { legend: 'Error', props: { hasError: true } },
      ]}
      rows={[
        {
          legend: 'Overlay',
          props: { variant: 'overlay' },
        },
        {
          legend: 'Rectangular',
          props: { variant: 'rectangular' },
        },
        {
          legend: 'Rectangular with length',
          props: { variant: 'rectangular', length: 2 },
        },
        {
          legend: 'Rectangular with content',
          props: { variant: 'rectangular', children: 'Two words' },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
