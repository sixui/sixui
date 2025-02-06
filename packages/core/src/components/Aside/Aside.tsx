import type { IAsideThemeFactory } from './Aside.css';
import type { IAsideFactory } from './Aside.types';
import { DrawerAside } from '~/components/DrawerAside';
import { StandardAside } from '~/components/StandardAside';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './Aside.constants';
import { asideTheme } from './Aside.css';

export const Aside = componentFactory<IAsideFactory>((props, forwardedRef) => {
  const {
    classNames,
    className,
    styles,
    style,
    variant,
    root,
    detached,
    wide,
    opened,
    modal,
    modalRef,
    ...other
  } = useProps({ componentName: COMPONENT_NAME, props });

  const { getStyles } = useComponentTheme<IAsideThemeFactory>({
    componentName: COMPONENT_NAME,
    classNames,
    className,
    styles,
    style,
    variant,
    theme: asideTheme,
  });

  return (
    <>
      <DrawerAside
        {...getStyles(['root', 'modal'])}
        opened={opened && modal}
        root={root}
        detached={detached}
        ref={modalRef}
        {...other}
      />

      <StandardAside
        {...getStyles(['root', 'standard'])}
        opened={opened && !modal}
        wide={wide}
        ref={forwardedRef}
        {...other}
      />
    </>
  );
});

Aside.theme = asideTheme;
Aside.displayName = `@sixui/core/${COMPONENT_NAME}`;
