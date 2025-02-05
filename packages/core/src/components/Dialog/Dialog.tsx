import type { IDialogThemeFactory } from './Dialog.css';
import type { IDialogFactory } from './Dialog.types';
import { PopoverBase } from '~/components/PopoverBase';
import { useComponentTheme, useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { mergeProps } from '~/utils/mergeProps';
import { useOverlayContext } from '../Overlays/Overlay.context';
import { useOverlaysStateContext } from '../Overlays/OverlaysState.context';
import { COMPONENT_NAME, OVERLAY_LAYER } from './Dialog.constants';
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

    const overlaysStateContext = useOverlaysStateContext();
    const overlayContext = useOverlayContext();
    const overlayInstancePosition = overlayContext?.instanceId
      ? overlaysStateContext.getInstancePositionInLayer(
          overlayContext.instanceId,
          OVERLAY_LAYER,
        )
      : 0;

    const scrim = scrimProp ?? other.modal;

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
        closeEvents={
          overlayInstancePosition === 0 ? { focusOut: false } : false
        }
        middlewares={false}
        forwardProps
        scrim={scrim}
        {...other}
      />
    );
  },
);
