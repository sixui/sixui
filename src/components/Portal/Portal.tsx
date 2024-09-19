import { FloatingPortal } from '@floating-ui/react';

import type { IPortalProps } from './Portal.types';
import { useThemeContext } from '../ThemeProvider';

export const Portal: React.FC<IPortalProps> = (props) => {
  const { target: targetProp, children, disabled } = props;
  const { rootRef: colorSchemeRootRef } = useThemeContext();

  const target = targetProp ?? colorSchemeRootRef.current;

  return disabled ? (
    children
  ) : (
    <FloatingPortal root={target}>{children}</FloatingPortal>
  );
};
