import type { IBoxProps } from '~/components/Box';
import type { IDeterminateLinearProgressIndicatorOwnProps } from '~/components/DeterminateLinearProgressIndicator';
import type { IIndeterminateLinearProgressIndicatorOwnProps } from '~/components/IndeterminateLinearProgressIndicator';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IMakeOptional } from '~/utils/types';
import type {
  ILinearProgressIndicatorThemeFactory,
  linearProgressIndicatorTheme,
} from './LinearProgressIndicator.css';

export interface ILinearProgressIndicatorOwnProps
  extends IMakeOptional<IDeterminateLinearProgressIndicatorOwnProps, 'value'>,
    IIndeterminateLinearProgressIndicatorOwnProps {}

export interface ILinearProgressIndicatorProps
  extends IBoxProps,
    IComponentThemeProps<ILinearProgressIndicatorThemeFactory>,
    ILinearProgressIndicatorOwnProps {}

export type ILinearProgressIndicatorFactory = IComponentFactory<{
  props: ILinearProgressIndicatorProps;
  ref: HTMLDivElement;
  theme: typeof linearProgressIndicatorTheme;
}>;
