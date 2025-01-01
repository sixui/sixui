import type { IOmit } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IExpandableContextValue, IExpandableProps } from '../Expandable';
import type { IDisclosureStylesKey } from './Disclosure.styles';

export type IDisclosureProps = IBaseProps<IDisclosureStylesKey> &
  IOmit<IExpandableContextValue, 'expand'> &
  Pick<IExpandableProps, 'trigger' | 'children'>;
