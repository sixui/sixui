import type { IAny } from '~/helpers/types';

export type IComponentThemeFactoryPayload = {
  styleName: string;
  tokens?: IAny;
  modifier?: string;
  variant?: string;
};

export type IComponentTheme<TPayload extends IComponentThemeFactoryPayload> = {
  classNames: Partial<Record<TPayload['styleName'], string>>;
  tokensClassName?: string;
  tokens: TPayload['tokens'];
};

export type IComponentThemeFactory<
  TPayload extends IComponentThemeFactoryPayload,
> = TPayload;

export const componentThemeFactory = <
  TPayload extends IComponentThemeFactoryPayload,
>(
  theme: IComponentTheme<TPayload>,
): IComponentTheme<TPayload> => theme;
