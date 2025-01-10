import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { diagonalsTheme, IDiagonalsThemeFactory } from './Diagonals.css';

export interface IDiagonalsOwnProps {
  children?: React.ReactNode;
}

export interface IDiagonalsProps
  extends IBoxProps,
    IComponentThemeProps<IDiagonalsThemeFactory>,
    IDiagonalsOwnProps {}

export type IDiagonalsFactory = IComponentFactory<{
  props: IDiagonalsProps;
  ref: HTMLDivElement;
  theme: typeof diagonalsTheme;
}>;
