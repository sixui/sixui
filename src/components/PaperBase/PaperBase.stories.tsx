import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IPaperBaseProps, IPaperBaseVariant } from './PaperBase.types';
import { ComponentShowcase } from '~/components/ComponentShowcase';
import { Typography } from '~/components/Typography';
import { PaperBase } from './PaperBase';
import { paperBaseTokens } from './PaperBase.stylex';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { elevationTokens } from '../Elevation/Elevation.stylex';

// https://material.io/blog/tone-based-surface-color-m3
// https://m3.material.io/styles/elevation/overview

const meta = {
  component: PaperBase,
} satisfies Meta<typeof PaperBase>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    width: 192,
  },
  host$filled: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.surfaceContainer,
  },
  host$elevated: {
    [paperBaseTokens.containerColor]: colorSchemeTokens.surfaceContainer,
    [paperBaseTokens.containerElevation]: elevationTokens.boxShadow$level1,
  },
  host$outlined: {
    [paperBaseTokens.outlineStyle]: 'solid',
  },
});

const paperBaseContentStyles = stylex.create({
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

const defaultArgs = {} satisfies Partial<IPaperBaseProps>;

const PaperBaseWithContent: React.FC<IPaperBaseProps> = ({
  children,
  ...props
}) => (
  <PaperBase {...props}>
    <div {...stylex.props(paperBaseContentStyles.content)}>
      <Typography variant='body' size='md'>
        {children}
      </Typography>
    </div>
  </PaperBase>
);

export const Configurations: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={PaperBaseWithContent}
      props={props}
      cols={(
        ['filled', 'elevated', 'outlined'] as Array<IPaperBaseVariant>
      ).map((variant) => ({
        props: {
          children: capitalizeFirstLetter(variant),
          sx: [styles.host, styles[`host$${variant}`]],
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export default meta;
