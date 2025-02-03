import type { IAppLayoutSideSheetThemeFactory } from './AppLayoutSideSheet.css';
import type { IAppLayoutSideSheetFactory } from './AppLayoutSideSheet.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { SideSheet } from '~/components/SideSheet';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { useAppLayoutComponent } from '../hooks/useAppLayoutComponent';
import { COMPONENT_NAME } from './AppLayoutSideSheet.constants';
import { appLayoutSideSheetTheme } from './AppLayoutSideSheet.css';

export const AppLayoutSideSheet = componentFactory<IAppLayoutSideSheetFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      opened: openedProp,
      modal: modalProp,
      hasHeader: hasHeaderProp,
      root: rootProp,
      onClose,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();
    useAppLayoutComponent('sideSheet');

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

    const opened = openedProp ?? appLayoutContext?.sideSheet?.state?.opened;
    const modal = modalProp ?? appLayoutContext?.sideSheet?.state?.modal;
    const root = rootProp ?? appLayoutContext?.root;

    const handleClose = (event?: React.MouseEvent): void => {
      onClose?.(event);
      appLayoutContext?.sideSheet?.state?.close();
    };

    return (
      <SideSheet
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          sideSheetContent: getStyles('sideSheetContent').className,
        })}
        opened={opened}
        modal={modal}
        onClose={handleClose}
        root={root}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

AppLayoutSideSheet.theme = appLayoutSideSheetTheme;
AppLayoutSideSheet.displayName = `@sixui/core/${COMPONENT_NAME}`;
