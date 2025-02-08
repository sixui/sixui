import type { IBottomSheetThemeFactory } from './BottomSheet.css';
import type { IBottomSheetFactory } from './BottomSheet.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { Drawer } from '~/components/Drawer';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './BottomSheet.constants';
import { BottomSheetContent } from './BottomSheetContent';
import { bottomSheetTheme } from './BottomSheet.css';

/**
 * @see https://m3.material.io/components/bottom-sheets/overview
 */
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
      onClosed,
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
        portalProps={{ root: appLayoutContext?.root }}
        opened={bottomSheetOpened}
        onClose={() => {
          onClose?.();
          appLayoutContext?.bottomSheet?.state?.close();
        }}
        onClosed={onClosed}
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
BottomSheet.displayName = `@sixui/core/${COMPONENT_NAME}`;
