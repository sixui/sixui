import type { IContainerProps, IOmit } from '@/helpers/types';
import type {
  IExpandableContextValue,
  IExpandableProps,
} from '@/components/Expandable';
import type { IDisclosureStylesKey } from './Disclosure.styles';

export type IDisclosureProps = IContainerProps<IDisclosureStylesKey> &
  IOmit<IExpandableContextValue, 'expand'> &
  Pick<IExpandableProps, 'trigger' | 'children'>;
