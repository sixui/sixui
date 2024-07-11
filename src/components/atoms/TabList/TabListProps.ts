import type { IContainerProps } from '@/helpers/types';
import type { ITabListStyleKey } from './TabList.styledefs';

export type ITabListProps = Pick<React.AriaAttributes, 'aria-label'> &
  IContainerProps<ITabListStyleKey> & {
    children?: React.ReactNode;
    fullWidth?: boolean;
  };
