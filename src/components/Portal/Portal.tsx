import { FloatingPortal } from '@floating-ui/react';

import type { IPortalProps } from './Portal.types';
import { useColorScheme } from '../ColorScheme';

export const Portal: React.FC<IPortalProps> = (props) => {
  const { root: rootProp, children, disabled } = props;
  const { root: rootColorScheme } = useColorScheme();

  const root = rootProp ?? rootColorScheme;

  return disabled ? (
    children
  ) : (
    <FloatingPortal root={root}>{children}</FloatingPortal>
  );
};
