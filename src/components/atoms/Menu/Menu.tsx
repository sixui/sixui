import stylex from '@stylexjs/stylex';
import { Fragment, cloneElement, forwardRef } from 'react';
import { Menu as HeadlessMenu } from '@headlessui/react';
import {
  FloatingPortal,
  useFloating,
  type Placement,
} from '@floating-ui/react';

import type { IContainerProps, IOmit } from '@/helpers/types';
import { IVisualState } from '@/hooks/useVisualState';
import { MenuList } from '@/components/atoms/MenuList';
import { MenuListDivider } from '@/components/atoms/MenuList/MenuListDivider';
import { useColorScheme } from '@/components/utils/ColorScheme';
import { MenuItem } from './MenuItem';

export type IMenuRenderProps = {
  open: boolean;
};

export type IMenuProps = IOmit<IContainerProps, 'styles'> & {
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
    zIndex: 999,
  },
});

const Menu = forwardRef<HTMLElement, IMenuProps>(
  function Menu(props, forwardedRef) {
    const {
      sx,
      action,
      placement: placementProp = 'bottom-start',
      children,
    } = props;

    const floating = useFloating({
      placement: placementProp,
    });
    const colorScheme = useColorScheme();

    const openVisualState: IVisualState = { hovered: true };
    const openProps = { visualState: openVisualState };

    return (
      <HeadlessMenu ref={forwardedRef}>
        {({ open }) => (
          <>
            <HeadlessMenu.Button as={Fragment} ref={floating.refs.setReference}>
              {(bag) =>
                cloneElement(
                  typeof action === 'function' ? action(bag) : action,
                  bag.open ? openProps : undefined,
                )
              }
            </HeadlessMenu.Button>

            {open ? (
              <FloatingPortal root={colorScheme.root}>
                <HeadlessMenu.Items
                  {...stylex.props(styles.items, sx)}
                  ref={floating.refs.setFloating}
                  style={floating.floatingStyles}
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
  },
);

const MenuNamespace = Object.assign(Menu, {
  Item: MenuItem,
  Divider: MenuListDivider,
});

export { MenuNamespace as Menu };
