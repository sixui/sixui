import type { IOmit } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IStackProps } from '../Stack';
import type { ICardContentStylesKey } from './CardContent.styles';

export type ICardContentProps = IBaseProps<ICardContentStylesKey> &
  IOmit<IStackProps, 'styles'> & {
    children?: React.ReactNode;
  };
