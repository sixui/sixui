import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IStateLayerThemeFactory,
  stateLayerTheme,
} from './StateLayer.css';
import type { IUseStateLayerResult } from './useStateLayer';

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
