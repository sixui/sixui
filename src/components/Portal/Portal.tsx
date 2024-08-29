import { FloatingPortal } from '@floating-ui/react';

import type { IPortalProps } from './Portal.types';
import { useThemeContext } from '../ThemeProvider';

export const Portal: React.FC<IPortalProps> = (props) => {
  const { root: rootProp, children, disabled } = props;
  const { root: rootColorScheme } = useThemeContext();

  const root = rootProp ?? rootColorScheme;

  return disabled ? (
    children
  ) : (
    <FloatingPortal root={root}>{children}</FloatingPortal>
  );
};
