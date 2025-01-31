import type { IAsideThemeFactory } from './Aside.css';
import type { IAsideFactory } from './Aside.types';
import { ModalAside } from '~/components/ModalAside';
import { StandardAside } from '~/components/StandardAside';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
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
    standardOpened,
    modalOpened,
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
      <ModalAside
        {...getStyles(['root', 'modal'])}
        opened={modalOpened}
        root={root}
        detached={detached}
        ref={modalRef}
        {...other}
      />

      <StandardAside
        {...getStyles(['root', 'standard'])}
        opened={standardOpened}
        wide={wide}
        ref={forwardedRef}
        {...other}
      />
    </>
  );
});

Aside.theme = asideTheme;
Aside.displayName = `@sixui/${COMPONENT_NAME}`;
