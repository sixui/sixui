import { FloatingPortal } from '@floating-ui/react';

import type { IPortalFactory } from './Portal.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useThemeContext } from '../ThemeProvider';

const COMPONENT_NAME = 'Portal';

export const Portal = componentFactory<IPortalFactory>((props) => {
  const {
    target: targetProp,
    children,
    disabled,
  } = useProps({
    componentName: COMPONENT_NAME,
    props,
  });

  const { getRoot } = useThemeContext();
  const target = targetProp ?? getRoot();

  return disabled || !target ? (
    children
  ) : (
    <FloatingPortal root={target}>{children}</FloatingPortal>
  );
});

Portal.displayName = `@sixui/${COMPONENT_NAME}`;
