import type { IModalSideSheetThemeFactory } from './ModalSideSheet.css';
import type { IModalSideSheetFactory } from './ModalSideSheet.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Drawer } from '../Drawer';
import { SideSheetContent } from '../SideSheetContent';
import { modalSideSheetTheme } from './ModalSideSheet.css';

const COMPONENT_NAME = 'ModalSideSheet';

export const ModalSideSheet = componentFactory<IModalSideSheetFactory>(
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

    const { getStyles } = useComponentTheme<IModalSideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: modalSideSheetTheme,
      modifiers: {
        detached,
      },
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
      >
        {({ close }) => (
          <SideSheetContent
            {...getStyles('sideSheetContent', {
              modifiers: {
                modal: true,
              },
            })}
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

ModalSideSheet.theme = modalSideSheetTheme;
ModalSideSheet.displayName = `@sixui/${COMPONENT_NAME}`;
