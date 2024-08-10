import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IPaperProps } from './Paper.types';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { ComponentShowcase } from '../ComponentShowcase';
import { Text } from '../Text';
import { Paper } from './Paper';

// https://material.io/blog/tone-based-surface-color-m3
// https://m3.material.io/styles/elevation/overview

const meta = {
  component: Paper,
} satisfies Meta<typeof Paper>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: `calc(192px * ${scaleTokens.scale})`,
  },
});

const paperContentStyles = stylex.create({
  content: {
    minHeight: `calc(128px * ${scaleTokens.scale})`,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    justifyContent: 'flex-end',
    padding: spacingTokens.padding$4,
  },
});

const defaultArgs = {
  sx: styles.host,
} satisfies Partial<IPaperProps>;

const PaperWithContent: React.FC<IPaperProps> = ({ children, ...props }) => (
  <Paper {...props}>
    <div {...stylex.props(paperContentStyles.content)}>
      <Text variant='body' size='md'>
        {children}
      </Text>
    </div>
  </Paper>
);

const corners: Array<IPaperProps['corner']> = [
  undefined,
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
];

export const Corners: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PaperWithContent}
      props={props}
      rows={corners.map((corner) => ({
        legend: `Corner (${(corner as string) ?? 'none'})`,
        props: {
          outlined: true,
          corner,
          children: capitalizeFirstLetter(
            `Corner ${(corner as string) ?? 'square'}`,
          ),
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export const Elevations: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PaperWithContent}
      props={props}
      rows={([undefined, 1, 2, 3, 4, 5] as Array<IPaperProps['elevation']>).map(
        (elevation) => ({
          legend: `Level (${elevation})`,
          props: {
            elevation,
            children: capitalizeFirstLetter(`Level ${elevation ?? '0'}`),
          },
        }),
      )}
    />
  ),
  args: {
    ...defaultArgs,
    corner: 'md',
  },
};

const surfaces: Array<IPaperProps['surface']> = [
  undefined,
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'inverseSurface',
  'primaryContainer',
  'secondaryContainer',
  'tertiaryContainer',
  'errorContainer',
];

export const Surface: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PaperWithContent}
      props={props}
      rows={surfaces.map((surface) => ({
        legend: `Surface (${surface})`,
        props: {
          surface,
          children: capitalizeFirstLetter(surface ?? 'None'),
        },
      }))}
    />
  ),
  args: {
    ...defaultArgs,
    corner: 'md',
  },
};

export default meta;
