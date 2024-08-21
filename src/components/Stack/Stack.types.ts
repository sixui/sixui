import type { IBaseProps } from '~/components/Base';
import type { ICSSProperties, IGap } from '~/helpers/commonStyles';
import type { IStackStylesKey } from './Stack.styles';

export type IStackProps = IBaseProps<IStackStylesKey> & {
  children?: React.ReactNode;
  horizontal?: boolean;
  gap?: IGap;
  align?: ICSSProperties['align'];
  justify?: ICSSProperties['justify'];
  wrap?: boolean;
  grow?: boolean;
  divider?: React.ReactNode;
};
