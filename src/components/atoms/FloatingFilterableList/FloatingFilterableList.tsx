import type { IFloatingFilterableListProps } from './FloatingFilterableListProps';
import { FloatingFilterableListBase } from '@/components/atoms/FloatingFilterableListBase';

export const FloatingFilterableList: React.FC<IFloatingFilterableListProps> = (
  props,
) => <FloatingFilterableListBase {...props} />;
