import type { IDialogThemeFactory } from './Dialog.css';
import type { IDialogFactory } from './Dialog.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { useComponentTheme } from '~/utils/styles/useComponentTheme';
import { DialogContent, IDialogContentOwnProps } from '../DialogContent';
import { PopoverBase } from '../PopoverBase';
import { dialogTheme } from './Dialog.css';

const COMPONENT_NAME = 'Dialog';

export const Dialog = componentFactory<IDialogFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      modal,
      children,
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
            {...(forwardedProps as IDialogContentOwnProps)}
          >
            {children}
          </DialogContent>
        )}
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
        ref={forwardedRef}
        // FIXME: tjrs other à la fin dans les autres components
        {...other}
      />
    );
  },
);

Dialog.theme = dialogTheme;
Dialog.displayName = `@sixui/${COMPONENT_NAME}`;
