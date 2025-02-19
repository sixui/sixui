import type { IAppLayoutComponentName } from './AppLayout.types';
import { createOptionalContext } from '~/utils/react/createOptionalContext';

export type IAppLayoutSetterContextValue = {
  registerComponent: (component: IAppLayoutComponentName) => void;
  unregisterComponent: (component: IAppLayoutComponentName) => void;
};

export const [AppLayoutSetterProvider, useAppLayoutSetterContext] =
  createOptionalContext<IAppLayoutSetterContextValue>();
