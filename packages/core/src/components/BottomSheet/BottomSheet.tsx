import type { IBottomSheetThemeFactory } from './BottomSheet.css';
import type { IBottomSheetFactory } from './BottomSheet.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { Drawer } from '~/components/Drawer';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { COMPONENT_NAME } from './BottomSheet.constants';
import { BottomSheetContent } from './BottomSheetContent';
import { bottomSheetTheme } from './BottomSheet.css';

export const BottomSheet = componentFactory<IBottomSheetFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      opened,
      modal,
      detached,
      onClose,
      fullHeight,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const { getStyles } = useComponentTheme<IBottomSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: bottomSheetTheme,
      modifiers: {
        'full-height': fullHeight,
        detached,
      },
    });

    const bottomSheetOpened =
      opened ?? appLayoutContext?.bottomSheet?.state?.opened;

    return (
      <Drawer
        {...getStyles('root')}
        root={appLayoutContext?.root}
        opened={bottomSheetOpened}
        onClose={() => {
          onClose?.();
          appLayoutContext?.bottomSheet?.state?.close();
        }}
        side="bottom"
        modal={modal}
        variant={detached ? 'detached' : undefined}
      >
        {({ close }) => (
          <BottomSheetContent
            {...getStyles('bottomSheetContent')}
            onClose={close}
            ref={forwardedRef}
            variant={detached ? 'standard' : 'minimized'}
            {...other}
          />
        )}
      </Drawer>
    );
  },
);

BottomSheet.theme = bottomSheetTheme;
BottomSheet.displayName = `@sixui/${COMPONENT_NAME}`;
