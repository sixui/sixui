import type { IIconButtonProps } from '~/components/IconButton';
import { IconButton } from '~/components/IconButton';

export type IIconButtonPlaygroundDemoProps = {
  iconButton: IIconButtonProps;
};

export const IconButtonPlaygroundDemo: React.FC<
  IIconButtonPlaygroundDemoProps
> = (props) => <IconButton {...props.iconButton} />;
