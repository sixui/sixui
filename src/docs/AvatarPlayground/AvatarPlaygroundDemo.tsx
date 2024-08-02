import { Avatar, type IAvatarProps } from '~/components/Avatar';

export type IAvatarPlaygroundDemoProps = {
  avatar: IAvatarProps;
};

export const AvatarPlaygroundDemo: React.FC<IAvatarPlaygroundDemoProps> = (
  props,
) => <Avatar {...props.avatar} />;
