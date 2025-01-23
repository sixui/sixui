import type { IModalAsideThemeFactory } from './ModalAside.css';
import type { IModalAsideFactory } from './ModalAside.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Drawer } from '../Drawer';
import { SideSheetContent } from '../SideSheetContent';
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
      detached,
      root,
      onClose,
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
      modifiers: {
        detached,
      },
    });

    return (
      <Drawer
        {...getStyles('drawer')}
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
      >
        {({ close }) => (
          <SideSheetContent
            {...getStyles('root')}
            side={side}
            showCloseButton
            onClose={close}
            variant={detached ? 'detachedModal' : 'modal'}
            ref={forwardedRef}
            {...other}
          />
        )}
      </Drawer>
    );
  },
);

ModalAside.theme = modalAsideTheme;
ModalAside.displayName = `@sixui/${COMPONENT_NAME}`;
