import type { IOmit } from '@/helpers/types';
import type { IButtonOwnProps } from '@/components/Button';
import type { IPlaygroundProps } from './Playground.types';

export type IButtonPlaygroundProps = IOmit<
  IPlaygroundProps<IButtonOwnProps>,
  'componentRenderer' | 'options'
>;
