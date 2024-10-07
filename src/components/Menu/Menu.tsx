import { FloatingTree, useFloatingParentNodeId } from '@floating-ui/react';

import type { IMenuFactory } from './Menu.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { MenuLeaf } from './MenuLeaf';
import { menuLeafTheme } from './MenuLeaf.css';

const COMPONENT_NAME = 'Menu';

export const Menu = componentFactory<IMenuFactory>((props, forwardedRef) => {
  const parentId = useFloatingParentNodeId();

  if (parentId !== null) {
    return <MenuLeaf {...props} ref={forwardedRef} />;
  }

  return (
    <FloatingTree>
      <MenuLeaf {...props} ref={forwardedRef} />
    </FloatingTree>
  );
});

MenuLeaf.theme = menuLeafTheme;
MenuLeaf.displayName = `@sixui/${COMPONENT_NAME}`;
