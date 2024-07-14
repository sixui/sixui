import type { IFloatingFilterableListProps } from './FloatingFilterableList.types';
import { FloatingFilterableListBase } from '@/components/atoms/FloatingFilterableListBase';

export const FloatingFilterableList: React.FC<IFloatingFilterableListProps> = (
  props,
) => <FloatingFilterableListBase {...props} />;
