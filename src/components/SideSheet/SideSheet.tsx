import type { ISideSheetThemeFactory } from './SideSheet.css';
import type { ISideSheetFactory } from './SideSheet.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeClassNames } from '~/utils/styles/mergeClassNames';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Aside } from '../Aside';
import { SideSheetContent } from '../SideSheetContent';
import { navigationDrawerTheme } from './SideSheet.css';

const COMPONENT_NAME = 'SideSheet';

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
      fullHeight,
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
      theme: navigationDrawerTheme,
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
        fullHeight={fullHeight}
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

SideSheet.theme = navigationDrawerTheme;
SideSheet.displayName = `@sixui/${COMPONENT_NAME}`;
