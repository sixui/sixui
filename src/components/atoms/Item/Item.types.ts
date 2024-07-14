import type { IContainerProps } from '@/helpers/types';
import type { IItemStylesKey } from './Item.styles';

export type IItemProps = IContainerProps<IItemStylesKey> & {
  container?: React.ReactNode;
  start?: React.ReactNode;
  overline?: React.ReactNode;
  children?: React.ReactNode;
  supportingText?: React.ReactNode;
  trailingSupportingText?: React.ReactNode;
  end?: React.ReactNode;
  maxLines?: number;
};
