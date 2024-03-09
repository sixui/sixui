import stylex from '@stylexjs/stylex';
import { Fragment, cloneElement, forwardRef } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';

import type { IContainerProps } from '@/helpers/types';
import { MenuList } from '@/components/atoms/MenuList';
import { MenuItem } from './MenuItem';
import { MenuDivider } from './MenuDivider';
import { IVisualState } from '@/hooks/useVisualState';

type IMenuActionRenderPropArg = {
  open: boolean;
};

export type IMenuProps = Omit<IContainerProps, 'styles'> & {
  action:
    | React.ReactElement
    | ((bag: IMenuActionRenderPropArg) => React.ReactElement);
  children: Array<React.ReactNode>;
  anchor?: 'left' | 'center' | 'right';
};

const styles = stylex.create({
  host: {
    position: 'relative',
  },
  items: {
    position: 'absolute',
  },
  items$left: {},
  items$center: {
    left: '50%',
    transform: 'translateX(-50%)',
  },
  items$right: {
    right: 0,
  },
});

const Menu = forwardRef<HTMLElement, IMenuProps>(function Menu(props, ref) {
  const { sx, action, anchor = 'left', children } = props;

  const activedVisualState: IVisualState = { hovered: true };
  const activedProps = { visualState: activedVisualState };

  return (
    <HeadlessMenu ref={ref} as='div' {...stylex.props(styles.host, sx)}>
      <HeadlessMenu.Button as={Fragment}>
        {(bag) =>
          cloneElement(
            typeof action === 'function' ? action(bag) : action,
            bag.open ? activedProps : undefined,
          )
        }
      </HeadlessMenu.Button>
      <HeadlessMenu.Items
        {...stylex.props(styles.items, styles[`items$${anchor}`])}
      >
        <MenuList>{children}</MenuList>
      </HeadlessMenu.Items>
    </HeadlessMenu>
  );
});

const MenuNamespace = Object.assign(Menu, {
  Item: MenuItem,
  Divider: MenuDivider,
});

export { MenuNamespace as Menu };
