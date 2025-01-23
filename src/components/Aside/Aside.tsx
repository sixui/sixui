import type { IAsideThemeFactory } from './Aside.css';
import type { IAsideFactory } from './Aside.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { ModalAside } from '../ModalAside';
import { StandardAside } from '../StandardAside';
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
    standardOpened,
    modalOpened,
    root,
    onClose,
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
        root={root}
        opened={modalOpened}
        detached={detached}
        onClose={onClose}
        ref={modalRef}
        {...other}
      />

      <StandardAside
        {...getStyles(['root', 'standard'])}
        opened={standardOpened}
        onClose={onClose}
        ref={forwardedRef}
        {...other}
      />
    </>
  );
});

Aside.theme = asideTheme;
Aside.displayName = `@sixui/${COMPONENT_NAME}`;
