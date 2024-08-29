import type { ICSSProperties, IGap } from '~/helpers/commonStyles';
import type { IBoxProps } from '../Box';
import type { IStackStyleName } from './Stack.css';

export type IStackProps = IBoxProps<IStackStyleName> & {
  children?: React.ReactNode;
  horizontal?: boolean;
  gap?: IGap;
  align?: ICSSProperties['align'];
  justify?: ICSSProperties['justify'];
  wrap?: boolean;
  grow?: boolean;
  divider?: React.ReactNode;
};
