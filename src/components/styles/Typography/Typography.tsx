import React from 'react';
import * as stylex from '@stylexjs/stylex';

import { typescaleVars } from '@/themes/base/vars/typo.stylex';
import { TypographyBox } from './TypographyBox';

export interface ITypographyProps {}

const styles = stylex.create({
  host: {
    fontFamily: typescaleVars.labelFont$md,
    fontSize: typescaleVars.labelSize$md,
    fontWeight: typescaleVars.labelWeight$md,
    lineHeight: typescaleVars.labelLineHeight$md,
    letterSpacing: typescaleVars.labelTracking$md,
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

export const Typography: React.FC<ITypographyProps> = () => {
  return (
    <div {...stylex.props(styles.host)}>
      <div {...stylex.props(styles.flex, styles.gapX)}>
        <div
          {...stylex.props(
            styles.flex,
            styles.flexCol,
            styles.grow,
            styles.gapY,
          )}
        >
          <TypographyBox label='Display' usage='display' size='lg' />
          <TypographyBox label='Display' usage='display' size='md' />
          <TypographyBox label='Display' usage='display' size='sm' />
        </div>
        <div
          {...stylex.props(
            styles.flex,
            styles.flexCol,
            styles.grow,
            styles.gapY,
          )}
        >
          <TypographyBox label='Headline' usage='headline' size='lg' />
          <TypographyBox label='Headline' usage='headline' size='md' />
          <TypographyBox label='Headline' usage='headline' size='sm' />
        </div>

        <div
          {...stylex.props(
            styles.flex,
            styles.flexCol,
            styles.grow,
            styles.gapY,
          )}
        >
          <TypographyBox label='Title' usage='title' size='lg' />
          <TypographyBox label='Title' usage='title' size='md' />
          <TypographyBox label='Title' usage='title' size='sm' />
        </div>
        <div
          {...stylex.props(
            styles.flex,
            styles.flexCol,
            styles.grow,
            styles.gapY,
          )}
        >
          <TypographyBox label='Body' usage='body' size='lg' />
          <TypographyBox label='Body' usage='body' size='md' />
          <TypographyBox label='Body' usage='body' size='sm' />
        </div>
        <div
          {...stylex.props(
            styles.flex,
            styles.flexCol,
            styles.grow,
            styles.gapY,
          )}
        >
          <TypographyBox label='Label' usage='label' size='lg' />
          <TypographyBox label='Label' usage='label' size='md' />
          <TypographyBox label='Label' usage='label' size='sm' />
        </div>
      </div>
    </div>
  );
};
