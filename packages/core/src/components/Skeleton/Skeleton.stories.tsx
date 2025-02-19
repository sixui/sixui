import type { Meta, StoryObj } from '@storybook/react';

import type { ISkeletonProps } from './Skeleton.types';
import { Avatar } from '~/components/Avatar';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Paper } from '~/components/Paper';
import { Text } from '~/components/Text';
import { Skeleton } from './Skeleton';

const meta = {
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

type IStory = StoryObj<typeof meta>;

const AVATAR_IMAGE_URL_1 =
  'https://avatars.githubusercontent.com/u/2182039?v=4&s=256';

const defaultArgs = {} satisfies Partial<ISkeletonProps>;

const SkeletonShowcase = componentShowcaseFactory(Skeleton);

export const AsContainer: IStory = {
  render: (props) => (
    <SkeletonShowcase
      horizontalAlign="start"
      props={props}
      verticalAlign="center"
      cols={[
        { legend: 'Loading (not animated)', props: { animation: false } },
        { legend: 'Loading (pulse)', props: { animation: 'pulse' } },
        { legend: 'Loading (wave)', props: { animation: 'wave' } },
        { legend: 'Loaded', props: { loaded: true } },
      ]}
      rows={[
        {
          legend: 'Avatar',
          props: {
            children: <Avatar src={AVATAR_IMAGE_URL_1} />,
            variant: 'circular',
          },
        },
        {
          legend: 'Text (large)',
          props: {
            children: (
              <Text variant="display" scale="lg">
                Large text
              </Text>
            ),
          },
        },
        {
          legend: 'Text (medium)',
          props: {
            children: (
              <Text variant="title" scale="lg">
                Medium text
              </Text>
            ),
          },
        },
        {
          legend: 'Text (small)',
          props: {
            children: (
              <Text variant="label" scale="sm">
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

const SkeletonAsOverlay: React.FC<ISkeletonProps> = (props) => (
  <Paper
    style={{
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    w="$24"
    h="$24"
    outline="$xs"
    shape="$md"
  >
    <Skeleton {...props} />
  </Paper>
);

const SkeletonAsOverlayShowcase = componentShowcaseFactory(SkeletonAsOverlay);

export const AsOverlay: IStory = {
  render: (props) => (
    <SkeletonAsOverlayShowcase
      props={props}
      cols={[
        { legend: 'Loading (not animated)', props: { animation: false } },
        { legend: 'Loading (pulse)', props: { animation: 'pulse' } },
        { legend: 'Loading (wave)', props: { animation: 'wave' } },
        { legend: 'Loaded', props: { loaded: true } },
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
          props: { variant: 'rectangular', length: 3 },
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
