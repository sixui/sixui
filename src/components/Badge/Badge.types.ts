import type { IPolymorphicComponentFactory } from '~/utils/polymorphicComponentFactory';
import type { IStylesProps } from '~/hooks/useStyles2';
import type { IBoxProps } from '../Box';
import type { badgeStyles, IBadgeStylesFactory } from './Badge.css';

export type IBadgeProps = IBoxProps &
  IStylesProps<IBadgeStylesFactory> & {
    value?: string | number;
    maxValue?: number;
    showZero?: boolean;
    dot?: boolean;
  };

export type IBadgeFactory = IPolymorphicComponentFactory<{
  props: IBadgeProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  styles: typeof badgeStyles;
}>;
