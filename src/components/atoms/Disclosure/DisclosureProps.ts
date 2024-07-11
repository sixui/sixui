import type { IContainerProps, IOmit } from '@/helpers/types';
import type {
  IExpandableContextValue,
  IExpandableProps,
} from '@/components/utils/Expandable';
import type { IDisclosureStyleKey } from './Disclosure.styledefs';

export type IDisclosureProps = IContainerProps<IDisclosureStyleKey> &
  IOmit<IExpandableContextValue, 'expand'> &
  Pick<IExpandableProps, 'trigger' | 'children'>;
