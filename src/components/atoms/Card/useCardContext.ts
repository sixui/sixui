import * as React from 'react';

import { type ICardContext, CardContext } from './CardContext';

export const useCardContext = (): ICardContext | undefined =>
  React.useContext(CardContext);
