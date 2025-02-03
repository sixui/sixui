import { FloatingTree, useFloatingParentNodeId } from '@floating-ui/react';

import type { IMenuFactory } from './Menu.types';
import { ListDivider } from '~/components/List/ListDivider';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Menu.constants';
import { MenuItem } from './MenuItem';
import { MenuLeaf } from './MenuLeaf';
import { MenuList } from './MenuList';
import { menuTheme } from './Menu.css';

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

Menu.theme = menuTheme;
Menu.displayName = `@sixui/core/${COMPONENT_NAME}`;
Menu.List = MenuList;
Menu.Item = MenuItem;
Menu.Divider = ListDivider;
