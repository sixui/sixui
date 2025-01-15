import type { IDialogThemeFactory } from './Dialog.css';
import type { IDialogFactory } from './Dialog.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { mergeProps } from '~/utils/mergeProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { DialogContent, IDialogContentOwnProps } from '../DialogContent';
import { PopoverBase } from '../PopoverBase';
import { useThemeContext } from '../ThemeProvider';
import { dialogTheme } from './Dialog.css';

const COMPONENT_NAME = 'Dialog';

export const Dialog = polymorphicComponentFactory<IDialogFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IDialogThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      variant,
      theme: dialogTheme,
    });

    return (
      <PopoverBase
        {...getStyles('root')}
        contentRenderer={({ close, forwardedProps }) => (
          <DialogContent
            ref={forwardedRef}
            {...mergeProps(
              { onClose: close },
              forwardedProps as IDialogContentOwnProps,
            )}
          >
            {children}
          </DialogContent>
        )}
        closeEvents={{ focusOut: false }}
        trapFocus
        withScrim
        middlewares={{
          flip: false,
          shift: false,
          size: false,
        }}
        forwardProps
        lockScroll
        {...other}
      />
    );
  },
);

Dialog.theme = dialogTheme;
Dialog.displayName = `@sixui/${COMPONENT_NAME}`;
