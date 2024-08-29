import type { IAny } from '~/helpers/types';

export type IComponentStyles<TPayload extends IComponentStylesFactoryPayload> =
  {
    classNames: Record<TPayload['styleName'], string>;
    tokensClassName?: string;
    tokens?: TPayload['tokens'];
    variants?: TPayload['variant'] extends string
      ? Partial<
          Record<
            TPayload['styleName'],
            Partial<Record<TPayload['variant'], string>>
          >
        >
      : never;
  };

export type IComponentStylesFactoryPayload = {
  styleName: string;
  tokens?: IAny;
  variant?: string;
};

export type IComponentStylesFactory<
  TPayload extends IComponentStylesFactoryPayload,
> = TPayload;

export const componentStylesFactory = <
  TPayload extends IComponentStylesFactoryPayload,
>(
  styles: IComponentStyles<TPayload>,
): IComponentStyles<TPayload> => styles;
