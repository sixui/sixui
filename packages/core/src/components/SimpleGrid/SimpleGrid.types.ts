import type {
  IBoxProps,
  IResponsiveProp,
  ISpacingProp,
} from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  ISimpleGridThemeFactory,
  simpleGridTheme,
} from './SimpleGrid.css';

export interface ISimpleGridOwnProps {
  children?: React.ReactNode;
  cols?: IResponsiveProp<number>;
  spacing?: IResponsiveProp<ISpacingProp>;
  verticalSpacing?: IResponsiveProp<ISpacingProp>;
  type?: 'media' | 'container';
}

export interface ISimpleGridProps
  extends IBoxProps,
    IComponentThemeProps<ISimpleGridThemeFactory>,
    ISimpleGridOwnProps {}

export type ISimpleGridFactory = IComponentFactory<{
  props: ISimpleGridProps;
  ref: HTMLDivElement;
  theme: typeof simpleGridTheme;
}>;
