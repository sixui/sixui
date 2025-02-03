import type { IDialogThemeFactory } from './Dialog.css';
import type { IDialogFactory } from './Dialog.types';
import { LayersManager } from '~/components/Layers';
import { PopoverBase } from '~/components/PopoverBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeProps } from '~/utils/mergeProps';
import { COMPONENT_NAME } from './Dialog.constants';
import { DialogContent, IDialogContentOwnProps } from './DialogContent';
import { dialogTheme } from './Dialog.css';

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
        middlewares={false}
        forwardProps
        {...other}
      />
    );
  },
);

Dialog.theme = dialogTheme;
Dialog.displayName = `@sixui/core/${COMPONENT_NAME}`;
Dialog.show = (props) => {
  LayersManager.show();
};
