import type { IDialogThemeFactory } from './Dialog.css';
import type { IDialogFactory } from './Dialog.types';
import { PopoverBase } from '~/components/PopoverBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeProps } from '~/utils/mergeProps';
import { COMPONENT_NAME } from './Dialog.constants';
import { DialogContent, IDialogContentOwnProps } from './DialogContent';
import { dialogTheme } from './Dialog.css';

/**
 * @see https://m3.material.io/components/dialogs/overview
 */
export const Dialog = polymorphicComponentFactory<IDialogFactory>(
  (props, forwardedRef) => {
    const {
      classNames,
      className,
      styles,
      style,
      variant,
      children,
      scrim: scrimProp,
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

    const scrim = scrimProp ?? other.modal;

    return (
      <PopoverBase
        {...getStyles('root')}
        contentRenderer={({ close, foreignProps }) => (
          <DialogContent
            ref={forwardedRef}
            {...mergeProps(
              { onClose: close },
              foreignProps as IDialogContentOwnProps,
            )}
          >
            {children}
          </DialogContent>
        )}
        closeEvents={{ focusOut: false }}
        middlewares={false}
        forwardForeignProps
        scrim={scrim}
        {...other}
      />
    );
  },
);
