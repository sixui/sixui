import type { IOmit } from '~/helpers/types';
import { Avatar, type IAvatarProps } from '~/components/Avatar';

export type IAvatarDemoProps = IOmit<IAvatarProps, 'styles'>;

export const AvatarDemo: React.FC<IAvatarDemoProps> = (props) => (
  <Avatar {...props} />
);
