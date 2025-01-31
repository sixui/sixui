import type { ISideSheetThemeFactory } from './SideSheet.css';
import type { ISideSheetFactory } from './SideSheet.types';
import { Aside } from '~/components/Aside';
import { useComponentTheme, useProps } from '~/components/ThemeProvider';
import { componentFactory } from '~/utils/component/componentFactory';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { COMPONENT_NAME } from './SideSheet.constants';
import { SideSheetContent } from './SideSheetContent';
import { sideSheetTheme } from './SideSheet.css';

export const SideSheet = componentFactory<ISideSheetFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      standardOpened,
      modalOpened,
      detached,
      side = 'left',
      wide: fullHeight,
      onClose,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<ISideSheetThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: sideSheetTheme,
    });

    return (
      <Aside
        {...getStyles('root')}
        classNames={mergeClassNames(classNames, {
          sideSheetContent: getStyles('sideSheetContent').className,
        })}
        standardOpened={standardOpened}
        modalOpened={modalOpened}
        detached={detached}
        side={side}
        wide={fullHeight}
        onClose={onClose}
        ref={forwardedRef}
      >
        {({ close, type }) => (
          <SideSheetContent
            side={side}
            variant={
              type === 'modal'
                ? detached
                  ? 'detachedModal'
                  : 'modal'
                : undefined
            }
            showCloseButton={type === 'modal'}
            onClose={close}
            {...getStyles('sideSheetContent')}
            {...other}
          />
        )}
      </Aside>
    );
  },
);

SideSheet.theme = sideSheetTheme;
SideSheet.displayName = `@sixui/${COMPONENT_NAME}`;
