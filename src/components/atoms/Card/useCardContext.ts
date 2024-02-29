import { useContext } from 'react';

import { type ICardContext, CardContext } from './CardContext';

export const useCardContext = (): ICardContext | undefined =>
  useContext(CardContext);
