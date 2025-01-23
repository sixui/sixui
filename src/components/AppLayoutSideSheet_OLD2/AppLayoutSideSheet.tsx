import type { IAppLayoutSideSheetThemeFactory } from './AppLayoutSideSheet.css';
import type { IAppLayoutSideSheetFactory } from './AppLayoutSideSheet.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { Aside } from '../Aside';
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
      detached,
      hasHeader: hasHeaderProp,
      standardOpened: standardOpenedProp,
      modalOpened: modalOpenedProp,
      root: rootProp,
      side = 'right',
      onClose,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const { getStyles } = useComponentTheme<IAppLayoutSideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutSideSheetTheme,
    });

    const hasAppLayoutSideSheet =
      appLayoutContext?.components.includes('aside') ?? true;
    if (!hasAppLayoutSideSheet) {
      return null;
    }

    const hasHeader =
      hasHeaderProp ?? appLayoutContext?.components.includes('header');
    const standardOpened =
      standardOpenedProp ?? appLayoutContext?.aside?.state?.standardOpened;
    const modalOpened =
      modalOpenedProp ?? appLayoutContext?.aside?.state?.modalOpened;
    const root = rootProp ?? appLayoutContext?.root;

    return (
      <Aside
        {...getStyles('root')}
        classNames={mergeClassNames(
          classNames,
          hasHeader && {
            standard: getStyles('standard$withHeader').className,
          },
        )}
        root={root}
        detached={detached}
        standardOpened={standardOpened}
        modalOpened={modalOpened}
        side={side}
        onClose={() => {
          onClose?.();
          appLayoutContext?.aside?.state?.close?.();
        }}
        ref={forwardedRef}
        {...other}
      />
    );
  },
);

AppLayoutSideSheet.theme = appLayoutSideSheetTheme;
AppLayoutSideSheet.displayName = `@sixui/${COMPONENT_NAME}`;
