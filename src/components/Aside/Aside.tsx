import type { IAsideThemeFactory } from './Aside.css';
import type { IAsideFactory } from './Aside.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { useAppLayoutContext } from '../AppLayout/AppLayout.context';
import { SideSheet } from '../SideSheet';
import { asideTheme } from './Aside.css';

const COMPONENT_NAME = 'Aside';

export const Aside = componentFactory<IAsideFactory>((props, forwardedRef) => {
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

  const { getStyles } = useComponentTheme<IAsideThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    variant,
    theme: asideTheme,
  });

  const hasAside = appLayoutContext?.components.includes('aside') ?? true;
  if (!hasAside) {
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
});

Aside.theme = asideTheme;
Aside.displayName = `@sixui/${COMPONENT_NAME}`;
