import type { IAppLayoutSideSheetThemeFactory } from './AppLayoutSideSheet.css';
import type { IAppLayoutSideSheetFactory } from './AppLayoutSideSheet.types';
import { useAppLayoutContext } from '~/components/AppLayout/AppLayout.context';
import { SideSheet } from '~/components/SideSheet';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
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
        classNames={mergeClassNames(classNames, {
          sideSheetContent: getStyles('sideSheetContent').className,
        })}
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
