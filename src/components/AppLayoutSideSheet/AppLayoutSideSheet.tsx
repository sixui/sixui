import type { IAppLayoutSideSheetThemeFactory } from './AppLayoutSideSheet.css';
import type { IAppLayoutSideSheetFactory } from './AppLayoutSideSheet.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { SideSheet } from '../SideSheet';
import { appLayoutSideSheetTheme } from './AppLayoutSideSheet.css';

const COMPONENT_NAME = 'AppLayoutSideSheet';

export const AppLayoutSideSheet = componentFactory<IAppLayoutSideSheetFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      standardOpened: standardOpenedProp,
      modalOpened: modalOpenedProp,
      hasHeader: hasHeaderProp,
      root: rootProp,
      onClose,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const hasHeader =
      hasHeaderProp ?? appLayoutContext?.components.includes('header');

    const { getStyles } = useComponentTheme<IAppLayoutSideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutSideSheetTheme,
      modifiers: {
        'with-header': hasHeader,
      },
    });

    const hasAppLayoutAside =
      appLayoutContext?.components.includes('sideSheet') ?? true;
    if (!hasAppLayoutAside) {
      return null;
    }

    const standardOpened =
      standardOpenedProp ?? appLayoutContext?.sideSheet?.state?.standardOpened;
    const modalOpened =
      modalOpenedProp ?? appLayoutContext?.sideSheet?.state?.modalOpened;
    const root = rootProp ?? appLayoutContext?.root;

    const handleClose = (event?: React.MouseEvent): void => {
      onClose?.(event);
      appLayoutContext?.sideSheet?.state?.close();
    };

    return (
      <SideSheet
        {...getStyles('root')}
        standardOpened={standardOpened}
        modalOpened={modalOpened}
        onClose={handleClose}
        root={root}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

AppLayoutSideSheet.theme = appLayoutSideSheetTheme;
AppLayoutSideSheet.displayName = `@sixui/${COMPONENT_NAME}`;
