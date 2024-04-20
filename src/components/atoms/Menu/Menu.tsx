import stylex from '@stylexjs/stylex';
import { Fragment, cloneElement, forwardRef } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import { type Placement, useFloating } from '@floating-ui/react-dom';
import { FloatingPortal } from '@floating-ui/react';

import type { IContainerProps } from '@/helpers/types';
import { IVisualState } from '@/hooks/useVisualState';
import { MenuList } from '@/components/atoms/MenuList';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { useColorScheme } from '@/components/utils/ColorScheme';
import { MenuItem } from './MenuItem';

export type IMenuRenderProps = {
  open: boolean;
};

export type IMenuProps = Omit<IContainerProps, 'styles'> & {
  action:
    | React.ReactElement
    | ((props: IMenuRenderProps) => React.ReactElement);
  children: Array<React.ReactNode>;
  placement?: Placement;
};

// TODO: migrate in theme
const styles = stylex.create({
  host: {
    position: 'relative',
  },
  items: {
    width: 'max-content',
    zIndex: 999,
  },
});

const Menu = forwardRef<HTMLElement, IMenuProps>(function Menu(props, ref) {
  const { sx, action, placement = 'bottom-start', children } = props;

  const { refs, floatingStyles } = useFloating({
    placement,
  });
  const { root } = useColorScheme();

  const openVisualState: IVisualState = { hovered: true };
  const openProps = { visualState: openVisualState };

  return (
    <HeadlessMenu ref={ref}>
      {({ open }) => (
        <>
          <HeadlessMenu.Button as={Fragment} ref={refs.setReference}>
            {(bag) =>
              cloneElement(
                typeof action === 'function' ? action(bag) : action,
                bag.open ? openProps : undefined,
              )
            }
          </HeadlessMenu.Button>

          {open ? (
            <FloatingPortal root={root}>
              <HeadlessMenu.Items
                {...stylex.props(styles.items, sx)}
                ref={refs.setFloating}
                style={floatingStyles}
                static
              >
                <MenuList>{children}</MenuList>
              </HeadlessMenu.Items>
            </FloatingPortal>
          ) : null}
        </>
      )}
    </HeadlessMenu>
  );
});

const MenuNamespace = Object.assign(Menu, {
  Item: MenuItem,
  Divider: MenuListDivider,
});

export { MenuNamespace as Menu };
