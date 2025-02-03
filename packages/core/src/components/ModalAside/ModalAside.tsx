import type { IModalAsideThemeFactory } from './ModalAside.css';
import type { IModalAsideFactory } from './ModalAside.types';
import { Drawer } from '~/components/Drawer';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './ModalAside.constants';
import { modalAsideTheme } from './ModalAside.css';

export const ModalAside = componentFactory<IModalAsideFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      side = 'left',
      opened,
      children,
      detached,
      root,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IModalAsideThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: modalAsideTheme,
    });

    return (
      <Drawer
        {...getStyles('root')}
        opened={opened}
        side={side}
        variant={detached ? 'detached' : undefined}
        fullHeight={['left', 'right'].includes(side)}
        root={root}
        modal
        ref={forwardedRef}
        {...other}
      >
        {({ close }) =>
          isFunction(children) ? children({ type: 'modal', close }) : children
        }
      </Drawer>
    );
  },
);

ModalAside.theme = modalAsideTheme;
ModalAside.displayName = `@sixui/core/${COMPONENT_NAME}`;
