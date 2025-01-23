import type { IModalAsideThemeFactory } from './ModalAside.css';
import type { IModalAsideFactory } from './ModalAside.types';
import { isFunction } from '~/helpers/isFunction';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Drawer } from '../Drawer';
import { modalAsideTheme } from './ModalAside.css';

const COMPONENT_NAME = 'ModalAside';

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
      onClose,
      children,
      root,
      detached,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

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
        root={root ?? appLayoutContext?.root}
        opened={opened}
        onClose={() => {
          onClose?.();
          appLayoutContext?.aside?.state?.close?.();
        }}
        side={side}
        variant={detached ? 'detached' : undefined}
        fullHeight
        modal
        ref={forwardedRef}
        {...other}
      >
        {({ close }) => (isFunction(children) ? children({ close }) : children)}
      </Drawer>
    );
  },
);

ModalAside.theme = modalAsideTheme;
ModalAside.displayName = `@sixui/${COMPONENT_NAME}`;
