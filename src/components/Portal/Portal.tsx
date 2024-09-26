import { FloatingPortal } from '@floating-ui/react';

import type { IPortalProps } from './Portal.types';
import { useThemeContext } from '../ThemeProvider';

export const Portal: React.FC<IPortalProps> = (props) => {
  const { target: targetProp, children, disabled } = props;
  const { getRoot } = useThemeContext();

  const target = targetProp ?? getRoot();

  return disabled || !target ? (
    children
  ) : (
    <FloatingPortal root={target}>{children}</FloatingPortal>
  );
};
