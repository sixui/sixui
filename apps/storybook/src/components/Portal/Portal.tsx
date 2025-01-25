import { FloatingPortal } from '@floating-ui/react';

import type { IPortalFactory } from './Portal.types';
import { useThemeContext } from '~/components/ThemeProvider';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';

const COMPONENT_NAME = 'Portal';

export const Portal = componentFactory<IPortalFactory>((props) => {
  const {
    root: rootProp,
    children,
    disabled,
  } = useProps({
    componentName: COMPONENT_NAME,
    props,
  });

  const { getRoot } = useThemeContext();
  const root = rootProp ?? getRoot();

  return disabled || !root ? (
    children
  ) : (
    <FloatingPortal root={root}>{children}</FloatingPortal>
  );
});

Portal.displayName = `@sixui/${COMPONENT_NAME}`;
