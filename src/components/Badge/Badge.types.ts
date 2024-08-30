import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IStylesProps } from '~/utils/styles/useStyles';
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
