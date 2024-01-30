import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { type ITypographyProps, Typography } from './Typography';

// https://m3.material.io/styles/typography/overview
// https://material-web.dev/theming/typography/

const meta = {
  component: Typography,
} satisfies Meta<typeof Typography>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ITypographyProps>;

const styles = stylex.create({
  host: {
    width: '800px',
  },
  flex: {
    display: 'flex',
  },
  flexCol: {
    flexDirection: 'column',
  },
  grow: {
    flexGrow: 1,
    flexBasis: 0,
  },
  gapX: {
    columnGap: '0.75rem',
  },
  gapY: {
    rowGap: '0.75rem',
  },
});

const variantStyles = stylex.create({
  host: {
    backgroundColor: colorRolesVars.onSecondary,
    color: colorRolesVars.secondary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colorRolesVars.outline,
    borderRadius: shapeVars.corner$sm,
    padding: '0.5rem',
  },
  sizeLabel: {
    width: '1.4rem',
    height: '1.4rem',
    backgroundColor: colorRolesVars.tertiaryContainer,
    color: colorRolesVars.onTertiaryContainer,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: shapeVars.corner$xs,
  },
  flex: {
    display: 'flex',
  },
  flexCol: {
    flexDirection: 'column',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  itemsStart: {
    alignItems: 'flex-start',
  },
  gapX: {
    columnGap: '0.5rem',
  },
  gapY: {
    columnGap: '1rem',
  },
});

const sizes: Required<Array<ITypographyProps['size']>> = ['lg', 'md', 'sm'];

const Variant: React.FC<ITypographyProps> = (props) => (
  <div {...stylex.props(variantStyles.host)}>
    <div
      {...stylex.props(
        variantStyles.flex,
        variantStyles.flexCol,
        variantStyles.itemsStart,
        variantStyles.gapY,
      )}
    >
      <div
        {...stylex.props(
          variantStyles.flex,
          variantStyles.itemsCenter,
          variantStyles.gapX,
        )}
      >
        <Typography {...props}>
          {props?.variant ? capitalizeFirstLetter(props.variant) : null}
        </Typography>

        <div {...stylex.props(variantStyles.sizeLabel)}>
          <Typography variant='label' size='md' noMargin>
            {props.size?.toUpperCase()}
          </Typography>
        </div>
      </div>
    </div>
  </div>
);

const Variants: React.FC<ITypographyProps> = (props) =>
  sizes.map((size) => <Variant key={size} {...props} size={size} />);

const TypeScaleDemo: React.FC<ITypographyProps> = (props) => (
  <div {...stylex.props(styles.host)}>
    <div {...stylex.props(styles.flex, styles.gapX)}>
      <div
        {...stylex.props(styles.flex, styles.flexCol, styles.grow, styles.gapY)}
      >
        <Variants {...props} variant='display' />
      </div>
      <div
        {...stylex.props(styles.flex, styles.flexCol, styles.grow, styles.gapY)}
      >
        <Variants {...props} variant='headline' />
      </div>

      <div
        {...stylex.props(styles.flex, styles.flexCol, styles.grow, styles.gapY)}
      >
        <Variants {...props} variant='title' />
      </div>
      <div
        {...stylex.props(styles.flex, styles.flexCol, styles.grow, styles.gapY)}
      >
        <Variants {...props} variant='body' />
      </div>
      <div
        {...stylex.props(styles.flex, styles.flexCol, styles.grow, styles.gapY)}
      >
        <Variants {...props} variant='label' />
      </div>
    </div>
  </div>
);

export const TypeScale: IStory = {
  render: (props) => <TypeScaleDemo {...props} />,
  args: {
    ...defaultArgs,
    noMargin: true,
  },
};

export default meta;
