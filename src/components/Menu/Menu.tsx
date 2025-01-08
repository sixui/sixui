import { FloatingTree, useFloatingParentNodeId } from '@floating-ui/react';

import type { IMenuFactory } from './Menu.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { ListDivider } from '../ListDivider';
import { MenuItem } from '../MenuItem';
import { MenuList } from '../MenuList';
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

Menu.theme = menuLeafTheme;
Menu.displayName = `@sixui/${COMPONENT_NAME}`;
Menu.List = MenuList;
Menu.Item = MenuItem;
Menu.Divider = ListDivider;
