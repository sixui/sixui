import type { IBaseProps } from '~/components/Base';
import type { IOrientation } from '~/helpers/types';
import type { ICSSProperties, IGap } from '~/helpers/commonStyles';
import type { IStackStylesKey } from './Stack.styles';

// TODO: define proper types
export type IStackProps = IBaseProps<IStackStylesKey> & {
  children: React.ReactNode;
  orientation?: IOrientation;
  gap?: IGap;
  align?: ICSSProperties['align'];
  justify?: ICSSProperties['justify'];
  wrap?: boolean;
  divider?: React.ReactNode;
};
