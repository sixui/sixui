import { FloatingPortal } from '@floating-ui/react';

import type { IPortalFactory } from './Portal.types';
import { useProps, useThemeContext } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Portal.constants';

export const Portal = componentFactory<IPortalFactory>(
  (props, _forwardedRef) => {
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
  },
);

Portal.displayName = `@sixui/core/${COMPONENT_NAME}`;
