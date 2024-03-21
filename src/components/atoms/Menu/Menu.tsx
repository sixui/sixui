import stylex from '@stylexjs/stylex';
import { Fragment, cloneElement, forwardRef } from 'react';
import { Menu as HeadlessMenu, Portal } from '@headlessui/react';
import { useFloating } from '@floating-ui/react-dom';

import type { IContainerProps } from '@/helpers/types';
import { MenuList } from '@/components/atoms/MenuList';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { IVisualState } from '@/hooks/useVisualState';
import { MenuItem } from './MenuItem';

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

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    position: 'relative',
  },
  items: {
    zIndex: 999,
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

  const { refs, floatingStyles } = useFloating({
    placement: 'bottom-start',
  });

  const openVisualState: IVisualState = { hovered: true };
  const openProps = { visualState: openVisualState };

  return (
    <HeadlessMenu ref={ref} as='div' {...stylex.props(styles.host, sx)}>
      <HeadlessMenu.Button as={Fragment} ref={refs.setReference}>
        {(bag) =>
          cloneElement(
            typeof action === 'function' ? action(bag) : action,
            bag.open ? openProps : undefined,
          )
        }
      </HeadlessMenu.Button>
      <Portal>
        <HeadlessMenu.Items
          {...stylex.props(styles.items, styles[`items$${anchor}`])}
          ref={refs.setFloating}
          style={floatingStyles}
        >
          <MenuList>{children}</MenuList>
        </HeadlessMenu.Items>
      </Portal>
    </HeadlessMenu>
  );
});

const MenuNamespace = Object.assign(Menu, {
  Item: MenuItem,
  Divider: MenuListDivider,
});

export { MenuNamespace as Menu };
