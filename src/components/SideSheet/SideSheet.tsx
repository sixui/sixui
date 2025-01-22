import type { ISideSheetThemeFactory } from './SideSheet.css';
import type { ISideSheetFactory } from './SideSheet.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ModalSideSheet } from '../ModalSideSheet';
import { StandardSideSheet } from '../StandardSideSheet';
import { sideSheetTheme } from './SideSheet.css';

const COMPONENT_NAME = 'SideSheet';

export const SideSheet = componentFactory<ISideSheetFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      detached,
      standardOpened,
      modalOpened,
      root,
      onClose,
      modalRef,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: sideSheetTheme,
    });

    return (
      <>
        <ModalSideSheet
          {...getStyles('root')}
          root={root}
          opened={modalOpened}
          detached={detached}
          onClose={onClose}
          ref={modalRef}
          {...other}
        />

        <StandardSideSheet
          {...getStyles('root')}
          opened={standardOpened}
          onClose={onClose}
          ref={forwardedRef}
          {...other}
        />
      </>
    );
  },
);

SideSheet.theme = sideSheetTheme;
SideSheet.displayName = `@sixui/${COMPONENT_NAME}`;
