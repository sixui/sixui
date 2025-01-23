import type { IAppLayoutSideSheetThemeFactory } from './AppLayoutSideSheet.css';
import type { IAppLayoutSideSheetFactory } from './AppLayoutSideSheet.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { SideSheet } from '../SideSheet';
import { SideSheetDestination } from '../SideSheetDestination';
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

    const hasAppLayoutSideSheet =
      appLayoutContext?.components.includes('navigationDrawer') ?? true;
    if (!hasAppLayoutSideSheet) {
      return null;
    }

    const standardOpened =
      standardOpenedProp ?? appLayoutContext?.aside?.state?.standardOpened;
    const modalOpened =
      modalOpenedProp ?? appLayoutContext?.aside?.state?.modalOpened;
    const root = rootProp ?? appLayoutContext?.root;

    return (
      <SideSheet
        {...getStyles('root')}
        standardOpened={standardOpened}
        modalOpened={modalOpened}
        root={root}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

AppLayoutSideSheet.theme = appLayoutSideSheetTheme;
AppLayoutSideSheet.displayName = `@sixui/${COMPONENT_NAME}`;
AppLayoutSideSheet.Destination = SideSheetDestination;
