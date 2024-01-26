import React from 'react';
import * as stylex from '@stylexjs/stylex';

import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import {
  type ITypescaleUsage,
  type ITypescaleSize,
  typescaleVars,
} from '@/themes/base/vars/typo.stylex';

export interface IColorBoxProps {
  label: string;
  usage: ITypescaleUsage;
  size: ITypescaleSize;
}

const styles = stylex.create({
  host: {
    backgroundColor: colorRolesVars.onSecondary,
    color: colorRolesVars.secondary,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: colorRolesVars.outline,
    borderRadius: shapeVars.corner$sm,
    padding: '0.5rem',
  },
  font: (usage: ITypescaleUsage, size: ITypescaleSize) => ({
    fontFamily: typescaleVars[`${usage}Font$${size}`],
    fontSize: typescaleVars[`${usage}Size$${size}`],
    fontWeight: typescaleVars[`${usage}Weight$${size}`],
    lineHeight: typescaleVars[`${usage}LineHeight$${size}`],
    letterSpacing: typescaleVars[`${usage}Tracking$${size}`],
  }),
  sizeLabel: {
    fontFamily: typescaleVars.labelFont$md,
    fontSize: typescaleVars.labelSize$md,
    fontWeight: typescaleVars.labelWeight$md,
    lineHeight: typescaleVars.labelLineHeight$md,
    letterSpacing: typescaleVars.labelTracking$md,
    width: '1.125rem',
    height: '1.125rem',
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

export const TypographyBox: React.FC<IColorBoxProps> = ({
  label,
  usage,
  size,
}) => (
  <div {...stylex.props(styles.host, styles.font(usage, size))}>
    <div
      {...stylex.props(
        styles.flex,
        styles.flexCol,
        styles.itemsStart,
        styles.gapY,
      )}
    >
      <div {...stylex.props(styles.flex, styles.itemsCenter, styles.gapX)}>
        {label}
        <div {...stylex.props(styles.sizeLabel)}>{size[0].toUpperCase()}</div>
      </div>
    </div>
  </div>
);
