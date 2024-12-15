import type { IAny, IMaybeAsync } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { IPaperOwnProps } from '../Paper';
import type { chipTheme, IChipThemeFactory } from './Chip.css';

export type IChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

export interface IChipOwnProps extends IButtonBaseOwnProps {
  onDelete?: (event: React.MouseEvent<Element>) => IMaybeAsync<IAny>;
  elevated?: boolean;
  selected?: boolean;
  icon?: React.ReactNode;
  imageUrl?: string;
  loading?: boolean;
  loadingText?: string;
  deleting?: boolean;
  avatar?: boolean;
}

export interface IChipProps
  extends IBoxProps,
    IComponentThemeProps<IChipThemeFactory>,
    IPaperOwnProps,
    IChipOwnProps {}

export type IChipFactory = IPolymorphicComponentFactory<{
  props: IChipProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof chipTheme;
  variant: IChipVariant | false;
}>;
