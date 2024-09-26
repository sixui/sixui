import type { IDialogThemeFactory } from './Dialog.css';
import type { IDialogFactory } from './Dialog.types';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { DialogContent, IDialogContentOwnProps } from '../DialogContent';
import { PopoverBase } from '../PopoverBase';
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
      modal,
      children,
      slotProps,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { getStyles } = useComponentTheme<IDialogThemeFactory>({
      componentName: COMPONENT_NAME,
      classNames,
      className,
      styles,
      style,
      theme: dialogTheme,
      variant,
    });

    return (
      <PopoverBase
        {...getStyles('root')}
        contentRenderer={({ close, forwardedProps }) => (
          <DialogContent
            onClose={close}
            ref={forwardedRef}
            {...(forwardedProps as IDialogContentOwnProps)}
            {...slotProps?.dialogContent}
          >
            {children}
          </DialogContent>
        )}
        slotProps={slotProps}
        placement={{ side: 'top' }}
        closeEvents={{
          focusOut: false,
          clickOutside: !modal,
          escapeKey: !modal,
        }}
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
