import { createSafeContext } from '~/helpers/createSafeContext';
import { ICanonicalLayoutType } from './useCanonicalLayout';

export type IAppLayoutSetterContextValue = {
  setCanonicalLayoutType: (layoutType: ICanonicalLayoutType) => void;
};

export const [AppLayoutSetterProvider, useAppLayoutSetterContext] =
  createSafeContext<IAppLayoutSetterContextValue>(
    'You forgot to wrap your component in <AppLayoutSetterProvider />.',
  );
