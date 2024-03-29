import { useContext } from 'react';

import {
  type IDisclosureContext,
  DisclosureContext,
} from './DisclosureContext';

export const useDisclosureContext = (): IDisclosureContext | undefined =>
  useContext(DisclosureContext);
