import type { IBaseProps } from '../Base';
import type { ITabListStylesKey } from './TabList.styles';

export type ITabListProps = Pick<React.AriaAttributes, 'aria-label'> &
  IBaseProps<ITabListStylesKey> & {
    children?: React.ReactNode;
    fullWidth?: boolean;
  };
