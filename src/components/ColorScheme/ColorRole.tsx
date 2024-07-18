import stylex from '@stylexjs/stylex';

import type { IColorRoleProps } from './ColorRole.types';
import { colorRoleStyles } from './ColorRole.styles';

export const ColorRole: React.FC<IColorRoleProps> = ({
  label,
  size = 'md',
  backgroundColor,
  textColor,
}) => (
  <div
    {...stylex.props(
      colorRoleStyles.host,
      colorRoleStyles[`height$${size}`],
      colorRoleStyles.color(backgroundColor, textColor),
    )}
  >
    {label}
  </div>
);
