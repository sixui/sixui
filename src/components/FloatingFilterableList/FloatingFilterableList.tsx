import type { IFloatingFilterableListProps } from './FloatingFilterableList.types';
import { FloatingFilterableListBase } from '../FloatingFilterableListBase';

export const FloatingFilterableList: React.FC<IFloatingFilterableListProps> = (
  props,
) => <FloatingFilterableListBase {...props} />;
