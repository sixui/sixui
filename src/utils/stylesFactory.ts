import type { IAny } from '~/helpers/types';

export type IStylesFactoryPayload = {
  styleName: string;
  tokens?: IAny;
  variant?: string;
};

export type IStyles<TPayload extends IStylesFactoryPayload> = {
  classNames: Partial<Record<TPayload['styleName'], string>>;
  tokensClassName?: string;
  tokens?: TPayload['tokens'];
  variants?: Partial<
    Record<TPayload['styleName'], Partial<Record<string, string>>>
  >;
};

export type IStylesFactory<TPayload extends IStylesFactoryPayload> = TPayload;

export const stylesFactory = <TPayload extends IStylesFactoryPayload>(
  styles: IStyles<TPayload>,
): IStyles<TPayload> => styles;
