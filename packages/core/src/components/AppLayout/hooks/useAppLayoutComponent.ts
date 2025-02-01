import { useEffect } from 'react';

import { IAppLayoutComponentName } from '../AppLayout.types';
import { useAppLayoutSetterContext } from '../AppLayoutSetter.context';

export const useAppLayoutComponent = (
  componentName: IAppLayoutComponentName,
): void => {
  const appLayoutSetterContext = useAppLayoutSetterContext();

  useEffect(() => {
    appLayoutSetterContext?.registerComponent(componentName);

    return () => {
      appLayoutSetterContext?.unregisterComponent(componentName);
    };
  }, [appLayoutSetterContext, componentName]);
};
