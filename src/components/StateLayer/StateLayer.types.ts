import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IUseStateLayerResult } from './useStateLayer';
import type { IBoxProps } from '../Box';
import type {
  stateLayerTheme,
  IStateLayerThemeFactory,
} from './StateLayer.css';

export type IStateLayerOwnProps = {
  context?: IUseStateLayerResult;
};

export interface IStateLayerProps
  extends IBoxProps,
    IComponentThemeProps<IStateLayerThemeFactory>,
    IStateLayerOwnProps {}

export type IStateLayerFactory = IComponentFactory<{
  props: IStateLayerProps;
  ref: HTMLDivElement;
  theme: typeof stateLayerTheme;
}>;
