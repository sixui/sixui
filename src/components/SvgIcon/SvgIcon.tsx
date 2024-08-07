import type { ISvgIconProps } from './SvgIcon.types';
import { Base } from '../Base';
import { svgIconStyles } from './SvgIcon.styles';

export const SvgIcon: React.FC<ISvgIconProps> = (props) => {
  const { sx, icon, ...other } = props;

  return (
    <Base
      aria-hidden
      {...other}
      sx={[svgIconStyles.host, sx]}
      dangerouslySetInnerHTML={{ __html: icon.data }}
    />
  );
};
