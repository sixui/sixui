import type { IContainerProps } from '@/helpers/types';
import type { IItemStyleKey } from './Item.styledefs';

export type IItemProps = IContainerProps<IItemStyleKey> & {
  container?: React.ReactNode;
  start?: React.ReactNode;
  overline?: React.ReactNode;
  children?: React.ReactNode;
  supportingText?: React.ReactNode;
  trailingSupportingText?: React.ReactNode;
  end?: React.ReactNode;
  maxLines?: number;
};
