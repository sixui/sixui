import { faShirt, faSocks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IBoxProps } from '~/components/Box';
import { Box } from '~/components/Box';

export type IDemoComponentProps = IBoxProps & {
  size?: 'sm' | 'md' | 'lg';
  icon?: 'shirt' | 'socks';
};

export const DemoComponent: React.FC<IDemoComponentProps> = (props) => {
  const { scale: size, icon = 'shirt', ...other } = props;

  return (
    <Box {...other}>
      <FontAwesomeIcon
        icon={icon === 'shirt' ? faShirt : faSocks}
        size={size === 'sm' ? 'xs' : size === 'lg' ? 'xl' : undefined}
      />
    </Box>
  );
};
