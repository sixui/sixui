import type { IBottomSheetContentThemeFactory } from './BottomSheetContent.css';
import type { IBottomSheetContentFactory } from './BottomSheetContent.types';
import { iconXMark } from '~/assets/icons';
import { IconButton } from '~/components/IconButton';
import { Paper } from '~/components/Paper';
import { SvgIcon } from '~/components/SvgIcon';
import { useComponentTheme, useProps } from '~/components/Theme';
import { componentFactory } from '~/utils/component/componentFactory';
import { isFunction } from '~/utils/isFunction';
import { COMPONENT_NAME } from './BottomSheetContent.constants';
import {
  bottomSheetContentTheme,
  bottomSheetContentThemeVariants,
} from './BottomSheetContent.css';

/**
 * @see https://m3.material.io/components/bottom-sheets/overview
 */
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
      showCloseButton,
      closeIcon = <SvgIcon icon={iconXMark} />,
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
        {showCloseButton && (
          <IconButton
            {...getStyles('closeButton')}
            icon={closeIcon}
            onClick={onClose}
          />
        )}
        {isFunction(children)
          ? children({ close: (event) => onClose?.(event) })
          : children}
      </Paper>
    );
  },
);

BottomSheetContent.displayName = `@sixui/core/${COMPONENT_NAME}`;
BottomSheetContent.theme = bottomSheetContentTheme;
