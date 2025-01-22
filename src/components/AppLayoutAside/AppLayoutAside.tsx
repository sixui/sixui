import type { IAppLayoutAsideThemeFactory } from './AppLayoutAside.css';
import type { IAppLayoutAsideFactory } from './AppLayoutAside.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { SideSheet } from '../SideSheet';
import { appLayoutAsideTheme } from './AppLayoutAside.css';

const COMPONENT_NAME = 'AppLayoutAside';

export const AppLayoutAside = componentFactory<IAppLayoutAsideFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      detached,
      standardOpened: standardOpenedProp,
      modalOpened: modalOpenedProp,
      root: rootProp,
      side = 'right',
      onClose,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const appLayoutContext = useAppLayoutContext();

    const standardOpened =
      standardOpenedProp ?? appLayoutContext?.aside?.state?.standardOpened;
    const modalOpened =
      modalOpenedProp ?? appLayoutContext?.aside?.state?.modalOpened;

    const { getStyles } = useComponentTheme<IAppLayoutAsideThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: appLayoutAsideTheme,
    });

    const hasAppLayoutAside =
      appLayoutContext?.components.includes('aside') ?? true;
    if (!hasAppLayoutAside) {
      return null;
    }

    const root = rootProp ?? appLayoutContext?.root;

    return (
      <SideSheet
        {...getStyles('root')}
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

AppLayoutAside.theme = appLayoutAsideTheme;
AppLayoutAside.displayName = `@sixui/${COMPONENT_NAME}`;
