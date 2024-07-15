import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { ISkeletonProps } from './Skeleton.types';
import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { Avatar } from '@/components/atoms/Avatar';
import { Typography } from '@/components/atoms/Typography';
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
    width: 100,
    height: 100,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorRolesVars.outline,
  },
});

export const AsContainer: IStory = {
  render: (props) => (
    <ComponentShowcase
      horizontalAlign='start'
      component={Skeleton}
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
              <Typography variant='display' size='lg'>
                Large text
              </Typography>
            ),
          },
        },
        {
          legend: 'Text (medium)',
          props: {
            children: (
              <Typography variant='title' size='lg'>
                Medium text
              </Typography>
            ),
          },
        },
        {
          legend: 'Text (small)',
          props: {
            children: (
              <Typography variant='label' size='sm'>
                Small text
              </Typography>
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
