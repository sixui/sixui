import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IPaperProps, IPaperVariant } from './Paper.types';
import {
  type IComponentPresentation,
  ComponentShowcase,
} from '@/components/utils/ComponentShowcase';
import { Typography } from '@/components/atoms/Typography';
import { Paper } from './Paper';

// https://material.io/blog/tone-based-surface-color-m3
// https://m3.material.io/styles/elevation/overview

const meta = {
  component: Paper,
} satisfies Meta<typeof Paper>;

type IStory = StoryObj<typeof meta>;

const variants: Array<IComponentPresentation<IPaperProps>> = [
  { legend: 'Filled' },
  { legend: 'Outlined', props: { variant: 'outlined' } },
];

const paperStyles = stylex.create({
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
  styles: paperStyles,
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

export const Variants: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PaperWithContent}
      props={props}
      cols={(['filled', 'outlined'] as Array<IPaperVariant>).map((variant) => ({
        props: {
          variant,
          children: capitalizeFirstLetter(variant),
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export const Corners: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PaperWithContent}
      props={props}
      cols={variants}
      rows={[
        { legend: 'Rounded' },
        { legend: 'Square', props: { square: true } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const Elevations: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PaperWithContent}
      props={props}
      cols={variants}
      rows={[
        { legend: 'Level 0', props: { elevation: 0 } },
        { legend: 'Level 1', props: { elevation: 1 } },
        { legend: 'Level 2', props: { elevation: 2 } },
        { legend: 'Level 3', props: { elevation: 3 } },
        { legend: 'Level 4', props: { elevation: 4 } },
        { legend: 'Level 5', props: { elevation: 5 } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
