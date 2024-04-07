import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IStepConnectorStyleKey } from '@/components/atoms/StepConnector';
import { colorRolesVars } from '../vars/colorRoles.stylex';
import { componentVars as vars } from './StepConnector.stylex';

// FIXME: use vars

type IStepConnectorStyles = IStyles<IStepConnectorStyleKey>;
export const styles: MapNamespaces<IStepConnectorStyles> =
  stylex.create<IStepConnectorStyles>({
    host: {
      flexGrow: 1,
    },
    host$horizontal: {},
    host$vertical: {
      marginLeft: 8 + 12,
    },
    host$rightLabel: {},
    host$bottomLabel: {
      position: 'absolute',
      top: 8 + 12,
      left: 'calc(-50% + 20px)',
      right: 'calc(50% + 20px)',
    },
    line: {
      borderColor: colorRolesVars.outlineVariant,
      display: 'block',
    },
    line$horizontal: {
      borderTopStyle: 'solid',
      borderTopWidth: 1,
    },
    line$vertical: {
      borderLeftStyle: 'solid',
      borderLeftWidth: 1,
      minHeight: 24,
    },
  });
