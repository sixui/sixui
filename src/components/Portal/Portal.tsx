import { FloatingPortal } from '@floating-ui/react';

import type { IPortalProps } from './Portal.types';
import { useColorScheme } from '@/components/ColorScheme';

export const Portal: React.FC<IPortalProps> = (props) => {
  const { root: rootProp, children } = props;
  const { root: rootColorScheme } = useColorScheme();

  const root = rootProp ?? rootColorScheme;

  return <FloatingPortal root={root}>{children}</FloatingPortal>;
};
