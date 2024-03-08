import { Menu } from '@headlessui/react';
import stylex from '@stylexjs/stylex';
import { Fragment, forwardRef } from 'react';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';

import type { IContainerProps } from '@/helpers/types';
import { Button } from '../Button';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { Divider } from '../Divider';

export type ITestProps = IContainerProps & {
  children?: React.ReactNode;
};

const styles = stylex.create({
  host: {},
  list: {
    position: 'absolute',
    backgroundColor: colorRolesVars.surface,
    zIndex: 999,
    borderRadius: '8px',
    outlineWidth: '1px',
    outlineStyle: 'solid',
    outlineColor: colorRolesVars.outline,
    maxWidth: '360px',
    overflow: 'hidden',
    width: '250px',
  },
});

export const Test = forwardRef<HTMLDivElement, ITestProps>(
  function Test(props, ref) {
    const { sx, children, ...other } = props;

    return (
      <div {...stylex.props(styles.host, sx)} ref={ref} {...other}>
        <Menu>
          <Menu.Button as={Button}>More</Menu.Button>
          <Menu.Items as={List} sx={styles.list}>
            <Menu.Item as={Fragment}>
              {({ active }) => (
                <ListItem href='#' active={active}>
                  Item A
                </ListItem>
              )}
            </Menu.Item>
            <Divider />
            <Menu.Item as={Fragment}>
              {({ active }) => (
                <ListItem href='#' active={active}>
                  Item A
                </ListItem>
              )}
            </Menu.Item>
            <Menu.Item as={Fragment}>
              {({ active }) => (
                <ListItem href='#' active={active}>
                  Item A
                </ListItem>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
        <Button>SD</Button>
      </div>
    );
  },
);
