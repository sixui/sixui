import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IPaperProps } from './Paper.types';
import { ComponentShowcase } from '~/components/ComponentShowcase';
import { Typography } from '~/components/Typography';
import { Paper } from './Paper';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

// https://material.io/blog/tone-based-surface-color-m3
// https://m3.material.io/styles/elevation/overview

const meta = {
  component: Paper,
} satisfies Meta<typeof Paper>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 192,
  },
});

const paperContentStyles = stylex.create({
  content: {
    minHeight: '128px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    justifyContent: 'flex-end',
    padding: '16px',
    gap: '16px',
  },
});

const defaultArgs = {
  sx: styles.host,
} satisfies Partial<IPaperProps>;

const PaperWithContent: React.FC<IPaperProps> = ({ children, ...props }) => (
  <Paper {...props}>
    <div {...stylex.props(paperContentStyles.content)}>
      <Typography variant='body' size='md'>
        {children}
      </Typography>
    </div>
  </Paper>
);

export const Corners: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PaperWithContent}
      props={props}
      rows={(
        [undefined, 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as Array<
          IPaperProps['corner']
        >
      ).map((corner) => ({
        legend: `Corner (${corner ?? 'none'})`,
        props: {
          outlined: true,
          corner,
          children: capitalizeFirstLetter(`Corner ${corner ?? 'square'}`),
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

export const SurfaceContainer: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PaperWithContent}
      props={props}
      rows={(
        [
          undefined,
          'lowest',
          'low',
          'medium',
          'high',
          'highest',
          'inverse',
          'primary',
          'secondary',
          'tertiary',
          'error',
        ] as Array<IPaperProps['surface']>
      ).map((surface) => ({
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
