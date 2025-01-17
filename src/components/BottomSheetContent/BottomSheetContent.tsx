import type { IBottomSheetContentThemeFactory } from './BottomSheetContent.css';
import type { IBottomSheetContentFactory } from './BottomSheetContent.types';
import { isFunction } from '~/helpers/isFunction';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { Paper } from '../Paper';
import {
  bottomSheetContentTheme,
  bottomSheetContentThemeVariants,
} from './BottomSheetContent.css';

const COMPONENT_NAME = 'BottomSheetContent';

export const BottomSheetContent = componentFactory<IBottomSheetContentFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      onClose,
      children,
      draggable,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IBottomSheetContentThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: bottomSheetContentTheme,
      themeVariants: bottomSheetContentThemeVariants,
    });

    return (
      <Paper {...getStyles('root')} ref={forwardedRef} {...other}>
        {draggable && <div {...getStyles('dragHandle')} />}
        {isFunction(children)
          ? children({ close: (event) => onClose?.(event) })
          : children}
      </Paper>
    );
  },
);

BottomSheetContent.theme = bottomSheetContentTheme;
BottomSheetContent.displayName = `@sixui/${COMPONENT_NAME}`;
