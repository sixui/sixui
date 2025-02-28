import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IMaybeAsync } from '~/utils/types';
import type { fileCardTheme, IFileCardThemeFactory } from './FileCard.css';

export interface IFileCardOwnProps {
  disabled?: boolean;
  href?: string;
  media?: React.ReactNode;
  icon?: React.ReactNode;
  fileName?: string;
  fileSize?: number;
  thumbUrl?: string;
  downloadUrl?: string;
  onDelete?: () => IMaybeAsync<unknown>;
  onReplace?: () => IMaybeAsync<unknown>;
  onRetry?: () => IMaybeAsync<unknown>;
  onClick?: () => IMaybeAsync<unknown>;
  loading?: boolean;
  progress?: number;
  supportingText?: string;
  hasError?: boolean;
  errorText?: string;
  hideMetadata?: boolean;
}

export interface IFileCardProps
  extends IBoxProps,
    IComponentThemeProps<IFileCardThemeFactory>,
    IFileCardOwnProps {}

export type IFileCardFactory = IComponentFactory<{
  props: IFileCardProps;
  ref: HTMLDivElement;
  theme: typeof fileCardTheme;
}>;
