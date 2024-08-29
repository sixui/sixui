import type { IAny, IMakeOptional } from '~/helpers/types';

export type IStylesFactoryPayload = {
  styleName: string;
  tokens?: IAny;
  variant?: string;
};

export type IStyles<TPayload extends IStylesFactoryPayload> = IMakeOptional<
  {
    classNames: Partial<Record<TPayload['styleName'], string>>;
    tokensClassName?: string;
    tokens: TPayload['tokens'];
  },
  TPayload['tokens'] extends undefined ? never : 'tokens'
>;

export type IStylesFactory<TPayload extends IStylesFactoryPayload> = TPayload;

export const stylesFactory = <TPayload extends IStylesFactoryPayload>(
  styles: IStyles<TPayload>,
): IStyles<TPayload> => styles;
