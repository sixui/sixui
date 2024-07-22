import stylex from '@stylexjs/stylex';

import type { ISvgIconProps } from './SvgIcon.types';
import { svgIconStyles } from './SvgIcon.styles';

export const SvgIcon: React.FC<ISvgIconProps> = (props) => {
  const { sx, icon, ...other } = props;

  return (
    <div
      aria-hidden
      {...stylex.props(svgIconStyles.host, sx)}
      {...other}
      dangerouslySetInnerHTML={{ __html: icon.data }}
    />
  );
};
