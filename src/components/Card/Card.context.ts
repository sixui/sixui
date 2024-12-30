import { createSafeContext } from '~/helpers/createSafeContext';

export type ICardContextValue = {
  actionable?: boolean;
};

export const [CardContextProvider, useCardContext] =
  createSafeContext<ICardContextValue>(
    'You forgot to wrap your component in <CardContextProvider />.',
  );
