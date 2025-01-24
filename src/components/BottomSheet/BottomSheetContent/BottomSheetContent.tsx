import type { IBottomSheetContentThemeFactory } from './BottomSheetContent.css';
import type { IBottomSheetContentFactory } from './BottomSheetContent.types';
import { iconXMark } from '~/assets/icons';
import { IconButton } from '~/components/IconButton';
import { Paper } from '~/components/Paper';
import { SvgIcon } from '~/components/SvgIcon';
import { isFunction } from '~/helpers/isFunction';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
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

BottomSheetContent.theme = bottomSheetContentTheme;
BottomSheetContent.displayName = `@sixui/${COMPONENT_NAME}`;
