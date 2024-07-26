import type { IContainerProps } from '~/helpers/types';
import type { ITabListStylesKey } from './TabList.styles';

export type ITabListProps = Pick<React.AriaAttributes, 'aria-label'> &
  IContainerProps<ITabListStylesKey> & {
    children?: React.ReactNode;
    fullWidth?: boolean;
  };
