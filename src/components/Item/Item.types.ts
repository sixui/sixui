import type { IBaseProps } from '../Base';
import type { IItemStylesKey } from './Item.styles';

export type IItemProps = IBaseProps<IItemStylesKey> & {
  container?: React.ReactNode;
  start?: React.ReactNode;
  overline?: React.ReactNode;
  children?: React.ReactNode;
  supportingText?: React.ReactNode;
  trailingSupportingText?: React.ReactNode;
  end?: React.ReactNode;
  maxLines?: number;
};
